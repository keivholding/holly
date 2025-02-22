import { Schema, model } from "mongoose";

const jobSchema = new Schema({
  title: String,
  author: String,
  num_pages: Number,
  text: {
    type: String,
    required: [true, "Job text is required."],
  },
  pdf_link: {
    type: String,
    required: [true, "PDF link is required."],
  },
  embedding: {
    type: [Number],
    required: [true, "Embedding is required."],
    select: 0,
  },
});

const Job = model("Job", jobSchema);

export default Job;
