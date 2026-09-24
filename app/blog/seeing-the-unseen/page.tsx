import Link from "next/link";
import { seeingTheUnseen } from "@/content/blog";

export const metadata = {
  title: seeingTheUnseen.title,
  description: seeingTheUnseen.excerpt,
};

export default function SeeingTheUnseenPage() {
  return (
    <article className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10 depth-gradient">
        <div className="absolute inset-0 caustics opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0f1729_75%)]" />
      </div>

      <header className="px-5 pb-12 pt-32 md:px-10 md:pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs tracking-[0.28em] uppercase text-secondary">
            {seeingTheUnseen.category} · {seeingTheUnseen.date}
          </p>
          <h1 className="mt-5 text-4xl leading-tight text-foreground md:text-6xl">
            {seeingTheUnseen.title}
          </h1>
          <p className="mt-5 text-base text-foreground/65 md:text-lg">
            {seeingTheUnseen.subtitle}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-5 pb-24 md:px-0">
        <div className="prose-article rounded-sm bg-[color-mix(in_srgb,var(--background)_72%,transparent)] px-1 py-2 backdrop-blur-[2px] md:px-2">
          {seeingTheUnseen.sections.map((section, i) => (
            <section key={section.heading ?? `intro-${i}`} className="mb-2">
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-4 border-t border-white/10 pt-8">
          <Link href="/blog" className="text-sm text-secondary hover:underline">
            ← All posts
          </Link>
          <Link href="/team" className="text-sm text-foreground/60 hover:text-foreground">
            Meet the team
          </Link>
          <Link href="/rov" className="text-sm text-foreground/60 hover:text-foreground">
            Explore the ROV
          </Link>
        </div>
      </div>
    </article>
  );
}
