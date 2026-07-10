// ============================================================================
//  THE CHRONICLE — single source of truth for the time-travel portfolio.
//  All content (CV, eras, story) lives here. Sections read from this file.
// ============================================================================

export type EraId =
  | "present"
  | "origins"
  | "arsenal"
  | "inventions"
  | "expeditions"
  | "credentials"
  | "chronicle"
  | "transmit";

export interface Era {
  id: EraId;
  route: string;
  year: string;        // displayed on the chronometer / badge
  title: string;       // "The Present"
  chapter: string;     // "Chapter I"
  tagline: string;     // short story line
  narration: string;   // longer narrative intro
  /** Portal / accent hue in degrees (HSL) used to morph the 3D scene per era. */
  hue: number;
  /** Motif shape rendered as the era's 3D object. */
  shape: "orb" | "cube" | "torus" | "crystal" | "portal" | "scroll" | "beacon";
}

export const ERAS: Record<EraId, Era> = {
  present: {
    id: "present",
    route: "/",
    year: "2026",
    title: "The Present",
    chapter: "Chapter I",
    tagline: "You have arrived.",
    narration:
      "A traveler steps out of the chrono-stream into the now. The machine hums behind you, the stars still folding into place. This is the present moment of Prottus Manna — full-stack developer, AI engineer, and builder of strange intelligent things.",
    hue: 189,
    shape: "portal",
  },
  origins: {
    id: "origins",
    route: "/about",
    year: "2004 — 2026",
    title: "The Origins",
    chapter: "Chapter II",
    tagline: "Where the story began.",
    narration:
      "Rewind the chronometer. Before the machines, before the models — a curious mind in Kolkata, gathering knowledge across classrooms and code editors. These are the roots that grew into an engineer.",
    hue: 263,
    shape: "crystal",
  },
  arsenal: {
    id: "arsenal",
    route: "/skills",
    year: "Gathered Across Eras",
    title: "The Arsenal",
    chapter: "Chapter III",
    tagline: "Tools collected through time.",
    narration:
      "Every traveler carries an arsenal. Forged across semesters, internships, and late-night builds, these are the languages, frameworks, and systems stockpiled for whatever the next era demands.",
    hue: 28,
    shape: "cube",
  },
  inventions: {
    id: "inventions",
    route: "/projects",
    year: "2025 → ∞",
    title: "The Inventions",
    chapter: "Chapter IV",
    tagline: "Artifacts from the lab.",
    narration:
      "Step into the workshop. Each invention is an artifact — a snapshot of a problem solved in its own era. Real-time vision, fraud-hunting agents, and a voice that commands the machine itself.",
    hue: 142,
    shape: "torus",
  },
  expeditions: {
    id: "expeditions",
    route: "/experience",
    year: "2024 — 2025",
    title: "The Expeditions",
    chapter: "Chapter V",
    tagline: "Missions through the timeline.",
    narration:
      "No traveler journeys alone — these are the expeditions: a remote internship won as the best of the cohort, and a study voyage to a university across the sea. Each left its mark.",
    hue: 330,
    shape: "beacon",
  },
  credentials: {
    id: "credentials",
    route: "/certifications",
    year: "Across Eras",
    title: "The Credentials",
    chapter: "Chapter VI",
    tagline: "Sigils of mastery and service.",
    narration:
      "Each credential is a stamp on the passport of the journey — formal AI/ML and engineering programmes, plus the extra-curricular service that shaped the person behind the code. Click any sigil to enlarge it in-page.",
    hue: 45,
    shape: "scroll",
  },
  chronicle: {
    id: "chronicle",
    route: "/resume",
    year: "The Full Record",
    title: "The Chronicle",
    chapter: "Chapter VII",
    tagline: "The complete dossier.",
    narration:
      "Every time traveler keeps a chronicle — the unexpurgated record of education, work, and craft. Read it in full, or carry a copy into your own era.",
    hue: 210,
    shape: "scroll",
  },
  transmit: {
    id: "transmit",
    route: "/contact",
    year: "The Future",
    title: "Transmit",
    chapter: "Chapter VIII",
    tagline: "Send a signal across spacetime.",
    narration:
      "The journey loops forward. If our timelines should intersect, transmit a signal — a message, a role, an idea worth building. The receiver is always on.",
    hue: 189,
    shape: "beacon",
  },
};

