// pages/api/enroll.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";
import Course from "@/models/Course";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  
  const { courseId } = req.body;
  if (!courseId) {
    return res.status(400).json({ message: "Course ID is required" });
  }
  
  await connectToDatabase();
  
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  
  const existingEnrollment = await Enrollment.findOne({ user: session.user.id, course: courseId });
  if (existingEnrollment) {
    return res.status(400).json({ message: "Already enrolled" });
  }
  
  const enrollment = new Enrollment({
    user: session.user.id,
    course: courseId,
    currentSection: 0,
  });
  
  await enrollment.save();
  
  return res.status(201).json({ message: "Enrollment successful", enrollment });
}
