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
  /** Full page title before the ' | Ahmad Saad' suffix; overrides title plus titleSummary. */
  seoTitle?: string;
  /** Meta description, 120 to 160 characters, names Ahmad Saad. */
  seoDescription?: string;
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
    seoDescription:
      'Trend Radar by Ahmad Saad: a production TikTok trend-detection platform where measurement decides and LLMs describe, with cost governance and 315 tests.',
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
    titleSummary: 'Private AI for Company Documents',
    seoDescription:
      'LocalAI by Ahmad Saad: private AI for company documents that runs entirely in the browser, with page-level citations and a Playwright privacy audit.',
    caseStudy: `## The problem I found

Talking with people at different companies, I kept hearing the same thing. They were not allowed to put work material into ChatGPT or Claude, or would not do it themselves, because the data would go to a company they do not trust. So they either did not use AI at work or used it only for things that did not matter. The tools they could use at work did less than the ones they used at home.

## What I did about it

I treated this as a discovery problem and gathered requirements from those conversations, the way a forward deployed engineer would on a customer site: nothing may leave the machine, and the person using it must be able to check that; self-hosting a model was not an option, so it could not become an IT project; it had to work for people who are not technical; it had to do real work over contracts, reports and handbooks and show where each answer came from; and it had to run on the laptops people already have.

## What I built

LocalAI runs the language model, the embeddings and a cross-encoder reranker on the user's own GPU and CPU, inside the browser. There is no server, no account and no API key; the model weights download once and stay cached. You drop in a PDF, Word, text or Markdown file and ask in plain language. Every answer cites the file and page it came from, a \`/extract\` command pulls named fields under a JSON grammar so the output always parses, and follow-up questions are rewritten before retrieval. Privacy is enforced rather than promised: a strict Content Security Policy lets the page talk only to itself and the model-weight hosts, and a Playwright audit boots the app on a real GPU, indexes a document, asks a question, and asserts that no request left for any other host, none carried a body, and none contained document text.

## How I measured it

I built a golden set of 49 questions over four generated PDFs and a Node eval that runs in CI, then compared eight embedders and five rerankers before choosing. The eval found and fixed three real bugs along the way (a rerank that was undoing retrieval, excerpt clipping that dropped the answering sentence for half the questions, and a prompt that fed the model its own earlier mistakes). On an integrated Intel laptop GPU, the slowest realistic case, retrieval puts the right excerpt in the prompt for 100% of questions and the default 1.5B model answers 100% of single-turn questions correctly. Every turn in the app reports its own latency and throughput.

## Stack

TypeScript, React, Vite, WebLLM (WebGPU), Transformers.js (WASM), pdf.js, mammoth, IndexedDB, Vitest, Playwright, GitHub Actions, Cloudflare Workers.

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
      'WebLLM',
      'Transformers.js',
      'TypeScript',
      'React',
      'Vite',
      'pdf.js',
      'mammoth',
      'IndexedDB',
      'Vitest',
      'Playwright',
      'GitHub Actions',
      'Cloudflare Workers',
    ],
    shortDescription:
      'Private AI for company documents that runs entirely in the browser, with page-level citations and a Playwright audit that proves nothing leaves the device.',
    description:
      'Private AI for company documents that runs entirely in the browser. Built after conversations with people who were barred from, or afraid of, putting work data into hosted AI: no server, no account, nothing leaves the device, and a Playwright audit proves it. Hybrid retrieval with a cross-encoder reranker, page-level citations, structured extraction, and a CI eval that scores 100% retrieval and 100% single-turn answers on an integrated laptop GPU.',
    impact:
      '100% retrieval and 100% single-turn answers on an integrated laptop GPU, with nothing leaving the device.',
  },
  {
    id: 'mano-computer-simulator',
    title: 'Mano Basic Computer Simulator',
    titleSummary: 'Cycle-Accurate CPU in Python',
    seoTitle: 'Mano Basic Computer Simulator in Python',
    seoDescription:
      "Ahmad Saad's cycle-accurate simulator of Mano's Basic Computer in Python, with full ISA support, micro-operation control, and a CLI debugger.",
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
    seoTitle: 'Energy Harvesting LoRaWAN Sensor Node PCB',
    seoDescription:
      "Ahmad Saad's custom 2-layer PCB for an energy harvesting LoRaWAN sensor node: ATMEGA4809 MCU, LoRa radio, AEM10330 PMIC and PPK2 current profiling.",
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