export const ERA_ORDER: EraId[] = [
  "present",
  "origins",
  "arsenal",
  "inventions",
  "expeditions",
  "credentials",
  "chronicle",
  "transmit",
];

export const ROUTE_TO_ERA: Record<string, EraId> = Object.fromEntries(
  Object.values(ERAS).map((e) => [e.route, e.id]),
) as Record<string, EraId>;

// ----------------------------------------------------------------------------
//  PERSONA
// ----------------------------------------------------------------------------
export const PERSONA = {
  name: "Prottus Manna",
  shortName: "PM",
  role: "Full-Stack Developer & AI Engineer",
  location: "Kolkata, India",
  relocation: "Open to Relocation",
  email: "prottus2004@gmail.com",
  phone: "+91 8697736679",
  phoneRaw: "918697736679",
  portfolio: "prottus-visual-showcase.vercel.app",
  tagline: "Full Stack Developer & AI Enthusiast",
  resumePdf: "/Resume.pdf",
};

/** Short bio for the About section. TODO: replace with your real bio. */
export const BIO =
  "Full-stack developer and AI engineer based in Kolkata, building production AI systems — from real-time multi-model vision pipelines to agentic voice assistants. I care about clean architecture, shipping fast, and the craft between model and product.";

export const SOCIALS = [
  { label: "GitHub", url: "https://github.com/prottus2004" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/prottus-manna-6b39b2268" },
  { label: "Facebook", url: "https://www.facebook.com/share/1ZXfdDUd1g/" },
  { label: "Instagram", url: "https://www.instagram.com/__pratyush_manna__?igsh=ZWVremdtZHRvaHph" },
];

// ----------------------------------------------------------------------------
//  ORIGINS — education, achievements, hobbies
// ----------------------------------------------------------------------------
export interface EduEntry {
  degree: string;
  institution: string;
  grade: string;
  year: string;
}

export const EDUCATION: EduEntry[] = [
  {
    degree: "B.Tech in Information Technology",
    institution: "Institute of Engineering & Management (IEM), Kolkata — MAKAUT",
    grade: "SGPA 9.00 · Final Semester",
    year: "2022 — 2026",
  },
  {
    degree: "Class XII · ISC",
    institution: "National Gems Higher Secondary School, Behala",
    grade: "Aggregate 76%",
    year: "2022",
  },
  {
    degree: "Class X · ICSE",
    institution: "National Gems Higher Secondary School, Behala",
    grade: "Aggregate 86%",
    year: "2020",
  },
];

export const ACHIEVEMENTS = [
  "Best Intern Award — Zidio Developments (Aug 2025): scored 83% as the sole engineer on production-grade application engineering projects.",
  "NUS Study Visit — AI & ML: selected by IEM Kolkata to visit the National University of Singapore; trained in AI, ML, IoT & Data Analytics.",
  "Active CodeChef & LeetCode problem solver — sharpening data-structures and algorithms in real time.",
];

export const HOBBIES = [
  "Augmented Reality Development",
  "Cyber Security Techniques",
  "Painting",
  "Guitar & Singing",
];

// ----------------------------------------------------------------------------
//  ARSENAL — skills (expanded from CV)
// ----------------------------------------------------------------------------
export interface SkillCategory {
  title: string;
  icon: string;        // lucide icon name resolved in component
  skills: string[];
  hue: number;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    icon: "Code2",
    hue: 210,
    skills: ["Python", "Java", "C", "C++", "JavaScript", "SQL", "HTML/CSS"],
  },
  {
    title: "Full-Stack Development",
    icon: "Layers",
    hue: 263,
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "REST API Design",
      "Streamlit",
      "JSON / HTTP",
    ],
  },
  {
    title: "AI / ML & LLMs",
    icon: "Brain",
    hue: 28,
    skills: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "Large Language Models",
      "RAG Pipelines",
      "Prompt Engineering",
      "NLP",
      "CNN",
      "LSTM",
      "U-Net",
      "Transformers",
      "Supervised / Unsupervised",
    ],
  },
  {
    title: "System & Integration",
    icon: "Network",
    hue: 142,
    skills: [
      "REST API",
      "Third-Party API Integration",
      "Sync Integration",
      "Automated Retraining Pipelines",
    ],
  },
  {
    title: "Databases",
    icon: "Database",
    hue: 189,
    skills: ["MongoDB (NoSQL)", "MySQL", "PostgreSQL", "SQL Query Optimisation"],
  },
  {
    title: "Cloud & DevOps",
    icon: "Cloud",
    hue: 330,
    skills: [
      "Microsoft Azure (Fundamentals)",
      "Git",
      "GitHub",
      "Linux",
      "CI/CD Pipelines",
      "Agile / Scrum",
    ],
  },
  {
    title: "Core CS Concepts",
    icon: "Binary",
    hue: 250,
    skills: [
      "Data Structures & Algorithms",
      "OOP",
      "System Design",
      "SDLC",
      "Operating Systems",
      "DBMS",
      "Computer Networks",
    ],
  },
  {
    title: "Engineering Practices",
    icon: "Wrench",
    hue: 45,
    skills: [
      "Clean / Modular Code",
      "Technical Documentation",
      "Issue Triage & Debugging",
      "Test Documentation",
      "Code Review",
    ],
  },
];

