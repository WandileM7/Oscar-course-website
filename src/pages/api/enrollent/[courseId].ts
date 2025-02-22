// pages/api/enrollment/[courseId].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { courseId } = req.query;
  
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  
  await connectToDatabase();
  
  const enrollment = await Enrollment.findOne({ user: session.user.id, course: courseId });
  if (!enrollment) {
    return res.status(404).json({ message: "Not enrolled" });
  }
  
  return res.status(200).json({ enrollment });
}
