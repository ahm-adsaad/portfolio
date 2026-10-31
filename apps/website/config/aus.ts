import { USER } from './user';

export type AusSection = { id: string; heading: string; paragraphs: string[] };
export type AusQuote = { text: string };

const AUS_NEWS_2026 = {
  outlet: 'AUS News',
  date: '2026-06-22',
  headline:
    'AUS engineering student receives competitive Tau Beta Pi Scholarship',
  url: 'https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship',
};

/**
 * Copy for /aus. First person in the sections, third person in `intro`.
 * AUS topics only: no employer work outside the university on this page.
 */
export const AUS_PAGE = {
  path: '/aus',
  /** First publication (YYYY-MM-DD). */
  published: '2026-10-31',
  title: `${USER.name} at AUS: Tau Beta Pi, AI Hub and Research`,
  description: `${USER.name} (${USER.fullName}) at the American University of Sharjah: Tau Beta Pi UAE Alpha President, AI Hub Assistant, researcher and 3.96 GPA.`,
  ogTitle: `${USER.name} at AUS`,
  ogMeta: 'Tau Beta Pi · AI Hub · Research',
  eyebrow: 'AUS · Sharjah, UAE',
  h1: `${USER.name} at the American University of Sharjah`,
  intro: `${USER.name}, published by AUS as ${USER.fullName}, is a Computer Engineering senior at the American University of Sharjah (AUS) in the United Arab Emirates. He holds a 3.96 GPA, is President of Tau Beta Pi UAE Alpha, works as an AI Hub Assistant at the Center for Innovation in Teaching and Learning, and graduates in December 2026.`,
  facts: [
    { label: 'Degree', value: 'B.S. Computer Engineering, December 2026' },
    { label: 'GPA', value: '3.96 / 4.0' },
    { label: 'Tau Beta Pi UAE Alpha', value: 'President' },
    { label: 'AI Hub Assistant', value: 'Since November 2024' },
  ],
  sections: [
    {
      id: 'computer-engineering',
      heading: 'Computer Engineering at AUS',
      paragraphs: [
        "I am completing a B.S. in Computer Engineering at AUS, which I started in August 2023 and expect to finish in December 2026, with a 3.96 GPA out of 4.0. I study on an Academic Merit Scholarship and have made the Dean's List six times and the Chancellor's List three times.",
        "My coursework includes machine learning, data structures and algorithms, computer architecture, computer networks and wireless communications. Computer architecture is also the subject of my [cycle-accurate simulator of Mano's Basic Computer](/projects/mano-computer-simulator), written in Python.",
      ],
    },
    {
      id: 'tau-beta-pi',
      heading: 'Tau Beta Pi UAE Alpha',
      paragraphs: [
        "Tau Beta Pi is the engineering honor society. Its AUS chapter, UAE Alpha, was installed on 3 March 2024 as the society's [first international chapter](https://www.aus.edu/media/news/aus-launches-first-international-chapter-of-tau-beta-pi-engineering-honor-society). I am the chapter's President, after serving as its Vice President, and I have also served as Treasurer of the IEEE Solid-State Circuits Society.",
        'In 2026 I received a Tau Beta Pi Scholarship, a US$1,000 award for my final semester of full-time undergraduate study. The society gives it to initiated members through a competitive, merit-based process that considers academic achievement, extracurricular involvement and potential to contribute to the engineering profession.',
      ],
    },
    {
      id: 'ai-hub',
      heading: 'The AUS AI Hub',
      paragraphs: [
        'Since November 2024 I have worked part-time as an AI Hub Assistant at the AUS Center for Innovation in Teaching and Learning (CITL). The [AI Hub](https://aihub.aus.edu/) gives AUS faculty, staff and students vetted AI tools, guides and resources.',
        'I led the redesign of the AI Hub website against stakeholder requirements, prototyped it in Figma and maintain it on WordPress, and I write evaluations of emerging AI tools that shape how faculty adopt them. My profile is on the [AI Hub team page](https://aihub.aus.edu/team/mr-ahmad/).',
      ],
    },
    {
      id: 'research',
      heading: 'Research at AUS',
      paragraphs: [
        'From October 2024 to July 2025 I was an Undergraduate Research Assistant in Computer Science and Engineering at AUS. I worked on speech emotion recognition, classifying emotion from audio with log-mel spectrograms and fine-tuned ResNet and MobileNet models in TensorFlow, and reached roughly 75% accuracy. AUS News describes the project as an emotion recognition system that analyzes sound patterns in the Arabic language.',
        'I also designed and fabricated the custom PCB for an [energy harvesting LoRaWAN sensor node](/projects/lorawan-sensor-node) in an AUS research group whose work was supported by an AUS Undergraduate Research Grant, from circuit design to measuring how efficiently the board uses power.',
      ],
    },
    {
      id: 'college-of-engineering',
      heading: 'Web work for the College of Engineering',
      paragraphs: [
        'Since August 2026 I have been a Web Design and Development Consultant for the AUS College of Engineering. I ship WordPress and Elementor sites to live domains in under 48 hours, build them so non-technical teams can maintain them on their own, and keep them accessible to WCAG AA.',
      ],
    },
  ] satisfies AusSection[],
  coverage: {
    id: 'aus-news',
    heading: 'In AUS News',
    article: AUS_NEWS_2026,
    lead: `On 22 June 2026, AUS News covered my Tau Beta Pi Scholarship under my full name, ${USER.fullName}, in [${AUS_NEWS_2026.headline}](${AUS_NEWS_2026.url}). Three of my answers from that article:`,
    /** Verbatim from the article (checked 2026-10-31); cite as "AUS News, 22 June 2026". */
    quotes: [
      {
        text: 'This scholarship is a proud moment for me because it recognizes the path I have been building at AUS.',
      },
      {
        text: 'Working on both AI models and hardware taught me to think about the whole system. It is not enough for a model to perform well in testing. It also has to be efficient, reliable and suitable for the environment where it will be used.',
      },
      {
        text: 'I want to keep working at the intersection of AI and hardware. My goal is to help turn advanced AI research into technology that is efficient, dependable and ready for real use.',
      },
    ] satisfies AusQuote[],
    citation: 'AUS News, 22 June 2026',
  },
  closing:
    'I graduate in December 2026 and am available to start work in January 2027.',
  sources: [
    {
      label: `AUS News, 22 June 2026: ${AUS_NEWS_2026.headline}`,
      url: AUS_NEWS_2026.url,
    },
    {
      label:
        'AUS News, 14 March 2024: AUS launches first international chapter of Tau Beta Pi Engineering Honor Society',
      url: 'https://www.aus.edu/media/news/aus-launches-first-international-chapter-of-tau-beta-pi-engineering-honor-society',
    },
    {
      label: 'AI Hub, Center for Innovation in Teaching and Learning, AUS',
      url: 'https://aihub.aus.edu/',
    },
  ],
};