// ----------------------------------------------------------------------------
//  INVENTIONS — projects (from CV)
// ----------------------------------------------------------------------------
export interface Project {
  icon: string;
  title: string;
  period: string;
  summary: string;
  details: string[];
  technologies: string[];
  gradient: string;
  videoUrl: string | null;
  embeddable: boolean;
  comingSoon: boolean;
  /** Optional demo screenshot shown as a card banner + lightbox. */
  image?: string;
}

export const PROJECTS: Project[] = [
  {
    icon: "Eye",
    title: "Vision AI Suite",
    period: "May 2025 — June 2025",
    summary:
      "A real-time, concurrent multi-model deep-learning pipeline that captions, segments, and detects — all at once.",
    details: [
      "Architected a full-stack concurrent pipeline running three specialised neural networks simultaneously: a CNN+LSTM encoder-decoder for image captioning, a U-Net for semantic segmentation, and a custom object-detection module.",
      "Deployed as a real-time interactive Streamlit app supporting live video and image inputs with optimised low-latency concurrent execution across all three architectures.",
      "Created a multi-model serving strategy that minimises GPU memory and reduces latency — triaging performance at the hardware and service layer.",
    ],
    technologies: ["Python", "PyTorch", "CNN+LSTM", "U-Net", "OpenCV", "Streamlit"],
    gradient: "from-blue-500 to-purple-500",
    videoUrl:
      "https://www.linkedin.com/posts/prottus-manna-6b39b2268_visionaisuit-ai-cnn-activity-7347253949453819904-_06z",
    embeddable: false,
    comingSoon: false,
  },
  {
    icon: "Shield",
    title: "Fraud Guard AI",
    period: "June 2025 — July 2025",
    summary:
      "A full-stack production fraud-detection system with a self-retraining pipeline and real-time alerts.",
    details: [
      "Designed and deployed a full-stack production application with REST API integrations to third-party email/data services, structuring the backend for modular, independently deployable services.",
      "Built an automated retraining pipeline triggered by analyst feedback — continuous model updates with zero manual intervention, improving detection accuracy by ~18% and system reliability.",
      "Applied Agile/Scrum and CI/CD-oriented delivery across the full SDLC with a cross-functional team; authored design docs and API specs for scalability and maintainability.",
    ],
    technologies: ["Python", "React.js", "Node.js", "Express.js", "REST API"],
    gradient: "from-red-500 to-pink-500",
    videoUrl:
      "https://drive.google.com/file/d/1bkOfZUWhVQg563-N316FH7ZTb5fGHV9o/preview",
    embeddable: true,
    comingSoon: false,
  },
  {
    icon: "Brain",
    title: "Optimus AI",
    period: "July 2025 — Present",
    summary:
      "An agentic voice assistant that maps a single spoken command to a multi-step, self-healing action.",
    details: [
      "End-to-end agentic pipeline: LLM intent router → Pydantic-typed tool registry (20+ tools) → supervised self-healing executor (LLM-guided retry) → natural-language response, with wake-word detection and voice barge-in.",
      "Pluggable multi-provider LLM chain (NVIDIA NIM → local Ollama) behind a uniform interface with health-based fallback, plus a date-aware RAG pipeline for hallucination-free answers on live facts, prices, and news.",
      "Low-latency streaming TTS engine (4-worker parallel synthesis + sentence chunking) and runtime OS-level app discovery fusing 5 sources — zero hardcoded app lists, portable across Windows machines.",
      "Disk-first code-generation agent (plan → 70B streaming generation → atomic save → syntax verification) and SQLite-backed memory for continuity and preference learning across sessions.",
    ],
    technologies: [
      "Python",
      "LangChain",
      "LangGraph",
      "LLMs (NIM/Ollama)",
      "RAG",
      "edge-TTS",
      "SQLite",
      "Selenium",
      "PyAutoGUI",
      "Pydantic",
    ],
    gradient: "from-green-500 to-cyan-500",
    videoUrl: null,
    embeddable: false,
    comingSoon: true,
  },
  {
    icon: "FileText",
    title: "Resume Builder",
    period: "May 9 — June 9, 2025",
    summary:
      "A full-stack resume builder that turns a profile into a polished, ATS-friendly CV with live preview, multiple templates, and one-click PDF export.",
    details: [
      "Live-preview editor: edits on the structured form update the rendered CV instantly, with multiple switchable templates and section reordering.",
      "ATS-friendly export pipeline: generates clean, text-selectable PDFs with consistent typography and metadata so resumes parse correctly in applicant tracking systems.",
      "Built a modular full-stack architecture with reusable field components, local autosave, and template-aware styling for a smooth, app-like editing flow.",
    ],
    technologies: ["React.js", "Node.js", "Express.js", "PDF Export", "Tailwind CSS"],
    gradient: "from-indigo-500 to-sky-500",
    videoUrl: null,
    embeddable: false,
    comingSoon: false,
    image: "/demos/resume-builder.svg",
  },
  {
    icon: "LifeBuoy",
    title: "Helplink AI",
    period: "May 9 — June 9, 2025",
    summary:
      "An AI-powered disaster rescue coordination system that fuses satellite, cellular, and multilingual SOS telemetry into a real-time geo-priority heatmap for search-and-rescue dispatch.",
    details: [
      "Three-stream AI fusion: Sentinel-1 SAR flood detection (cloud-piercing radar that maps inundated basins and isolated buildings), multilingual SOS NLP across 10 Indian languages (zero-shot transformer + dialect/intent extraction that geolocates distress messages), and cell-tower anomaly telemetry (dead-zone and congestion analysis pinpointing survivor clusters) — all weighted and merged into a single live heatmap.",
      "Real-time command dashboard: NASA mission-control style React + Leaflet console with WebSocket-pushed operations feed, survivor markers, team tracker, alert timeline, and one-click rescue dispatch to active coordinates — built for NDRF/SDRF-style coordination.",
      "Production-ready backend: async FastAPI + WebSockets, APScheduler-driven live scenario simulation, async SQLAlchemy with SQLite, and modular AI engines for satellite, NLP, and cellular layers — designed to be deployable in offline-resilient, low-connectivity field environments.",
    ],
    technologies: ["Python", "FastAPI", "React.js", "Leaflet.js", "WebSockets", "HuggingFace Transformers", "PyTorch", "SAR Processing"],
    gradient: "from-amber-500 to-rose-500",
    videoUrl: null,
    embeddable: false,
    comingSoon: false,
    image: "/demos/Helplink_dashboard.png",
  },
];

