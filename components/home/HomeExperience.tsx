"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HeroRovCanvas, ReefStoryCanvas } from "@/components/3d/DynamicCanvases";
import { reefStoryBeats } from "@/content/home";

export function HomeExperience() {
  const storyRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = storyRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(Math.min(1, Math.max(0, scrolled / Math.max(total, 1))));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden depth-gradient">
        <div className="pointer-events-none absolute inset-0 caustics opacity-70" />
        <HeroRovCanvas />
        <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-16 pt-28 md:px-10 md:pb-20">
          <div className="mx-auto w-full max-w-6xl">
            <p className="mb-4 text-xs tracking-[0.28em] uppercase text-secondary">
              UWCSEA East · NParks NP/RP 25-078
            </p>
            <h1 className="max-w-3xl text-4xl leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Reef Monitoring ROV
            </h1>
            <p className="mt-5 max-w-xl text-base text-foreground/70 md:text-lg">
              A custom pilot-operated ROV for shallow-water coastal monitoring.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/rov"
                className="bg-secondary px-6 py-3 text-sm text-[#0f1729] transition hover:brightness-110"
              >
                Explore the ROV
              </Link>
              <Link
                href="/team"
                className="border border-foreground/25 px-6 py-3 text-sm text-foreground/90 transition hover:border-secondary hover:text-secondary"
              >
                Meet the team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section ref={storyRef} className="relative h-[320vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <ReefStoryCanvas progress={progress} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0f1729]/85 via-[#0f1729]/35 to-transparent" />
          <div className="relative z-10 flex h-full items-center px-5 md:px-10">
            <div className="mx-auto w-full max-w-6xl">
              <div className="max-w-lg">
                {reefStoryBeats.map((beat, i) => {
                  const start = i / reefStoryBeats.length;
                  const end = (i + 1) / reefStoryBeats.length;
                  const active = progress >= start && progress < end;
                  const last = i === reefStoryBeats.length - 1 && progress >= start;
                  const visible = active || last;
                  return (
                    <article
                      key={beat.id}
                      className={`transition-all duration-500 ${
                        visible
                          ? "opacity-100 translate-y-0"
                          : "pointer-events-none absolute opacity-0 translate-y-4"
                      }`}
                      aria-hidden={!visible}
                    >
                      <p className="text-xs tracking-[0.25em] uppercase text-accent">
                        {beat.eyebrow}
                      </p>
                      <h2 className="mt-3 text-3xl leading-tight text-foreground md:text-4xl">
                        {beat.title}
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-foreground/70 md:text-base">
                        {beat.body}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-24 md:px-10 md:py-32 depth-gradient">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs tracking-[0.25em] uppercase text-secondary">
            Continue
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl text-foreground md:text-4xl">
            From the workshop to the reef — and into the story behind the vehicle.
          </h2>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/rov"
              className="bg-accent px-6 py-3 text-sm text-foreground transition hover:brightness-110"
            >
              Vehicle features
            </Link>
            <Link
              href="/blog/seeing-the-unseen"
              className="border border-foreground/25 px-6 py-3 text-sm text-foreground/90 transition hover:border-secondary"
            >
              Read Seeing the Unseen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
