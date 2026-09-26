"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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

  const activeFeature = rovFeatures[active];

  return (
    <div className="bg-background">
      <div className="relative">
        <div className="pointer-events-none sticky top-0 z-0 h-[100svh]">
          <RovFeatureCanvas features={rovFeatures} activeIndex={active} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#041018]/90 via-[#041018]/40 to-transparent md:via-[#041018]/25" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#041018]/75 to-transparent" />
          {activeFeature?.image && (
            <motion.div
              key={activeFeature.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute bottom-6 right-5 hidden w-44 overflow-hidden border border-white/15 shadow-2xl md:block md:right-10 md:w-56"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={activeFeature.image}
                  alt={activeFeature.title}
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              </div>
              <p className="bg-[#041018]/85 px-3 py-2 text-[10px] tracking-[0.2em] uppercase text-secondary">
                On the robot
              </p>
            </motion.div>
          )}
        </div>

        <div className="relative z-10 -mt-[100svh]">
          <section className="flex min-h-[100svh] items-end px-5 pb-20 pt-32 md:px-10">
            <div className="mx-auto w-full max-w-6xl">
              <div className="max-w-md">
                <p className="text-xs tracking-[0.28em] uppercase text-secondary">
                  The vehicle
                </p>
                <h1 className="font-display mt-3 text-4xl text-foreground md:text-6xl">
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
              className="flex min-h-[95svh] items-center px-5 py-20 md:px-10"
            >
              <div className="mx-auto w-full max-w-6xl">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.45 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-md bg-[color-mix(in_srgb,var(--background)_70%,transparent)] p-6 backdrop-blur-md md:p-8"
                >
                  <p className="text-xs tracking-[0.25em] uppercase text-accent">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(rovFeatures.length).padStart(2, "0")}
                  </p>
                  <h2 className="font-display mt-3 text-3xl text-foreground md:text-4xl">
                    {feature.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/70 md:text-base">
                    {feature.body}
                  </p>
                  {feature.image && (
                    <div className="relative mt-6 aspect-[16/10] overflow-hidden border border-white/10 md:hidden">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>
                  )}
                </motion.div>
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
          <h2 className="font-display mt-3 text-3xl text-foreground">
            Proven in the water
          </h2>
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
          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {[
              "/images/rov/tioman-reef.jpg",
              "/images/rov/hantu-reef.jpg",
              "/images/rov/underwater-action.jpg",
              "/images/rov/onboard-view.jpg",
              "/images/rov/poolside-rov-web.jpg",
              "/images/rov/frame-cad.png",
            ].map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden">
                <Image src={src} alt="ROV in the field" fill className="object-cover" sizes="33vw" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
