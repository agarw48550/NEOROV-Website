"use client";

import { useEffect, useRef, useState } from "react";
import { RovFeatureCanvas } from "@/components/3d/DynamicCanvases";
import { fieldRecord, rovFeatures } from "@/content/rov-features";

export function RovPageClient() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="bg-background">
      <div className="relative">
        <div className="pointer-events-none sticky top-0 z-0 h-[100svh]">
          <RovFeatureCanvas features={rovFeatures} activeIndex={active} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1729]/88 via-[#0f1729]/35 to-transparent md:via-[#0f1729]/25" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0f1729]/70 to-transparent" />
        </div>

        <div className="relative z-10 -mt-[100svh]">
          <section className="flex min-h-[100svh] items-end px-5 pb-20 pt-32 md:px-10">
            <div className="mx-auto w-full max-w-6xl">
              <div className="max-w-md">
                <p className="text-xs tracking-[0.28em] uppercase text-secondary">
                  The vehicle
                </p>
                <h1 className="mt-3 text-4xl text-foreground md:text-6xl">
                  Reef Monitoring ROV
                </h1>
                <p className="mt-4 text-foreground/70">
                  Scroll to inspect the systems that take a shore-deployable
                  frame from pool trials to open-water reef work.
                </p>
              </div>
            </div>
          </section>

          {rovFeatures.map((feature, i) => (
            <section
              key={feature.id}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              className="flex min-h-[90svh] items-center px-5 py-20 md:px-10"
            >
              <div className="mx-auto w-full max-w-6xl">
                <div className="max-w-md bg-[color-mix(in_srgb,var(--background)_60%,transparent)] p-6 backdrop-blur-sm md:p-8">
                  <p className="text-xs tracking-[0.25em] uppercase text-accent">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(rovFeatures.length).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 text-3xl text-foreground md:text-4xl">
                    {feature.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/70 md:text-base">
                    {feature.body}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      <section className="relative z-10 border-t border-white/5 px-5 py-24 md:px-10 depth-gradient">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs tracking-[0.25em] uppercase text-secondary">
            Field record
          </p>
          <h2 className="mt-3 text-3xl text-foreground">Proven in the water</h2>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {fieldRecord.map((item) => (
              <div key={item.label}>
                <p className="text-2xl text-secondary md:text-3xl">{item.value}</p>
                <p className="mt-2 text-xs tracking-wide text-foreground/50">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
