// pages/api/progress.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";

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
  
  const enrollment = await Enrollment.findOne({ user: session.user.id, course: courseId });
  if (!enrollment) {
    return res.status(404).json({ message: "Enrollment not found" });
  }
  
  // Unlock the next section
  enrollment.currentSection += 1;
  await enrollment.save();
  
  return res.status(200).json({ message: "Progress updated", enrollment });
}
