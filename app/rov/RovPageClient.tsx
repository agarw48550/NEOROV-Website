"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RovFeatureCanvas } from "@/components/3d/DynamicCanvases";
import { InlineVideo } from "@/components/media/InlineVideo";
import { CursorGlow } from "@/components/motion/CursorGlow";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { TiltMedia } from "@/components/motion/TiltMedia";
import {
  fieldRecord,
  rovFeatures,
  rovGallery,
  rovGalleryVideos,
} from "@/content/rov-features";

export function RovPageClient() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.45;
      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      sectionRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <CursorGlow>
      <div className="bg-background">
        <div className="relative">
          <div className="pointer-events-none sticky top-0 z-0 h-[100svh] supports-[height:100dvh]:h-[100dvh]">
            <RovFeatureCanvas features={rovFeatures} activeIndex={active} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#041018]/92 via-[#041018]/35 to-transparent md:via-[#041018]/20" />
            <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#041018]/70 to-transparent" />
          </div>

          <div className="relative z-10 -mt-[100svh]">
            <section className="flex min-h-[100svh] items-end px-5 pb-20 pt-32 md:px-10 supports-[height:100dvh]:min-h-[100dvh]">
              <div className="mx-auto w-full max-w-6xl">
                <div className="max-w-md">
                  <p className="text-xs tracking-[0.28em] uppercase text-secondary">
                    The vehicle
                  </p>
                  <h1 className="font-display mt-3 text-[clamp(2rem,6vw,3.75rem)] text-foreground">
                    Reef Monitoring ROV
                  </h1>
                  <p className="mt-4 text-foreground/70">
                    Scroll to inspect each system — frame, capsule, thrusters,
                    stack, sensors, tether.
                  </p>
                </div>
              </div>
            </section>

            {rovFeatures.map((feature, i) => (
              <section
                key={feature.id}
                id={`feature-${feature.id}`}
                ref={(el) => {
                  sectionRefs.current[i] = el;
                }}
                className="flex min-h-[85svh] items-center px-5 py-16 md:min-h-[95svh] md:px-10 md:py-20"
              >
                <div className="mx-auto w-full max-w-6xl">
                  <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
                    <motion.div
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: 0.45 }}
                      transition={{ duration: 0.55 }}
                      className="max-w-md"
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
                    </motion.div>
                    {feature.image && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ amount: 0.3 }}
                        className="relative hidden aspect-[4/3] overflow-hidden lg:block"
                      >
                        <TiltMedia className="h-full w-full" maxTilt={7}>
                          <div className="relative h-full w-full">
                            <Image
                              src={feature.image}
                              alt={feature.title}
                              fill
                              className="object-cover"
                              sizes="40vw"
                            />
                          </div>
                        </TiltMedia>
                      </motion.div>
                    )}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>

        <section className="relative z-10 px-5 py-24 md:px-10">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs tracking-[0.25em] uppercase text-secondary">
              Field record
            </p>
            <h2 className="font-display mt-3 text-3xl text-foreground md:text-4xl">
              Proven in the water
            </h2>
            <div className="mt-12 grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-3 lg:grid-cols-6">
              {fieldRecord.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <p className="text-2xl text-secondary md:text-3xl">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs tracking-wide text-foreground/50">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 overflow-hidden px-5 py-16 md:px-10">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs tracking-[0.25em] uppercase text-secondary">
              Underway
            </p>
            <h2 className="font-display mt-3 text-3xl text-foreground md:text-4xl">
              Field video
            </h2>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {rovGalleryVideos.map((clip, i) => (
                <motion.div
                  key={clip.src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <TiltMedia className="overflow-hidden">
                    <div className="relative aspect-video w-full bg-[#061018]">
                      <InlineVideo
                        src={clip.src}
                        poster={clip.poster}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#041018]/85 to-transparent px-3 pb-3 pt-8">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-secondary">
                          {clip.label}
                        </p>
                      </div>
                    </div>
                  </TiltMedia>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 px-5 pb-28 md:px-10">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs tracking-[0.25em] uppercase text-secondary">
              Gallery
            </p>
            <h2 className="font-display mt-3 text-3xl text-foreground md:text-4xl">
              More of the vehicle
            </h2>
            <div className="mt-12 columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3">
              {rovGallery.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: (i % 6) * 0.04 }}
                  className="mb-3 break-inside-avoid sm:mb-4"
                >
                  <TiltMedia className="overflow-hidden" maxTilt={6}>
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={src}
                        alt="ROV field photography"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </TiltMedia>
                </motion.div>
              ))}
            </div>
            <div className="mt-14">
              <MagneticLink
                href="/"
                className="border border-foreground/20 px-5 py-2.5 text-sm text-foreground/80 transition hover:border-secondary hover:text-secondary"
              >
                ← Back to home
              </MagneticLink>
            </div>
          </div>
        </section>
      </div>
    </CursorGlow>
  );
}