/** Curated subset shown on the home "Selected Work" showcase. */
export const SELECTED_PROJECTS = PROJECTS.slice(0, 3);

// ----------------------------------------------------------------------------
//  EXPEDITIONS — experience / missions
// ----------------------------------------------------------------------------
export interface Expedition {
  role: string;
  org: string;
  period: string;
  location: string;
  summary: string;
  details: string[];
  skills: string[];
  /** Optional list of certificates to render as "View Certificate" links. */
  certificates?: { label: string; url: string }[];
}

export const EXPEDITIONS: Expedition[] = [
  {
    role: "Machine Learning Intern",
    org: "Zidio Developments",
    period: "May 2025 — Aug 2025",
    location: "Remote",
    summary:
      "Solo engineer on three comprehensive Data Science, Analytics & ML projects — recognised as the best intern of the cohort.",
    details: [
      "Worked as a solo intern on three end-to-end Data Science and Analytics projects with Machine Learning.",
      "Gained expertise in using LLMs efficiently and designing new architectures.",
      "Trained and evaluated model accuracy; created stacked ensembles; fine-tuned pre-existing model weights.",
      "Worked extensively with APIs and shipped production-grade application engineering.",
      "Achieved an 83% score and was recognised as the Best Intern.",
    ],
    skills: [
      "LLMs",
      "Model Training",
      "API Integration",
      "Model Evaluation",
      "Architecture Design",
      "Supervised / Unsupervised Models",
      "Graph-Based Models",
    ],
    certificates: [
      { label: "Internship Certificate", url: "/Certificate.pdf" },
      { label: "Training Certificate", url: "/Training%20Certificate.pdf" },
    ],
  },
  {
    role: "AI & ML Study Visit",
    org: "National University of Singapore",
    period: "Selected via IEM Kolkata",
    location: "Singapore",
    summary:
      "Selected on first-year performance to receive specialised training abroad.",
    details: [
      "Selected by IEM Kolkata to visit the National University of Singapore (NUS).",
      "Received specialised training in Artificial Intelligence, Machine Learning, IoT, and Data Analytics.",
      "Brought back hands-on exposure to cutting-edge AI/ML research culture.",
    ],
    skills: ["AI", "Machine Learning", "IoT", "Data Analytics", "Research"],
    certificates: [
      { label: "NUS Certificate", url: "/NUS.pdf" },
    ],
  },
];

