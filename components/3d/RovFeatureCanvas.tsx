"use client";

import { Environment, ContactShadows } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { MathUtils, Vector3 } from "three";
import type { RovFeature } from "@/content/rov-features";
import { RovModel } from "./RovModel";
import { UnderwaterLights } from "./UnderwaterLights";

function FeatureCamera({
  features,
  activeIndex,
}: {
  features: RovFeature[];
  activeIndex: number;
}) {
  const { camera } = useThree();
  const targetPos = useRef(new Vector3(...features[0].camera));
  const lookAt = useRef(new Vector3(...features[0].lookAt));

  useEffect(() => {
    const f = features[MathUtils.clamp(activeIndex, 0, features.length - 1)];
    targetPos.current.set(...f.camera);
    lookAt.current.set(...f.lookAt);
  }, [activeIndex, features]);

  useFrame(() => {
    camera.position.lerp(targetPos.current, 0.09);
    camera.lookAt(lookAt.current);
  });

  return null;
}

export function RovFeatureCanvas({
  features,
  activeIndex,
}: {
  features: RovFeature[];
  activeIndex: number;
}) {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: features[0].camera, fov: 40 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <UnderwaterLights />
          <Environment preset="warehouse" environmentIntensity={0.55} />
          <FeatureCamera features={features} activeIndex={activeIndex} />
          <RovModel interactive={false} bob lookStrength={0} />
          <ContactShadows
            position={[0, -1.05, 0]}
            opacity={0.28}
            scale={7}
            blur={2.4}
            color="#07101c"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
