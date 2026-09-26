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
  /** Label for a call-to-action pointing at `link` (e.g. a live demo). */
  ctaLabel?: string;
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
  /**
   * Short summary for the page title: "{title}: {titleSummary} | Ahmad Saad".
   * Falls back to a trimmed `shortDescription`.
   */
  titleSummary?: string;
  /**
   * Long-form write-up (Markdown) for /projects/{id}. A project gets its own
   * page only when this is set.
   */
  caseStudy?: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'trend-radar',
    title: 'Trend Radar',
    titleSummary: 'Production TikTok Trend Detection',
    caseStudy: `## Problem

A regional marketing team needed to know which sounds, formats, and topics were rising on TikTok early enough to act on them, and it needed to trust the answer. A dashboard that lets a language model decide what counts as a trend will eventually present a confident guess as a finding. Trend Radar is built so that cannot happen.

## Approach

Measurement decides, LLMs describe. Deterministic signals decide every verdict: caption n-gram clustering, creator spread, adoption curves, and freshness. A model can name a mechanic or demote a measured riser, but it can never admit an entity the measurements rejected, and it never writes URLs, IDs, counts, or provenance.

Four more rules follow from that one. Never invent: an unknown value renders as a blank marker, never a guess or a zero, and every figure carries its provenance. No silent discarding: lifecycle stages are tags rather than gates, and a safety verdict demotes or annotates a result rather than deleting it. Self-calibration over magic constants: thresholds come from each lane's own trailing spend history. Degrade honestly: every data store has a labeled fallback, so a failed pull serves the last good state with a stale badge instead of a blank surface.

## Architecture

Collectors run on the official TikTok API for Business and commercial data vendors across 8 discovery lanes, with cursor-paged retrieval, retry with exponential backoff, and per-day idempotency. A two-stage screen follows: a Claude-based brand-fit gate returns structured go or no-go verdicts against voice and brand guardrails, then a computer vision and reasoning layer scores GCC cultural applicability, in Arabic and English.

Cost governance sits in PostgreSQL: per-run spend meters, a cross-process daily budget ledger, and balance-gated runs. Combined data and inference spend holds to a fixed single-digit-dollar daily budget. The system ships as a Dockerized collector with 5 scheduled cron lanes, 16 versioned SQL migrations, and 315 automated tests in an npm workspaces monorepo.

## This repository

The public repository is a sanitized engineering extract. The client is referred to only as "the brand", and its identity, prompts, product catalog, competitor lane, dashboard UI, and all collected data are removed. The detection engine, collectors, cost governance, and database schema are present with their tests.

## My role

I architected and built the system on my own, and scoped it directly with the marketing, creative, and innovation stakeholders who used it, iterating in short feedback cycles.`,
    period: {
      start: '06.2026',
      end: '08.2026',
    },
    link: 'https://github.com/ahm-adsaad/trend-radar',
    github: 'https://github.com/ahm-adsaad/trend-radar',
    image: '/projects/trend-radar.jpg',
    // First three surface as "Tech" in the carousel.
    skills: [
      'TypeScript',
      'Node.js',
      'Claude API',
      'PostgreSQL',
      'Docker',
      'Next.js',
      'REST API',
    ],
    shortDescription:
      'Production TikTok trend-detection platform where measurement decides and LLMs describe.',
    description:
      'A production trend-detection platform built on the official TikTok API for Business. Deterministic signals (caption n-gram clustering, creator spread, adoption curves, freshness) decide every verdict; LLMs only describe what the measurements found and never write URLs, IDs, counts, or provenance.\n\nDesign principles: never invent, an unknown value renders as a blank marker with provenance on every figure. No silent discarding, lifecycle stages are tags rather than gates and a safety verdict demotes rather than deletes. Self-calibration over magic constants. Degrade honestly, a failed pull serves the last good state with a stale badge rather than a blank surface.',
    impact:
      'An estimated $60K in cost savings and a projected 20% increase in engagement rates.',
    isExpanded: true,
  },
  {
    id: 'localai',
    title: 'LocalAI',
    titleSummary: 'On-Device RAG Document Q&A',
    caseStudy: `## Problem

Most document Q&A tools upload your files to a server, embed them there, and send the text to a hosted model. For contracts, medical records, or internal reports that is often a dealbreaker. LocalAI answers questions about a PDF without the document, its embeddings, or the question ever leaving the device.

## Approach

Everything runs in the browser. There is no backend and a hard no-remote-inference guarantee: ingestion, embedding, retrieval, and generation all happen locally on WebGPU.

## Architecture

Ingestion uses layout-aware PDF extraction and overlapping chunking. Chunks are embedded with MiniLM sentence embeddings quantized to q8. Retrieval is hybrid: dense cosine similarity and BM25 keyword scoring run side by side and are merged with Reciprocal Rank Fusion, so exact terms and paraphrases both get found.

Generation streams from Qwen 2.5, Phi-4, or Llama 3.2, quantized to Q4f16 and run through WebLLM. WebLLM and Transformers.js live in a Web Worker, so model load, embedding, and token decode never block the UI. Documents, embeddings, and model weights persist in IndexedDB, which makes repeat visits work offline, and a VRAM-aware catalog only offers models the current GPU can hold.

## Retrieval tuning

Two failure cases shaped the tuning. Broad questions like "what is this document about?" retrieved weak, scattered chunks, so the pipeline adds query expansion and pins the introduction chunk for overview queries. Dashboard-style PDFs full of labels and numbers crowded out real explanations, so a prose-density reranker favors chunks that read as sentences. Context window, max tokens, and excerpt length are tuned against browser prefill and decode latency rather than set to the largest values that fit.

## My role

I designed and built LocalAI end to end. The repository is public and the live demo runs in any browser with WebGPU.`,
    period: {
      start: '08.2026',
    },
    // Live demo; the repo is public and stays on the github link.
    link: 'https://localai.ahmadsaad.dev',
    github: 'https://github.com/ahm-adsaad/LocalAI',
    ctaLabel: 'Try the live demo',
    image: '/projects/localai.jpg',
    // First three surface as "Tech" in the carousel.
    skills: [
      'WebGPU',
      'Qwen 2.5',
      'Llama 3.2',
      'TypeScript',
      'React',
      'WebLLM',
      'Transformers.js',
      'IndexedDB',
    ],
    shortDescription:
      'On-device RAG document Q&A that runs entirely in the browser: PDF ingestion, embeddings, hybrid retrieval, and generation on WebGPU.',
    description:
      'Privacy-preserving RAG that runs PDF ingestion, embedding, retrieval, and generation entirely in the browser. No backend, no document data leaving the device.\n\nFull pipeline: layout-aware PDF extraction, overlapping chunking, MiniLM sentence embeddings (q8), and hybrid retrieval combining dense cosine similarity, BM25, and Reciprocal Rank Fusion. Streaming on-device generation with Qwen 2.5, Phi-4, and Llama 3.2 (Q4f16) on WebGPU; WebLLM and Transformers.js run in a Web Worker so model load, embedding, and token decode never block the UI.\n\nRetrieval tuning: query expansion, prose-density reranking, and intro-chunk pinning to fix weak overview queries and noisy dashboard PDFs. IndexedDB persistence with offline weight caching and a VRAM-aware multi-model catalog.',
    impact: 'No backend and no document data leaving the device.',
  },
  {
    id: 'mano-computer-simulator',
    title: 'Mano Basic Computer Simulator',
    titleSummary: 'Cycle-Accurate CPU in Python',
    caseStudy: `## Problem

Mano's Basic Computer, from M. Morris Mano's *Computer System Architecture*, is the textbook machine many computer engineering students first learn processor design on: a 16-bit accumulator machine with 4096 words of memory, a small register set, and a common bus. On paper it is easy to follow one instruction. It is much harder to see how the control unit sequences micro-operations across many clock cycles, which is exactly where students get lost.

## Approach

The simulator models the machine at the level the textbook teaches it, one micro-operation at a time, instead of interpreting instructions as black boxes. Each clock cycle advances the sequence counter, asserts the control signals for that timing step, and moves data across the bus between registers and memory. The result follows the datapath diagram step by step, which makes it useful for checking a hand-traced program.

## Architecture

The simulator is written in Python and models the full datapath: the registers, memory, and common bus, plus micro-operation level control for the fetch, decode, and execute phases of each instruction. The full instruction set is supported: memory-reference instructions such as AND, ADD, LDA, STA, BUN, BSA, and ISZ, the register-reference instructions, and the input-output instructions.

A command-line debugger sits on top for stepwise execution and state inspection, so you can walk a program through the machine and see what each step changed.

## Why cycle accuracy

An instruction-level interpreter would reach the same final register values, but it would hide the part the course is about. Modeling each timing step makes the extra cycles of indirect addressing and the order of register transfers visible, which is the difference between knowing what an instruction does and knowing how the hardware does it.

## My role

I wrote the simulator and debugger myself. The source is public on GitHub.`,
    period: {
      start: '2025',
    },
    link: 'https://github.com/ahm-adsaad/manos-basic-computer-simulator',
    github: 'https://github.com/ahm-adsaad/manos-basic-computer-simulator',
    // Placeholder cover; overwrite public/projects/mano-computer-simulator.jpg with a real shot.
    image: '/projects/mano-computer-simulator.jpg',
    skills: ['Python'],
    shortDescription:
      "Cycle-accurate CPU simulator of Mano's Basic Computer with full ISA support and a CLI debugger.",
    description:
      "Cycle-accurate simulator of Mano's Basic Computer with full datapath, complete ISA support, and micro-operation level control, plus a CLI debugger for stepwise execution and state inspection.",
  },
  {
    id: 'lorawan-sensor-node',
    title: 'Energy Harvesting LoRaWAN Sensor Node',
    titleSummary: 'Custom 2-Layer PCB Design',
    caseStudy: `## Problem

Environmental sensors in the field are usually limited by their batteries, not their electronics. The goal of this project was a LoRaWAN sensor node that runs from harvested energy, which means every part of the board has to respect a tight power budget, and the power draw has to be measurable rather than assumed.

## Approach

I designed and fabricated a custom 2-layer PCB around a low-power microcontroller and a long-range radio, with an energy harvesting power path and a switched sensor rail. Measurement was part of the design from the start: the board carries inline PPK2 measurement headers so the current draw can be profiled across the full LoRaWAN transmission cycle.

## Architecture

- **MCU:** an ATMEGA4809 microcontroller.
- **Radio:** an XL1276 LoRa transceiver handles the LoRaWAN link.
- **Power:** an AEM10330 PMIC manages the energy harvesting path, and a MIC94069 load switch gates the switched rail.
- **Sensors:** a BME680 environmental sensor and a CO sensor.

## Why measure

In a LoRaWAN node the radio transmission is typically the largest current draw, and the long idle stretch between transmissions is where a board slowly drains its storage. Seeing both takes current measurement across the whole cycle rather than a single reading, which is why the measurement headers are designed into the board instead of added later.

## Process

The work covered schematic capture and layout in EasyEDA, IPC-2221-compliant trace routing, and fabrication of the 2-layer board. The inline PPK2 headers turn current profiling into a routine measurement instead of a rework job.

## My role

I designed the schematic and the layout and had the board fabricated. There is no public repository for this project.`,
    period: {
      start: '2026',
    },
    // No public repo; best presented visually.
    // Placeholder cover; overwrite public/projects/lorawan-sensor-node.jpg with a board render.
    image: '/projects/lorawan-sensor-node.jpg',
    skills: ['EasyEDA', 'PCB design', 'Embedded systems'],
    shortDescription:
      'Custom 2-layer PCB with an ATMEGA4809 MCU, LoRa transceiver, and an energy harvesting power path.',
    impact:
      'Sustainable, battery-free environmental monitoring powered by harvested energy.',
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
    // Placeholder cover; overwrite public/projects/portfolio.jpg with a real screenshot.
    image: '/projects/portfolio.jpg',
    skills: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
    shortDescription:
      'This site: a personal portfolio with a 3D coverflow project showcase, deployed on Cloudflare Workers.',
  },
];

/** Projects with a write-up get their own page at /projects/{id}. */
export const PROJECT_PAGES = PROJECTS.filter((project) => project.caseStudy);
