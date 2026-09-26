/**
 * Copy for /about. First person, sourced from portfolio-context.md; follow its
 * Content Rules (no dashes as punctuation, no vendor names, estimates stay
 * estimates).
 */
export type AboutSection = {
  heading: string;
  paragraphs: string[];
};

export const ABOUT_INTRO =
  "I'm Ahmad Saad, a Computer Engineering senior at the American University of Sharjah in the United Arab Emirates, and I build production AI systems. My work centers on applied AI: LLM systems that run under real cost governance and answer to stakeholders who depend on the output.";

export const ABOUT_SECTIONS: AboutSection[] = [
  {
    heading: 'Education',
    paragraphs: [
      "I study Computer Engineering at AUS, where I hold a 3.96 GPA and graduate in December 2026. I am President of the university's Tau Beta Pi chapter, after serving as its Vice President, and I was Treasurer of the IEEE Solid-State Circuits Society. I study on an Academic Merit Scholarship and have made the Dean's List six times and the Chancellor's List three times. My coursework includes machine learning, data structures and algorithms, computer architecture, computer networks, and wireless communications.",
    ],
  },
  {
    heading: 'Experience',
    paragraphs: [
      'From June to August 2026 I was an AI/ML Engineer at Samsung Gulf Electronics in Dubai. I architected and solely built a production trend intelligence platform in TypeScript, Node.js, and PostgreSQL on the official TikTok API for Business. It measures rising sounds, formats, and topics across 8 discovery lanes and publishes an evidence-grounded dashboard for the regional marketing team. Deterministic measurements decide every verdict; language models only describe what the measurements found. I scoped the platform directly with marketing, creative, and innovation stakeholders. It replaced external tooling at an estimated $60K in avoided spend compared to similar platforms, and it supported regional launch campaigns with a projected 20% increase in engagement rates.',
      "Since September 2025 I have worked remotely as an Account Manager at Chief Nest in Riyadh, directing a company-wide go-to-market strategy for a client. At AUS I am the AI Hub Assistant at the Center of Innovation in Teaching and Learning, where I led the redesign of the university's AI Hub website and write evaluations of new AI tools for faculty. I also build websites for the College of Engineering as a web design and development consultant. Before that, as an undergraduate research assistant, I classified emotion from speech using log-mel spectrograms and fine-tuned convolutional networks, reaching roughly 75% accuracy.",
    ],
  },
  {
    heading: 'What I build',
    paragraphs: [
      'I like systems where the hard part is trust: knowing where every number came from, what a run costs, and what happens when a data source fails. LocalAI, my on-device document Q&A app, runs retrieval and generation entirely in the browser on WebGPU, so no document ever leaves the device. Outside of AI, I have written a cycle-accurate simulator of Mano\'s Basic Computer in Python and designed a custom PCB for an energy harvesting LoRaWAN sensor node.',
    ],
  },
  {
    heading: "What's next",
    paragraphs: [
      'I am looking for roles in technical product management, forward deployed or solutions engineering, AI/ML engineering, and management and strategy. The common thread is working close to the people who will use a system: scoping it with them, then building it and measuring whether it worked.',
      'I hold a UAE Golden Visa, so no employer sponsorship is required. I am based between Abu Dhabi and Sharjah, I speak English and Arabic, and I am available to start in January 2027.',
    ],
  },
];
