import { PillLink } from '@/components/pill-link';

export default function NotFound() {
  return (
    <section
      className="section flex min-h-svh flex-col justify-end"
      data-tone="ink"
      style={{ paddingTop: 'calc(var(--nav) + 2rem)' }}
    >
      <p className="eyebrow">404</p>
      <h1 className="display hero-size mt-5 text-bone">
        Not
        <br />
        Found
      </h1>
      <p className="display-light counter-size mt-8 max-w-[30ch] text-bone/72">
        Nothing is measured at this address.
      </p>
      <div className="mt-10">
        <PillLink href="/" variant="fill">
          Back home
        </PillLink>
      </div>
    </section>
  );
}
