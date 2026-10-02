export type Project = {
  name: string;
  github: string;
  website?: string;
  summary: string;
  detail: string;
  tags: string[];
};

export const featured: Project & { badge: string } = {
  badge: "New",
  name: "Carrel",
  github: "https://github.com/saurabhraghuvanshii/carrel",
  website: "https://saurabhraghuvanshii.github.io/carrel/",
  summary:
    "Practice data structures and algorithms in your browser, on your own computer. One small program, no account, nothing uploaded. It runs your Java or C++ with the compilers you already have and keeps your solutions as plain files.",
  detail:
    "183 problems in two sheets. Every submit runs your code against the examples, fixed edge cases and 50 fresh random cases. Ships in Paper and Ink themes, with optional AI hints that explain without writing the answer.",
  tags: ["Go", "Java", "C++", "Local server"],
};

export const projects: Project[] = [
  {
    name: "PDF Talks",
    github: "https://github.com/saurabhraghuvanshii/pdf-talks",
    summary:
      "Upload a PDF and ask questions in plain language. Answers are grounded in the document and carry inline source citations.",
    detail:
      "A RAG pipeline with chunking, embeddings and pgvector similarity search handles documents over 100 pages. Google OAuth 2.0 and NextAuth.js keep each user's documents private.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "pgvector", "Supabase"],
  },
  {
    name: "DrawNew",
    github: "https://github.com/saurabhraghuvanshii/DrawNew",
    summary:
      "A real-time collaborative whiteboard with freehand drawing, shapes, text, zoom, pan and multi-object transforms.",
    detail:
      "Rooms sync over WebSockets by broadcasting incremental state diffs instead of full canvas snapshots. The Express server handles reconnects so late joiners get the current state. Both services run in Docker.",
    tags: ["React", "Express", "WebSockets", "Docker"],
  },
];

export const earlier = [
  { label: "PDF-To-Anything", href: "https://github.com/saurabhraghuvanshii/Pdf-TO-Anything" },
  { label: "Galaxie, a 3D galaxy in Three.js", href: "https://github.com/saurabhraghuvanshii/Galaxie" },
];
