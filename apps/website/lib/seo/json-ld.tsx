import type { Graph, Thing, WithContext } from 'schema-dts';

type JsonLdProps = {
  /** A single typed node, or a multi-node `@graph` (Graph carries its own `@context`). */
  code: WithContext<Thing> | Graph;
};

export const JsonLd = ({ code }: JsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(code) }}
  />
);

export * from 'schema-dts';
