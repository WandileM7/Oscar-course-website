// pages/courses/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Section {
  title: string;
  content: string;
  quiz?: any;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  sections: Section[];
}

interface Enrollment {
  currentSection: number;
}

export default function CourseDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch course details
  useEffect(() => {
    if (!id) return;
    
    async function fetchCourse() {
      try {
        const res = await axios.get(`/api/course/${id}`);
        setCourse(res.data.course);
      } catch (err) {
        console.error(err);
      }
    }
    
    fetchCourse();
  }, [id]);
  
  // Fetch enrollment (if user is logged in)
  useEffect(() => {
    if (!id || !session) return;
    
    async function fetchEnrollment() {
      try {
        const res = await axios.get(`/api/enrollment/${id}`);
        setEnrollment(res.data.enrollment);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    
    fetchEnrollment();
  }, [id, session]);
  
  if (loading) return <div>Loading...</div>;
  if (!course) return <div>Course not found</div>;
  
  const handleCompleteSection = async () => {
    try {
      const res = await axios.post("/api/progress", { courseId: id });
      setEnrollment(res.data.enrollment);
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p>{course.description}</p>
      
      <div className="mt-4">
        {course.sections.map((section, index) => (
          <div key={index} className="border p-4 mb-2">
            <h2 className="text-2xl">
              Section {index + 1}: {section.title}
            </h2>
            {enrollment && index <= enrollment.currentSection ? (
              <div>
                <div>{section.content}</div>
                {index === enrollment.currentSection && (
                  <button onClick={handleCompleteSection} className="mt-2 bg-blue-500 text-white px-4 py-2">
                    Mark as Complete & Unlock Next Section
                  </button>
                )}
              </div>
            ) : (
              <div className="text-gray-500">Locked</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
