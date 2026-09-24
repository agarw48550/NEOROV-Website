import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#0a1220]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="text-sm tracking-[0.18em] uppercase text-secondary">
            Reef Monitoring ROV
          </p>
          <p className="mt-3 max-w-md text-sm text-foreground/60">
            A custom pilot-operated ROV for shallow-water coastal monitoring.
            NParks Permit No: NP/RP 25-078.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-foreground/55">
          <Link href="/rov" className="hover:text-foreground">
            The ROV
          </Link>
          <Link href="/team" className="hover:text-foreground">
            Team
          </Link>
          <Link href="/blog" className="hover:text-foreground">
            Blog
          </Link>
        </div>
      </div>
      <div className="border-t border-white/5 px-5 py-4 text-center text-xs text-foreground/40 md:px-8">
        Built for coral reef research · UWCSEA East
      </div>
    </footer>
  );
}
