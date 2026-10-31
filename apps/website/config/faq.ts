import { USER } from './user';

/** /about only: the third-person definition and the Questions block. */
export type FaqItem = { question: string; answer: string };

/** First body paragraph on /about (not in the page hero: extractors drop it). */
export const ABOUT_DEFINITION = `${USER.name}, full name ${USER.fullName}, is an AI engineer, forward deployed engineer and Computer Engineering senior at the American University of Sharjah (AUS) in the United Arab Emirates. He is President of Tau Beta Pi UAE Alpha and an AI Hub Assistant at the AUS Center for Innovation in Teaching and Learning, and in June 2026 AUS News reported his US$1,000 Tau Beta Pi Scholarship. He graduates in December 2026 and is available to start work in January 2027.`;

export const FAQ_HEADING = `Questions about ${USER.name}`;

/** Plain text only (no links): the FAQPage JSON-LD repeats it character for character. */
export const ABOUT_FAQ: FaqItem[] = [
  {
    question: `Is ${USER.fullName} the same person as ${USER.name}?`,
    answer: `Yes. ${USER.name} is the name he uses professionally, and the American University of Sharjah uses his full name, as AUS News did when it covered his Tau Beta Pi Scholarship in June 2026. He is an AI engineer and Computer Engineering senior at AUS in the United Arab Emirates. He is not Ahmed Saad, the Egyptian singer.`,
  },
  {
    question: `Is ${USER.name} available for hire?`,
    answer: `Yes. ${USER.name} graduates from the American University of Sharjah in December 2026 and is available to start work in January 2027. He is looking for roles in technical product management, forward deployed or solutions engineering, AI/ML engineering, and management and strategy.`,
  },
  {
    question: `Does ${USER.name} need visa sponsorship?`,
    answer: `No. ${USER.name} holds a UAE Golden Visa, so no employer sponsorship is required. He is based between Abu Dhabi and Sharjah in the United Arab Emirates and speaks English and Arabic.`,
  },
  {
    question: `What is ${USER.name}'s role in Tau Beta Pi?`,
    answer: `${USER.name} is President of Tau Beta Pi UAE Alpha, the engineering honor society's chapter at the American University of Sharjah, after serving as its Vice President. In 2026 he received a US$1,000 Tau Beta Pi Scholarship for his final semester, which AUS News reported on 22 June 2026.`,
  },
  {
    question: `What does ${USER.name} do at the American University of Sharjah besides his degree?`,
    answer: `Since November 2024 ${USER.name} has been an AI Hub Assistant at the AUS Center for Innovation in Teaching and Learning, where he led the redesign of the AI Hub website, aihub.aus.edu. Since August 2026 he has also built College of Engineering websites as a web design and development consultant. He also designed a LoRaWAN sensor node PCB in a research group whose work was supported by an AUS Undergraduate Research Grant.`,
  },
  {
    question: `What did ${USER.name} do at Samsung Gulf Electronics?`,
    answer: `From June to August 2026, ${USER.name} was an AI/ML Engineer at Samsung Gulf Electronics in Dubai. He architected and solely built a production trend intelligence platform for the regional marketing team, which replaced external tooling at an estimated $60K in avoided spend and supported launch campaigns with a projected 20% increase in engagement rates.`,
  },
  {
    question: `What has ${USER.name} built?`,
    answer: `${USER.name}'s projects include LocalAI, private AI for company documents that runs entirely in the browser and scored 100% retrieval on a 49-question evaluation, a cycle-accurate Mano Basic Computer simulator in Python, and a custom PCB for an energy harvesting LoRaWAN sensor node. Each has a case study on the projects page.`,
  },
  {
    question: `What certification and honours does ${USER.name} hold?`,
    answer: `${USER.name} holds the Claude Certified Architect: Foundations certification, issued by Anthropic and verifiable on Credly. At the American University of Sharjah he studies on an Academic Merit Scholarship, has made the Dean's List six times and the Chancellor's List three times, and received a Tau Beta Pi Scholarship in 2026.`,
  },
];
