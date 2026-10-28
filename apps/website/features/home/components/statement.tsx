const STATEMENT =
  'Technical enough to build the system. Comfortable enough to scope it. Measurement decides. Models describe.';

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
      <p className="display-light statement-size mx-auto max-w-[22ch] text-center text-bone">
        {words.map(({ key, word }) => (
          <span key={key} className="word">
            {word}
          </span>
        ))}
      </p>
    </section>
  );
}
