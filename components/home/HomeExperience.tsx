"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ReefStoryCanvas } from "@/components/3d/DynamicCanvases";
import { reefStoryBeats } from "@/content/home";

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const play = async () => {
      try {
        v.muted = true;
        await v.play();
        setReady(true);
      } catch {
        setReady(false);
      }
    };
    play();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#041018]">
      <Image
        src="/media/hero-poster.jpg"
        alt=""
        fill
        priority
        className={`object-cover transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
        sizes="100vw"
      />
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        poster="/media/hero-poster.jpg"
        preload="auto"
      >
        <source src="/media/hero-highlight.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#041018] via-[#041018]/45 to-[#041018]/25" />
      <div className="pointer-events-none absolute inset-0 caustics opacity-40 mix-blend-screen" />
    </div>
  );
}

function StoryBeatPanel({
  beat,
  index,
  total,
}: {
  beat: (typeof reefStoryBeats)[number];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const opacity = useTransform(smooth, [0.1, 0.35, 0.65, 0.9], [0, 1, 1, 0.15]);
  const y = useTransform(smooth, [0.1, 0.4], [48, 0]);
  const scale = useTransform(smooth, [0.15, 0.45], [1.08, 1]);
  const heat = useTransform(smooth, [0.2, 0.7], [0, 1]);

  const showCanvas = beat.visual === "solution" || beat.visual === "gap";

  return (
    <section
      ref={ref}
      className="relative h-[140svh] min-h-[820px]"
      aria-label={beat.title}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="absolute inset-0">
          {showCanvas ? (
            <ReefStoryCanvas progress={(index + 0.5) / total} />
          ) : (
            <motion.div style={{ scale }} className="absolute inset-0">
              <Image
                src={beat.image}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          )}
          <div
            className={`pointer-events-none absolute inset-0 ${
              beat.visual === "bleaching"
                ? "bg-gradient-to-r from-[#1a0f0c]/90 via-[#7a3b22]/35 to-transparent"
                : beat.visual === "crisis"
                  ? "bg-gradient-to-r from-[#041018]/92 via-[#041018]/50 to-transparent"
                  : "bg-gradient-to-r from-[#041018]/90 via-[#041018]/40 to-transparent"
            }`}
          />
          {beat.visual === "bleaching" && (
            <motion.div
              style={{ opacity: heat }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(255,120,60,0.35),transparent_55%)] mix-blend-screen"
            />
          )}
          {beat.visual === "crisis" && (
            <div className="pointer-events-none absolute inset-0 opacity-50 mist-drift" />
          )}
        </div>

        <motion.div
          style={{ opacity, y }}
          className="relative z-10 w-full px-5 md:px-10"
        >
          <div className="mx-auto grid w-full max-w-6xl items-end gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <article className="max-w-xl">
              <p className="text-xs tracking-[0.28em] uppercase text-secondary">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} ·{" "}
                {beat.eyebrow}
              </p>
              <h2 className="font-display mt-4 text-3xl leading-[1.1] tracking-tight text-foreground md:text-5xl">
                {beat.title}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-foreground/75 md:text-base">
                {beat.body}
              </p>
            </article>
            <div className="hidden md:block">
              <div className="ml-auto h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full origin-left bg-secondary"
                  style={{ scaleX: smooth }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function HomeExperience() {
  return (
    <>
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <HeroVideo />
        <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-16 pt-28 md:px-10 md:pb-20">
          <div className="mx-auto w-full max-w-6xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mb-4 text-xs tracking-[0.28em] uppercase text-secondary"
            >
              UWCSEA East · NParks NP/RP 25-078
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.25 }}
              className="font-display max-w-4xl text-5xl leading-[0.95] tracking-tight text-foreground md:text-7xl lg:text-8xl"
            >
              Reef Monitoring ROV
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.4 }}
              className="mt-5 max-w-xl text-base text-foreground/75 md:text-lg"
            >
              A custom pilot-operated ROV for shallow-water coastal monitoring.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href="/rov"
                className="bg-secondary px-6 py-3 text-sm text-[#041018] transition hover:brightness-110"
              >
                Explore the ROV
              </Link>
              <Link
                href="/team"
                className="border border-foreground/30 px-6 py-3 text-sm text-foreground/90 transition hover:border-secondary hover:text-secondary"
              >
                Meet the team
              </Link>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center"
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-foreground/55">
            Scroll the story
          </p>
          <div className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-secondary to-transparent scroll-cue" />
        </motion.div>
      </section>

      {reefStoryBeats.map((beat, i) => (
        <StoryBeatPanel
          key={beat.id}
          beat={beat}
          index={i}
          total={reefStoryBeats.length}
        />
      ))}

      <section className="relative overflow-hidden px-5 py-24 md:px-10 md:py-32 depth-gradient">
        <div className="pointer-events-none absolute inset-0 caustics opacity-40" />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs tracking-[0.25em] uppercase text-secondary">
            Continue
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl text-foreground md:text-5xl">
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
