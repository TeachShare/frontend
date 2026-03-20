import { RepositoryData } from "@/types/repository";

export const repositoryListData: RepositoryData[] = [
  {
    title: "Algebra Fundamentals",
    subject: "Mathematics · Grade 9-10",
    typeTag: "Original Creator",
    tags: ["algebra", "equations"],
    files: [{ name: "alg-slides.pptx", size: "1.8 MB" }],
    rating: 4.5,
    reviews: 28,
    lastReviewed: "3h ago",
    likes: 23,
    shares: 8,
    downloads: 45,
  },
  {
    title: "Software Engineering Project",
    subject: "Computer Science · University",
    typeTag: "Remix",
    tags: ["software design"],
    files: [{ name: "brief.pdf", size: "2.5 MB" }],
    rating: 5.0,
    reviews: 5,
    lastReviewed: "yesterday",
    likes: 12,
    shares: 4,
    downloads: 31,
  },
];
