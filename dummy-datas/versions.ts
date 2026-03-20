import { Version } from "@/types/repository";

export const mockVersions: Version[] = [
  {
    id: "v5",
    title: "Current version",
    status: "Active",
    description: "Latest refinements based on peer reviews and classroom feedback.",
    author: "Xavier Lee",
    date: "2 days ago",
    files: 4,
    size: "3.0 MB total",
    summary: "Adjusted pacing guide, clarified problem 7 wording, and updated answer key."
  },
  {
    id: "v4",
    title: "Assessment rubric",
    status: "Archived",
    description: "Added a detailed rubric for evaluating student work and aligned objectives.",
    author: "Xavier Lee",
    date: "3 weeks ago",
    files: 4,
    size: "2.9 MB total",
    summary: "Rubric document added and learning objectives refined for clarity."
  },
  {
    id: "v3",
    title: "Visual examples",
    status: "Archived",
    description: "Updated presentation with visual graphs and real-world examples for engagement.",
    author: "Maria Chen",
    date: "1 month ago",
    files: 3,
    size: "2.5 MB total",
    summary: "New image assets and teacher notes added in the slide notes section."
  },
  {
    id: "v2",
    title: "Added formative quiz",
    status: "Archived",
    description: "Included a short 10-item quiz and updated worksheet with extra practice.",
    author: "Xavier Lee",
    date: "2 months ago",
    files: 3,
    size: "2.1 MB total",
    summary: "Added quiz document and minor wording changes in side 3 and 4."
  },
  {
    id: "v1",
    title: "Initial upload",
    status: "Archived",
    description: "Original lesson plan and worksheet for introducing linear equations.",
    author: "Xavier Lee",
    date: "3 months ago",
    files: 2,
    size: "1.9 MB total",
    summary: "First draft with basic examples, no assessment rubric included yet."
  }
];