// models/Course.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ISection {
  title: string;
  content: string;
  quiz?: any; // Simplified; you can expand this schema as needed.
}

export interface ICourse extends Document {
  title: string;
  description: string;
  price: number;
  sections: ISection[];
}

const SectionSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  quiz: { type: Schema.Types.Mixed },
});

const CourseSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  sections: [SectionSchema],
});

export default mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);
