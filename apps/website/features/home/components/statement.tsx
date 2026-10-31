import { Fragment } from 'react';

const STATEMENT =
  'I build systems that have to prove they work. An AI pipeline, a CPU, a circuit board.';

/**
 * Word-by-word opacity driven by `animation-timeline: view()`. Where that is
 * unsupported the words are simply fully visible.
 */
export function Statement() {
  let offset = 0;
  const words = STATEMENT.split(' ').map((word) => {
    const key = `${offset}-${word}`;
    offset += word.length + 1;
    return { key, word };
  });

  return (
    <section
      className="section flex min-h-[60svh] items-center md:min-h-[80vh]"
      data-tone="ink"
      aria-label="Statement"
    >
      <p className="display-light statement-size mx-auto max-w-[20ch] text-balance text-center text-bone">
        {words.map(({ key, word }, i) => (
          <Fragment key={key}>
            {i > 0 ? ' ' : null}
            <span className="word">{word}</span>
          </Fragment>
        ))}
      </p>
    </section>
  );
}
