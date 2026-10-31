import type { FaqItem } from '@/config/faq';
import type { FAQPage } from 'schema-dts';

/** Question as H3, answer as one paragraph, text exactly as in config/faq.ts. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-10">
      {items.map((item) => (
        <div key={item.question}>
          <h3 className="body-lg font-medium text-fg">{item.question}</h3>
          <p className="prose-body body-lg mt-3 text-fg/72">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}

/** FAQPage node built from the same items, so markup and visible text cannot drift. */
export function faqPageNode(items: FaqItem[], pageUrl: string): FAQPage {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    url: pageUrl,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
