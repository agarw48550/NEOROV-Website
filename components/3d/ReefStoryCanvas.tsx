"use client";

import { Environment } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";
import { MathUtils, Vector3 } from "three";
import { ReefModel } from "./ReefModel";
import { RovModel } from "./RovModel";
import { UnderwaterLights } from "./UnderwaterLights";

function ScrollDiveController({ progress }: { progress: number }) {
  const { camera } = useThree();
  const rov = useRef<Group>(null);

  const start = useMemo(() => new Vector3(0, 0.6, 4.5), []);
  const mid = useMemo(() => new Vector3(0.4, 0.2, 3.2), []);
  const end = useMemo(() => new Vector3(0.8, -0.3, 2.4), []);

  useFrame(() => {
    const p = MathUtils.clamp(progress, 0, 1);
    const cam = p < 0.45
      ? start.clone().lerp(mid, p / 0.45)
      : mid.clone().lerp(end, (p - 0.45) / 0.55);
    camera.position.lerp(cam, 0.08);
    camera.lookAt(0, -0.2 - p * 0.4, -1);

    if (rov.current) {
      rov.current.position.x = MathUtils.lerp(0, 0.55, p);
      rov.current.position.y = MathUtils.lerp(0.35, -0.15, p);
      rov.current.position.z = MathUtils.lerp(0.5, -0.4, p);
      rov.current.rotation.y = MathUtils.lerp(0.2, -0.35, p);
    }
  });

  return (
    <group ref={rov}>
      <RovModel bob={false} scale={undefined} position={[0, 0, 0]} />
    </group>
  );
}

export function ReefStoryCanvas({ progress }: { progress: number }) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  const reefOpacity = MathUtils.clamp((progress - 0.15) / 0.35, 0, 1);

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0.6, 4.5], fov: 45 }}
        dpr={reduced ? [1, 1] : [1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <UnderwaterLights />
          <Environment preset="night" environmentIntensity={0.25} />
          <ReefModel opacity={Math.max(0.15, reefOpacity)} />
          <ScrollDiveController progress={reduced ? 0.6 : progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
