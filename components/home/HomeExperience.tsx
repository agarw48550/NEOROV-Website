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
import { useEffect, useRef, useState } from "react";
import { ReefStoryCanvas } from "@/components/3d/DynamicCanvases";
import { InlineVideo } from "@/components/media/InlineVideo";
import { CursorGlow, usePointerParallax } from "@/components/motion/CursorGlow";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltMedia } from "@/components/motion/TiltMedia";
import {
  capabilityPillars,
  dualPaths,
  exhibitionPhotos,
  fieldVideos,
  filmstripPhotos,
  mosaicPhotos,
  problemStatement,
  reefStoryBeats,
} from "@/content/home";

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const { x, y } = usePointerParallax(12);

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
      <motion.div
        style={{ x, y, scale: 1.08 }}
        className="absolute inset-[-4%] will-change-transform"
      >
        <Image
          src="/media/hero-poster.jpg"
          alt=""
          fill
          priority
          className={`object-cover object-center transition-opacity duration-700 ${
            ready ? "opacity-0" : "opacity-100"
          }`}
          sizes="100vw"
        />
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover object-[center_40%] transition-opacity duration-700 sm:object-center ${
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
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#041018] via-[#041018]/55 to-[#041018]/25" />
      <div className="pointer-events-none absolute inset-0 caustics opacity-15" />
    </div>
  );
}