// ----------------------------------------------------------------------------
//  CHRONICLE — full CV record (for the Resume page)
// ----------------------------------------------------------------------------
export interface CvWorkEntry {
  title: string;
  stack: string;
  period: string;
  bullets: string[];
}

export const CV_WORK: CvWorkEntry[] = [
  {
    title: "Fraud Guard AI",
    stack: "Python, React.js, Node.js, Express.js, REST API",
    period: "June 2025 — July 2025",
    bullets: [
      "Designed and deployed a full-stack production application with REST API integrations to third-party email/data services, structuring the backend for modular, independently deployable services.",
      "Built an automated retraining pipeline triggered by analyst feedback, enabling continuous deployment of model updates with zero manual intervention — improving detection accuracy by ~18% and system reliability.",
      "Applied Agile/Scrum practices and CI/CD-oriented delivery across the full SDLC in collaboration with a cross-functional team; authored technical design docs and API specs supporting scalability, maintainability, and long-term operational excellence.",
    ],
  },
  {
    title: "Vision AI Suite",
    stack: "Python, PyTorch, CNN+LSTM, U-Net, OpenCV, Streamlit",
    period: "May 2025 — June 2025",
    bullets: [
      "Architected and deployed a full-stack concurrent multi-model deep-learning pipeline running three specialised neural networks simultaneously: a CNN+LSTM encoder-decoder for image captioning, a U-Net for semantic segmentation, and a custom object-detection module.",
      "Deployed the complete AI application pipeline as a real-time interactive Streamlit app, supporting live video and image inputs with optimised low-latency concurrent execution across all three model architectures.",
      "Created an efficient multi-model serving strategy to minimise GPU memory usage and reduce latency — demonstrating the ability to triage and resolve system performance issues at the hardware and service layer.",
    ],
  },
];

export interface CvProjectEntry {
  title: string;
  period: string;
  stack: string;
  bullets: string[];
}

