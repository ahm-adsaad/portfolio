export type Project = {
  /** Stable unique identifier (used as list key/anchor). */
  id: string;
  title: string;
  /**
   * Project period for display and sorting.
   * Use "MM.YYYY" format. Omit `end` for ongoing projects.
   */
  period: {
    /** Start date (e.g., "05.2025"). */
    start: string;
    /** End date; leave undefined for "Present". */
    end?: string;
  };
  /** Public URL (site, repository, demo, or video). Omit when nothing public exists yet. */
  link?: string;
  /** Github repository URL. */
  github?: string;
  /** Tags/technologies for chips or filtering. */
  skills: string[];
  /** Short one-line description for list view. */
  shortDescription?: string;
  /** Optional rich description; Markdown and line breaks supported. */
  description?: string;
  /** Logo image URL (absolute or path under /public). */
  logo?: string;
  /** Square cover image for the hero carousel (absolute or path under /public). */
  image?: string;
  /** One-line outcome or result, shown as "Impact" in the hero carousel. */
  impact?: string;
  /** Whether the project card is expanded by default in the UI. */
  isExpanded?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: 'trend-radar',
    title: 'Trend Radar',
    period: {
      start: '06.2026',
      end: '08.2026',
    },
    // Repo is private while it is prepared for public release.
    // Add link + github (github.com/ahm-adsaad/trend-radar) once it is public.
    // TODO: cover image pending
    skills: [
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Docker',
      'Next.js',
      'Anthropic Claude API',
    ],
    shortDescription:
      'Production TikTok trend-detection platform where measurement decides and LLMs describe.',
    description:
      'A production trend-detection platform built on the official TikTok API for Business. Deterministic signals (caption n-gram clustering, creator spread, adoption curves, freshness) decide every verdict; LLMs only describe what the measurements found and never write URLs, IDs, counts, or provenance.\n\nDesign principles: never invent, an unknown value renders as a blank marker with provenance on every figure. No silent discarding, lifecycle stages are tags rather than gates and a safety verdict demotes rather than deletes. Self-calibration over magic constants. Degrade honestly, a failed pull serves the last good state with a stale badge rather than a blank surface.',
    impact:
      'Holds combined data and inference spend to a single-digit-dollar daily budget.',
    isExpanded: true,
  },
  {
    id: 'localai',
    title: 'LocalAI',
    period: {
      start: '08.2026',
    },
    link: 'https://github.com/ahm-adsaad/LocalAI',
    github: 'https://github.com/ahm-adsaad/LocalAI',
    // TODO: cover image pending
    skills: [
      'TypeScript',
      'React',
      'WebGPU',
      'WebLLM',
      'Transformers.js',
      'IndexedDB',
    ],
    shortDescription:
      'On-device RAG document Q&A: PDF ingestion, hybrid retrieval, and generation entirely in the browser.',
    description:
      'Privacy-preserving RAG that runs PDF ingestion, embedding, retrieval, and generation entirely in the browser. No backend, no document data leaving the device.\n\nFull pipeline: layout-aware PDF extraction, overlapping chunking, MiniLM sentence embeddings (q8), and hybrid retrieval combining dense cosine similarity, BM25, and Reciprocal Rank Fusion. Streaming on-device generation with Qwen 2.5, Phi-4, and Llama 3.2 (Q4f16) on WebGPU; WebLLM and Transformers.js run in a Web Worker so model load, embedding, and token decode never block the UI.\n\nRetrieval tuning: query expansion, prose-density reranking, and intro-chunk pinning to fix weak overview queries and noisy dashboard PDFs. IndexedDB persistence with offline weight caching and a VRAM-aware multi-model catalog.',
    impact: 'No backend and no document data leaving the device.',
  },
  {
    id: 'mano-computer-simulator',
    title: 'Mano Basic Computer Simulator',
    period: {
      start: '02.2026',
    },
    link: 'https://github.com/ahm-adsaad/manos-basic-computer-simulator',
    github: 'https://github.com/ahm-adsaad/manos-basic-computer-simulator',
    // TODO: replace with a real screenshot of the simulator
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=640&h=640&fit=crop&q=70&auto=format',
    skills: ['Python'],
    shortDescription:
      "Cycle-accurate CPU simulator of Mano's Basic Computer with full ISA support and a CLI debugger.",
    description:
      "Cycle-accurate simulator of Mano's Basic Computer with full datapath, complete ISA support, and micro-operation level control, plus a CLI debugger for stepwise execution and state inspection.",
  },
  {
    id: 'lorawan-sensor-node',
    title: 'Energy Harvesting LoRaWAN Sensor Node',
    period: {
      // TODO: confirm the actual project date
      start: '2025',
    },
    // No public repo; best presented visually.
    // TODO: board renders / schematic captures / current-profile plots pending
    skills: ['EasyEDA', 'PCB design', 'Embedded systems'],
    shortDescription:
      'Custom 2-layer PCB with an ATMEGA4809 MCU, LoRa transceiver, and an energy harvesting power path.',
    description:
      'Designed and fabricated a 2-layer custom PCB integrating an ATMEGA4809 MCU, XL1276 LoRa transceiver, AEM10330 PMIC, MIC94069 load switch, and BME680/CO sensors. Covered schematic capture, IPC-2221-compliant trace routing, and inline PPK2 measurement headers for current profiling across the LoRaWAN transmission cycle.',
  },
  {
    id: 'portfolio',
    title: 'ahmadsaad.dev',
    period: {
      start: '08.2026',
    },
    link: 'https://ahmadsaad.dev',
    github: 'https://github.com/ahm-adsaad/portfolio',
    // TODO: replace with a real screenshot of the site
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&h=640&fit=crop&q=70&auto=format',
    skills: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
    shortDescription:
      'This site: a personal portfolio with a 3D coverflow project showcase, deployed on Cloudflare Workers.',
  },
];