function PhotoFilmstrip() {
  const x = useMotionValue(0);

  useEffect(() => {
    const controls = animate(x, -1800, {
      duration: 56,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => controls.stop();
  }, [x]);

  const photos = [...filmstripPhotos, ...filmstripPhotos];

  return (
    <section className="relative overflow-hidden border-y border-white/5 py-10 md:py-14">
      <div className="page-container mb-8">
        <SectionHeader eyebrow="In the water" title="From the Pool to the Reef" />
      </div>
      <div className="relative">
        <motion.div style={{ x }} className="flex w-max gap-3 px-5 md:gap-4 md:px-10">
          {photos.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative h-40 w-56 shrink-0 overflow-hidden sm:h-44 sm:w-64 md:h-56 md:w-80"
            >
              <Image
                src={src}
                alt="ROV in the field"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 224px, 320px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FieldVideoStrip() {
  return (
    <section className="relative px-5 py-20 md:px-10 md:py-28">
      <div className="pointer-events-none absolute inset-0 depth-gradient opacity-70" />
      <div className="relative mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.28em] uppercase text-secondary"
        >
          Field footage
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display mt-3 text-3xl text-foreground md:text-4xl"
        >
          Missions in Motion
        </motion.h2>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {fieldVideos.map((clip, i) => (
            <motion.div
              key={clip.src}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
            >
              <TiltMedia className="overflow-hidden">
                <div className="relative aspect-video w-full bg-[#061018]">
                  <InlineVideo
                    src={clip.src}
                    poster={clip.poster}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#041018]/90 to-transparent px-3 pb-3 pt-10">
                    <p className="text-[10px] tracking-[0.22em] uppercase text-secondary">
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
  );
}

function PhotoMosaic() {
  return (
    <section className="relative px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.28em] uppercase text-secondary"
        >
          Workshop · reef · telemetry
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display mt-3 max-w-xl text-3xl text-foreground md:text-4xl"
        >
          Built, Tested & Logged
        </motion.h2>
        <div className="mt-10 grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4">
          {mosaicPhotos.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 5) * 0.05 }}
                className="relative aspect-[4/3] overflow-hidden"
              >
                <TiltMedia className="h-full w-full" maxTilt={6}>
                  <div className="relative h-full w-full">
                    <Image
                      src={src}
                      alt="ROV field and workshop photography"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                </TiltMedia>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExhibitionStrip() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 py-16 md:py-24">
      <div className="absolute inset-0">
        <Image
          src="/images/exhibition/exhibit-crowd-01.jpg"
          alt=""
          fill
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#041018]/85" />
      </div>
      <div className="relative mx-auto max-w-6xl px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.28em] uppercase text-secondary"
        >
          On display
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display mt-3 text-3xl text-foreground md:text-4xl"
        >
          Exhibition Moments
        </motion.h2>
        <div className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {exhibitionPhotos.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative aspect-[4/3] w-[72vw] max-w-sm shrink-0 snap-center overflow-hidden sm:w-72 md:w-80"
            >
              <Image
                src={src}
                alt="Exhibition of the Reef Monitoring ROV"
                fill
                className="object-cover"
                sizes="320px"
              />
            </motion.div>
          ))}
        </div>
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
      className="relative h-[120svh] min-h-[560px] sm:min-h-[640px] md:h-[130svh] md:min-h-[720px]"
      aria-label={beat.title}
    >
      <div className="sticky top-0 flex h-[100svh] max-h-[100dvh] items-center overflow-hidden">
        <div className="absolute inset-0">
          {showCanvas && inView ? (
            <ReefStoryCanvas progress={0.55 + index * 0.2} />
          ) : (
            <motion.div style={{ scale }} className="absolute inset-0">
              <Image
                src={beat.image}
                alt=""
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
            </motion.div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#041018]/95 via-[#041018]/55 to-transparent md:via-[#041018]/45" />
          {beat.visual === "crisis" && (
            <div className="pointer-events-none absolute inset-0 opacity-40 mist-drift" />
          )}
        </div>

        <motion.div
          style={{ opacity, y }}
          className="relative z-10 w-full px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:px-10"
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
    <CursorGlow>
      <section className="relative h-[100svh] min-h-[520px] overflow-hidden supports-[height:100dvh]:h-[100dvh] sm:min-h-[640px]">
        <HeroVideo />
        <div className="relative z-10 flex h-full flex-col justify-end pb-[max(4rem,env(safe-area-inset-bottom))] pt-28 md:pb-20">
          <div className="page-container w-full">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-display-xl max-w-4xl text-foreground"
            >
              Reef Monitoring ROV
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-body mt-4 max-w-lg text-foreground/75 md:text-lg md:leading-relaxed"
            >
              A shore-deployable research vehicle for coastal reef monitoring in
              Singapore and the region.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <ButtonLink href="/rov" variant="primary">
                Explore the ROV
              </ButtonLink>
              <ButtonLink href="/team" variant="secondary">
                Meet the team
              </ButtonLink>
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

      <section className="relative px-5 py-20 md:px-10 md:py-32">
        <div className="pointer-events-none absolute inset-0 depth-gradient opacity-80" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
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
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative aspect-[4/5] overflow-hidden sm:aspect-video lg:aspect-[4/5]"
            >
              <Image
                src="/images/field/hantu-02.jpg"
                alt="Coastal reef habitat"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#041018]/50 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-28">
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
              <ButtonLink href={path.href} variant="ghost" className="mt-6">
                {path.cta} →
              </ButtonLink>
            </motion.div>
          ))}
        </div>
      </section>

      <PhotoFilmstrip />
      <FieldVideoStrip />
      <PhotoMosaic />

      <section className="px-5 py-20 md:px-10 md:py-32">
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

      <ExhibitionStrip />

      <section className="relative overflow-hidden px-5 py-24 md:px-10 md:py-32">
        <div className="pointer-events-none absolute inset-0 depth-gradient" />
        <div className="absolute inset-0 opacity-25">
          <Image
            src="/images/field/tioman-01.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
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
            From the Workshop to the Reef
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <ButtonLink href="/rov" variant="primary">
              Vehicle features
            </ButtonLink>
            <ButtonLink href="/blog/seeing-the-unseen" variant="secondary">
              Read Seeing the Unseen
            </ButtonLink>
          </motion.div>
        </div>
      </section>
    </CursorGlow>
  );
}