export const CV_KEY_PROJECT: CvProjectEntry = {
  title: "Optimus AI — Agentic Voice Assistant",
  period: "July 2025 — Present",
  stack:
    "Python, LangChain, LangGraph, LLMs (NIM/Ollama), RAG, edge-TTS, SQLite, Selenium, PyAutoGUI, Pydantic",
  bullets: [
    "Architected an end-to-end agentic AI pipeline mapping a single spoken command to a multi-step action: LLM intent router → Pydantic-typed tool registry (20+ tools) → supervised self-healing executor (LLM-guided retry on failure) → natural-language response generator, with wake-word detection and voice barge-in.",
    "Built a pluggable multi-provider LLM chain (NVIDIA NIM → local Ollama) behind a uniform interface with automatic health-based fallback, and a date-aware RAG pipeline (LLM query reformulation, recency filters, multi-source web grounding) for hallucination-free real-time answers on live facts, prices, and news.",
    "Engineered a low-latency streaming TTS engine (4-worker parallel synthesis + sentence chunking + instant “thinking” filler) and runtime OS-level app discovery fusing 5 sources (Start Menu shortcuts, registry App Paths, Uninstall entries, PATH, web fallback) with fuzzy reconciliation — zero hardcoded app lists, portable across Windows machines.",
    "Implemented a disk-first code-generation agent (plan → 70B-model streaming generation → atomic save → IDE focus-guarded typing → syntax verification with LLM-assisted regeneration) and SQLite-backed memory for conversation continuity and preference learning across sessions.",
  ],
};

/** Resume skill groups rendered as labeled lines (mirrors the CV exactly). */
export const CV_SKILL_LINES: { label: string; items: string[] }[] = [
  { label: "Programming Languages", items: ["Python", "Java", "C/C++"] },
  {
    label: "Full-Stack Development",
    items: ["React.js", "Node.js", "Express.js", "REST API Design", "JSON", "HTTP/HTTPS", "Streamlit"],
  },
  {
    label: "AI / ML & LLMs",
    items: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "Large Language Models (LLMs)",
      "RAG Pipelines",
      "Prompt Engineering",
      "NLP",
      "CNN",
      "LSTM",
      "U-Net",
      "Transformer Models",
      "Supervised/Unsupervised Learning",
    ],
  },
  {
    label: "System & Application Integration",
    items: ["REST API", "Third-Party API Integration", "Sync Integration", "Automated Retraining Pipelines"],
  },
  {
    label: "Databases",
    items: ["MongoDB (NoSQL)", "MySQL", "PostgreSQL", "SQL Query Optimisation"],
  },
  {
    label: "Cloud & DevOps",
    items: ["Microsoft Azure (Fundamentals)", "Git", "GitHub", "Linux", "CI/CD Pipelines", "Agile/Scrum"],
  },
  {
    label: "Core CS Concepts",
    items: [
      "Data Structures & Algorithms (DSA)",
      "OOP",
      "System Design",
      "SDLC",
      "Operating Systems",
      "DBMS",
      "Computer Networks",
    ],
  },
  {
    label: "Engineering Practices",
    items: [
      "Clean/Modular Code",
      "Technical Documentation",
      "Issue Triage & Debugging",
      "Test Documentation",
      "Code Review",
    ],
  },
  {
    label: "Full-Stack Web Development",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "Frontend/Backend",
      "Hosting",
      "Monitoring & Logging",
      "Performance Optimization",
      "Security",
      "Testing",
      "DevOps & Deployment",
      "API Integration & Communication",
      "Version Control & Collaboration",
    ],
  },
];

export const CV_ACHIEVEMENTS = [
  "Best Intern Award — Zidio Developments (Aug 2025): scored 83% on final evaluation on production-grade application engineering projects as the sole engineer on the team.",
  "NUS Study Visit — AI & ML: selected by IEM Kolkata to visit the National University of Singapore; received specialised training in Artificial Intelligence, Machine Learning, IoT, and Data Analytics.",
  "Coding efficiencies with real-time projects: active CodeChef and LeetCode problem solver.",
];