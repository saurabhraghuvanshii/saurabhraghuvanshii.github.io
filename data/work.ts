// Bullet text supports **bold** and `code` (see app/components/Rich.tsx).
export type Job = {
  when: string;
  title: string;
  role: string;
  bullets: string[];
  more?: string[];
  tags?: string[];
};

export const work: Job[] = [
  {
    when: "Mar – May 2026 · Remote",
    title: "Meshery, CNCF",
    role: "Software Engineering Intern, LFX Mentorship Term 1",
    bullets: [
      "Led the migration of **5+ production apps** from Next.js 12 to 16 and React 18 to 19 across Meshery, Sistent and Layer5, and resolved the breaking API changes that blocked the ecosystem's dependency roadmap.",
      "Profiled the Layer5 website build (1,348 pages): peak memory **13.4 to 9.9 GB (−26%)**, build time down 22%, app.js down 71% with a Webpack icon-alias shim, image downscaling and dead-plugin removal.",
      "Made Sistent tree-shakeable with an ESM exports map, `sideEffects:false` and path-based icon imports. A single-component consumer bundle went from **14.7 to 2.3 MB (−85%)**.",
      "Moved PR preview infrastructure from Netlify to GitHub Pages with GitHub Actions, removing third-party hosting costs and deploying a preview on every pull request.",
    ],
    more: [
      "Fixed Meshery server defects by aligning query parameter handling with the UI contract and correcting Kubernetes cluster-count aggregation. Added Kubernetes Gateway API models and clearer mesheryctl CLI errors.",
      "Upgraded the shared mui-datatables package to React 18 across 48+ files, then removed a 10,800-module icon barrel from its Rollup output and added an ESLint guard against regressions.",
      "Migrated JavaScript codebases to TypeScript and shipped light-mode theming, a theme switcher and reusable components in the Sistent design system.",
      "Shipped and maintained the Meshery Academy and Exoscale Academy platforms, improving test coverage and contributor onboarding.",
    ],
    tags: ["Next.js", "React", "TypeScript", "Webpack", "Rollup", "GitHub Actions", "Go", "Kubernetes"],
  },
  {
    when: "Sep 2025 – Present · Remote",
    title: "Maintainer, Meshery",
    role: "Open Source Maintainer",
    bullets: [
      "Maintain Meshery, the cloud native management plane, and work on developer experience, documentation and core tooling across the service mesh ecosystem.",
    ],
    tags: ["React", "Next.js", "Go", "Kubernetes", "Docker", "GraphQL"],
  },
  {
    when: "2025 – Present · Remote",
    title: "Open Source Contributor",
    role: "Layer5, Meshery, Jenkins, stdlib-js, Cal.com, KubeStellar, JSON Schema",
    bullets: [
      "Merged **220+ pull requests** across 15+ organizations, including 3 CNCF projects (Meshery, KubeStellar, Lima), working asynchronously with distributed maintainers through code review and release cycles.",
      "Contributed **29 pull requests to stdlib-js**: C implementations of statistical distribution functions and wider test coverage for BLAS routines.",
      "Shipped features and fixes across React architecture, CI/CD pipelines, deployment automation, GitHub Packages and automated testing.",
    ],
  },
];
