// components/CourseCard.tsx
import { useState } from "react";
import Link from "next/link";
import { ICourse } from "@/models/Course";

interface CourseCardProps {
  course: ICourse;
}

export default function CourseCard({ course }: CourseCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border rounded p-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{course.title}</h3>
        <span className="bg-green-200 text-green-800 px-2 py-1 rounded">${course.price}</span>
      </div>
      <p className="mt-2">{course.description}</p>
      <button onClick={() => setIsOpen(!isOpen)} className="mt-2 text-blue-500">
        {isOpen ? "Hide Course Outline" : "Show Course Outline"}
      </button>
      {isOpen && (
        <div className="mt-2 border-t pt-2">
          {course.sections.map((section, index) => (
            <div key={index} className="mb-1">
              <strong>Section {index + 1}:</strong> {section.title}
            </div>
          ))}
          <Link href={`/courses/${course._id}`}>
            <a className="text-blue-600 underline">Go to Course Details</a>
          </Link>
        </div>
      )}
    </div>
  );
}
