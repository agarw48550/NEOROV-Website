"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  animate,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ReefStoryCanvas } from "@/components/3d/DynamicCanvases";
import {
  capabilityPillars,
  dualPaths,
  filmstripPhotos,
  problemStatement,
  reefStoryBeats,
} from "@/content/home";

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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#041018] via-[#041018]/50 to-[#041018]/20" />
      <div className="pointer-events-none absolute inset-0 caustics opacity-30 mix-blend-screen" />
    </div>
  );
}

function PhotoFilmstrip() {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controls = animate(x, -1200, {
      duration: 48,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => controls.stop();
  }, [x]);

  const photos = [...filmstripPhotos, ...filmstripPhotos];

  return (
    <section className="relative overflow-hidden border-y border-white/5 py-10 md:py-14">
      <div className="mb-8 px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.28em] uppercase text-secondary"
        >
          In the water
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display mt-3 text-3xl text-foreground md:text-4xl"
        >
          From the pool to the reef
        </motion.h2>
      </div>
      <div ref={trackRef} className="relative">
        <motion.div style={{ x }} className="flex w-max gap-3 px-5 md:gap-4 md:px-10">
          {photos.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative h-44 w-64 shrink-0 overflow-hidden md:h-56 md:w-80"
            >
              <Image
                src={src}
                alt="ROV in the field"
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
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
  const opacity = useTransform(smooth, [0.12, 0.35, 0.65, 0.9], [0, 1, 1, 0.2]);
  const y = useTransform(smooth, [0.12, 0.4], [56, 0]);
  const scale = useTransform(smooth, [0.15, 0.45], [1.1, 1]);

  const showCanvas = beat.visual === "solution";
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !showCanvas) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "20% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [showCanvas]);

  return (
    <section
      ref={ref}
      className="relative h-[130svh] min-h-[720px]"
      aria-label={beat.title}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="absolute inset-0">
          {showCanvas && inView ? (
            <ReefStoryCanvas progress={0.55 + index * 0.2} />
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
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#041018]/92 via-[#041018]/45 to-transparent" />
          {beat.visual === "crisis" && (
            <div className="pointer-events-none absolute inset-0 opacity-40 mist-drift" />
          )}
        </div>

        <motion.div
          style={{ opacity, y }}
          className="relative z-10 w-full px-5 md:px-10"
        >
          <div className="mx-auto max-w-6xl">
            <article className="max-w-xl">
              <p className="text-xs tracking-[0.28em] uppercase text-secondary">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")} · {beat.eyebrow}
              </p>
              <h2 className="font-display mt-4 text-3xl leading-[1.1] tracking-tight text-foreground md:text-5xl">
                {beat.title}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-foreground/75 md:text-base">
                {beat.body}
              </p>
            </article>
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
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="font-display max-w-4xl text-5xl leading-[0.95] tracking-tight text-foreground md:text-7xl lg:text-8xl"
            >
              Reef Monitoring ROV
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.35 }}
              className="mt-5 max-w-lg text-base text-foreground/75 md:text-lg"
            >
              A shore-deployable research vehicle for coastal reef monitoring.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
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
                className="border border-foreground/25 px-6 py-3 text-sm text-foreground/90 transition hover:border-secondary hover:text-secondary"
              >
                Meet the four
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
          <p className="text-[10px] tracking-[0.35em] uppercase text-foreground/50">
            Scroll
          </p>
          <div className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-secondary to-transparent scroll-cue" />
        </motion.div>
      </section>

      <section className="relative px-5 py-24 md:px-10 md:py-32">
        <div className="pointer-events-none absolute inset-0 depth-gradient opacity-80" />
        <div className="relative mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-xs tracking-[0.28em] uppercase text-secondary"
          >
            {problemStatement.eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65 }}
            className="font-display mt-4 max-w-3xl text-3xl leading-tight text-foreground md:text-5xl"
          >
            {problemStatement.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg"
          >
            {problemStatement.body}
          </motion.p>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-16">
          {dualPaths.map((path, i) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border-t border-white/15 pt-8"
            >
              <p className="text-xs tracking-[0.28em] uppercase text-secondary">
                {path.eyebrow}
              </p>
              <h3 className="font-display mt-3 text-3xl text-foreground md:text-4xl">
                {path.title}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/65 md:text-base">
                {path.body}
              </p>
              <Link
                href={path.href}
                className="mt-6 inline-block text-sm text-secondary transition hover:brightness-125"
              >
                {path.cta} →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <PhotoFilmstrip />

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.28em] uppercase text-secondary"
          >
            What it does
          </motion.p>
          <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
            {capabilityPillars.map((pillar, i) => (
              <motion.div
                key={pillar.word}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.65, delay: i * 0.12 }}
              >
                <h3 className="font-display text-4xl tracking-tight text-foreground md:text-5xl">
                  {pillar.word}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-foreground/65 md:text-base">
                  {pillar.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {reefStoryBeats.map((beat, i) => (
        <StoryBeatPanel
          key={beat.id}
          beat={beat}
          index={i}
          total={reefStoryBeats.length}
        />
      ))}

      <section className="relative overflow-hidden px-5 py-24 md:px-10 md:py-32">
        <div className="pointer-events-none absolute inset-0 depth-gradient" />
        <div className="relative mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.25em] uppercase text-secondary"
          >
            Continue
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display mt-3 max-w-2xl text-3xl text-foreground md:text-5xl"
          >
            From the workshop to the reef.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/rov"
              className="bg-secondary px-6 py-3 text-sm text-[#041018] transition hover:brightness-110"
            >
              Vehicle features
            </Link>
            <Link
              href="/blog/seeing-the-unseen"
              className="border border-foreground/25 px-6 py-3 text-sm text-foreground/90 transition hover:border-secondary"
            >
              Read Seeing the Unseen
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
