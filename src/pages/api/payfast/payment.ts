// pages/api/payfast/payment.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import Enrollment from "@/models/Enrollment";

// This is a simplified simulation of a PayFast payment flow.
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
  
  // Here you would integrate with PayFast. For now, we simulate a successful payment.
  
  // Create enrollment record if not already enrolled
  let enrollment = await Enrollment.findOne({ user: session.user.id, course: courseId });
  if (!enrollment) {
    enrollment = new Enrollment({
      user: session.user.id,
      course: courseId,
      currentSection: 0, // Only the first section is unlocked initially
    });
    await enrollment.save();
  }
  
  return res.status(200).json({ message: "Payment successful, enrollment confirmed", enrollment });
}
