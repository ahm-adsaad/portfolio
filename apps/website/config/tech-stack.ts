export type TechStackGroup = {
  /** Group heading shown above the tags. */
  title: string;
  /** Technologies in display order. */
  items: string[];
};

export const TECH_STACK: TechStackGroup[] = [
  {
    title: 'Languages',
    items: [
      'Python',
      'TypeScript',
      'JavaScript',
      'C++',
      'SQL',
      'MATLAB',
      'HTML/CSS',
    ],
  },
  {
    title: 'AI / ML',
    items: [
      'PyTorch',
      'TensorFlow',
      'Scikit-Learn',
      'Anthropic Claude API',
      'RAG',
      'Embeddings',
      'Hybrid search (BM25 + RRF)',
      'Prompt engineering',
      'Computer vision',
      'Fine-tuning',
      'Quantization',
      'WebGPU',
      'WebLLM',
      'Transformers.js',
    ],
  },
  {
    title: 'Tools & Infrastructure',
    items: [
      'PostgreSQL',
      'Supabase',
      'Docker',
      'Node.js',
      'Next.js',
      'React',
      'Cloudflare Workers',
      'Git',
      'CI/CD',
      'Railway',
      'Pandas',
      'NumPy',
      'Claude Code',
      'Cursor',
      'Figma',
      'EasyEDA',
    ],
  },
];
