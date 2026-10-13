"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  /** When true, only plays while in viewport */
  playInView?: boolean;
};

/** Muted looping video that autoplays when visible for section backgrounds and galleries. */
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
    <div className={`relative ${className}`}>
      {!ready && poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
      ) : null}
      {!ready && !poster ? (
        <div
          className="absolute inset-0 animate-pulse bg-[color-mix(in_srgb,var(--primary)_40%,var(--background))]"
          aria-hidden
        />
      ) : null}
      <video
        ref={ref}
        className={`relative h-full w-full object-cover ${ready ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-hidden
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
