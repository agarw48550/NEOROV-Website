import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[var(--surface-raised)]">
      <div className="page-container flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-eyebrow">Reef Monitoring ROV</p>
          <p className="text-body-sm mt-4 max-w-md text-foreground/60">
            A custom pilot-operated ROV for shallow-water coastal monitoring.
            NParks Permit No: NP/RP 25-078.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-body-sm text-foreground/55">
          <Link href="/rov" className="transition-colors hover:text-foreground">
            The ROV
          </Link>
          <Link href="/team" className="transition-colors hover:text-foreground">
            Team
          </Link>
          <Link href="/blog" className="transition-colors hover:text-foreground">
            Blog
          </Link>
        </div>
      </div>
      <div className="border-t border-white/5 px-6 py-4 text-center md:px-8">
        <p className="text-body-sm text-foreground/45">
          UWCSEA East · Coral reef field research
        </p>
      </div>
    </footer>
  );
}
