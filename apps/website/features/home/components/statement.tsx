const STATEMENT =
  'Every number has a source. Every run has a budget. Measurement decides, LLMs describe.';

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
      <p className="display-light statement-size mx-auto max-w-[20ch] text-center text-bone">
        {words.map(({ key, word }) => (
          <span key={key} className="word">
            {word}
          </span>
        ))}
      </p>
    </section>
  );
}
