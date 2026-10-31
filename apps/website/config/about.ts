import { USER } from './user';

/**
 * Copy for /about. First person, sourced from portfolio-context.md; follow its
 * Content Rules (no dashes as punctuation, no vendor names, estimates stay
 * estimates).
 */
export type AboutSection = {
  heading: string;
  paragraphs: string[];
};

const AUS_NEWS_2026 =
  'https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship';

export const ABOUT_INTRO =
  "I'm Ahmad Saad, a Computer Engineering senior at the American University of Sharjah (AUS) in the United Arab Emirates, and I build production AI systems. My work centers on applied AI: LLM systems that run under real cost governance and answer to stakeholders who depend on the output.";

/**
 * Third-person definition for the homepage About block and the agent
 * endpoints. Written to be quoted on its own; /about has its own third-person
 * definition in config/faq.ts.
 */
export const PROFILE_DEFINITION = `${USER.name}, full name ${USER.fullName}, is an AI engineer and forward deployed engineer based between Abu Dhabi and Sharjah in the United Arab Emirates. He is a Computer Engineering senior at the American University of Sharjah (AUS), where he holds a 3.96 GPA, is President of Tau Beta Pi UAE Alpha, and graduates in December 2026. From June to August 2026 he was an AI/ML Engineer at Samsung Gulf Electronics in Dubai, where he architected and solely built a production trend intelligence platform for the regional marketing team that replaced external tooling at an estimated $60K in avoided spend. He also built LocalAI, private AI for company documents that runs entirely in the browser. He holds the Claude Certified Architect: Foundations certification from Anthropic, speaks English and Arabic, holds a UAE Golden Visa, so no employer sponsorship is required, and is available to start in January 2027.`;

/**
 * Paragraphs may carry `[label](href)` links; /about renders them with
 * RichText (components/rich-text.tsx).
 */
