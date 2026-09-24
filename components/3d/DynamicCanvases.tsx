"use client";

import dynamic from "next/dynamic";

export const HeroRovCanvas = dynamic(
  () => import("./HeroRovCanvas").then((m) => m.HeroRovCanvas),
  { ssr: false, loading: () => <ModelLoader /> }
);

export const ReefStoryCanvas = dynamic(
  () => import("./ReefStoryCanvas").then((m) => m.ReefStoryCanvas),
  { ssr: false, loading: () => <ModelLoader /> }
);

export const RovFeatureCanvas = dynamic(
  () => import("./RovFeatureCanvas").then((m) => m.RovFeatureCanvas),
  { ssr: false, loading: () => <ModelLoader /> }
);

function ModelLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center depth-gradient">
      <p className="text-xs tracking-[0.25em] uppercase text-secondary/80 animate-pulse">
        Loading vehicle
      </p>
    </div>
  );
}
