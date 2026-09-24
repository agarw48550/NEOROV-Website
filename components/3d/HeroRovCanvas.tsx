"use client";

import { Environment, Float, ContactShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { RovModel } from "./RovModel";
import { UnderwaterLights } from "./UnderwaterLights";

function PointerTracker({
  onMove,
}: {
  onMove: (p: { x: number; y: number }) => void;
}) {
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      onMove({ x, y });
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, [onMove]);
  return null;
}

export function HeroRovCanvas() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  return (
    <div className="absolute inset-0">
      <PointerTracker onMove={setPointer} />
      <Canvas
        camera={{ position: [0, 0.4, 4.2], fov: 42 }}
        dpr={reduced ? [1, 1] : [1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <UnderwaterLights />
          <Environment preset="city" environmentIntensity={0.35} />
          {reduced ? (
            <RovModel pointer={undefined} bob={false} />
          ) : (
            <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
              <RovModel pointer={pointer} />
            </Float>
          )}
          <ContactShadows
            position={[0, -1.35, 0]}
            opacity={0.35}
            scale={8}
            blur={2.5}
            far={4}
            color="#07101c"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
