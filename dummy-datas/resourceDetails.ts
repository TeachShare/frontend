import { ResourceDetail } from "@/types/resources";

export const mockResourceDetail: ResourceDetail = {
  title: "Algebra Fundamentals—Linear Equations Pack",
  description:
    "A complete mini-unit to introduce, practice, and assess one-variable linear equations for Grade 8 learners.",
  subject: "Mathematics",
  grade: "Grade 8",
  unit: "Linear Equations",
  type: "Lesson Pack",
  author: "Alex Martinez",
  lastUpdated: "May 4, 2025",
  rating: 4.2,
  reviews: 18,
  likes: 132,
  remixes: 9,
  downloads: 412,
  files: [
    {
      name: "Intro to Linear Equations— Slides",
      type: "PPTX",
      size: "4.3 MB",
      status: "Ready",
    },
    {
      name: "Practice Worksheet—Solving Equations",
      type: "PDF",
      size: "620 KB",
      status: "Ready",
    },
    {
      name: "Exit Ticket—Linear Equations",
      type: "DOC",
      size: "220 KB",
      status: "Ready",
    },
    {
      name: "Answer Key & Rubric",
      type: "PDF",
      size: "540 KB",
      status: "Ready",
    },
  ],
};
