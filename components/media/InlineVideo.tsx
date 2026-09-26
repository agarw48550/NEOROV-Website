"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  /** When true, only plays while in viewport */
  playInView?: boolean;
};

/** Muted looping video that autoplays when visible — for section backgrounds & galleries. */
export function InlineVideo({
  src,
  poster,
  className = "",
  playInView = true,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const tryPlay = async () => {
      try {
        v.muted = true;
        await v.play();
        setReady(true);
      } catch {
        setReady(false);
      }
    };

    if (!playInView) {
      tryPlay();
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryPlay();
        } else {
          v.pause();
        }
      },
      { threshold: 0.25, rootMargin: "10% 0px" },
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, [playInView, src]);

  return (
    <video
      ref={ref}
      className={`${className} ${ready ? "opacity-100" : "opacity-90"} transition-opacity duration-700`}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