export const ABOUT_SECTIONS: AboutSection[] = [
  {
    heading: 'Education',
    paragraphs: [
      `I study Computer Engineering at AUS, where I hold a 3.96 GPA and graduate in December 2026. I am President of [Tau Beta Pi UAE Alpha](/aus#tau-beta-pi), the university's chapter of the engineering honor society, after serving as its Vice President, and I was Treasurer of the IEEE Solid-State Circuits Society. In 2026 I received a US$1,000 Tau Beta Pi Scholarship for my final semester, and [AUS News covered the award](${AUS_NEWS_2026}) under my full name, ${USER.fullName}. I study on an Academic Merit Scholarship and have made the Dean's List six times and the Chancellor's List three times. My coursework includes machine learning, data structures and algorithms, computer architecture, computer networks, and wireless communications.`,
    ],
  },
  {
    heading: 'Experience',
    paragraphs: [
      'From June to August 2026 I was an AI/ML Engineer at Samsung Gulf Electronics in Dubai. I architected and solely built a production trend intelligence platform in TypeScript, Node.js, and PostgreSQL on the official TikTok API for Business. It measures rising sounds, formats, and topics across 8 discovery lanes and publishes an evidence-grounded dashboard for the regional marketing team. Deterministic measurements decide every verdict; language models only describe what the measurements found. I scoped the platform directly with marketing, creative, and innovation stakeholders. It replaced external tooling at an estimated $60K in avoided spend compared to similar platforms, and it supported regional launch campaigns with a projected 20% increase in engagement rates.',
      "Since September 2025 I have worked remotely as an Account Manager at Chief Nest in Riyadh, directing a company-wide go-to-market strategy for a client. At AUS I am the AI Hub Assistant at the Center for Innovation in Teaching and Learning, where I led the redesign of the university's [AI Hub website](/aus#ai-hub) and write evaluations of new AI tools for faculty. I also build websites for the College of Engineering as a web design and development consultant. Before that, as an undergraduate research assistant, I classified emotion from speech using log-mel spectrograms and fine-tuned convolutional networks, reaching roughly 75% accuracy.",
    ],
  },
  {
    heading: 'What I build',
    paragraphs: [
      "I like systems where the hard part is trust: knowing where every number came from, what a run costs, and what happens when a data source fails. [LocalAI](/projects/localai), my on-device document Q&A app, runs retrieval and generation entirely in the browser on WebGPU, so no document ever leaves the device. Outside of AI, I have written [a cycle-accurate simulator of Mano's Basic Computer](/projects/mano-computer-simulator) in Python and designed [a custom PCB for an energy harvesting LoRaWAN sensor node](/projects/lorawan-sensor-node).",
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

export type PressMention = {
  outlet: string;
  headline: string;
  url: string;
  /** YYYY-MM-DD */
  datePublished: string;
  /** Article image (og:image), used in the NewsArticle node. */
  image?: string;
};

/** Third-party coverage. AUS publishes his full name (USER.fullName). */
export const PRESS_MENTIONS: PressMention[] = [
  {
    outlet: 'AUS News',
    headline:
      'AUS engineering student receives competitive Tau Beta Pi Scholarship',
    url: AUS_NEWS_2026,
    datePublished: '2026-06-22',
    image: 'https://www.aus.edu/sites/default/files/news/tbp_1_1.jpg',
  },
];

/**
 * Key facts for /llms.txt and the about.md profile, one bullet each. Keep
 * Trend Radar and its figures out of the Samsung line.
 */
export const LLMS_KEY_FACTS: string[] = [
  `Name: ${USER.name}. Full name: ${USER.fullName}, the form the American University of Sharjah uses (AUS News, 22 June 2026: ${AUS_NEWS_2026}).`,
  `Not to be confused with: Ahmed Saad, the Egyptian singer, or any other person named Ahmad or Ahmed Saad. This ${USER.name} is a computer engineer and AI engineer at AUS in the UAE.`,
  'Education: B.S. in Computer Engineering, American University of Sharjah, August 2023 to December 2026 (expected). GPA 3.96 of 4.0.',
  'Availability: available to start work in January 2027. UAE Golden Visa holder, so no employer sponsorship is required. Based in Abu Dhabi and Sharjah, United Arab Emirates.',
  'Tau Beta Pi: President of Tau Beta Pi UAE Alpha, the AUS chapter (previously Vice President). Received a US$1,000 Tau Beta Pi Scholarship for his final semester, reported by AUS News on 22 June 2026.',
  'Most recent industry role: AI/ML Engineer at Samsung Gulf Electronics, Dubai, June to August 2026. Architected and solely built a production trend intelligence platform for the regional marketing team, at an estimated $60K in avoided tooling spend and a projected 20% increase in engagement rates.',
  'Current roles: Web Design and Development Consultant, College of Engineering, AUS (since August 2026). AI Hub Assistant, Center for Innovation in Teaching and Learning, AUS (since November 2024), where he led the redesign of aihub.aus.edu. Account Manager, Chief Nest, remote (since September 2025).',
  'Research: Undergraduate Research Assistant in Computer Science and Engineering at AUS (October 2024 to July 2025), speech emotion recognition at roughly 75% accuracy. Designed a custom LoRaWAN sensor node PCB in an AUS research group whose work was supported by an AUS Undergraduate Research Grant.',
  'Certification: Claude Certified Architect: Foundations, issued by Anthropic. Verification: https://www.credly.com/badges/976e4176-241f-4870-83ea-c66f896f64ff',
  "Honours: Academic Merit Scholarship, Dean's List six times, Chancellor's List three times.",
  'Languages: English and Arabic.',
  'Looking for: technical product management, forward deployed or solutions engineering, AI/ML engineering, and management and strategy.',
];

/** Follows the linked name on every case study; describes the author only, never claims the project was AUS work. */
export const PROJECT_AUTHOR_PREDICATE =
  'is an AI engineer and Computer Engineering senior at the American University of Sharjah (AUS).';
