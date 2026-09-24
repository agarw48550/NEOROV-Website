"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import { Box3, Vector3 } from "three";

type RovModelProps = {
  url?: string;
  scale?: number;
  position?: [number, number, number];
  /** When true, gently bob in place */
  bob?: boolean;
  /** Pointer NDC coords (-1..1) for look-at */
  pointer?: { x: number; y: number };
  lookStrength?: number;
};

export function RovModel({
  url = "/models/neorov.glb",
  scale: scaleProp,
  position = [0, 0, 0],
  bob = true,
  pointer,
  lookStrength = 0.35,
}: RovModelProps) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(url, true);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  const autoScale = useMemo(() => {
    const box = new Box3().setFromObject(cloned);
    const size = new Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return 1.8 / maxDim;
  }, [cloned]);

  const scale = scaleProp ?? autoScale;

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;

    if (bob) {
      g.position.y = position[1] + Math.sin(t * 0.9) * 0.06;
    }

    const targetX = pointer ? pointer.y * lookStrength : Math.sin(t * 0.25) * 0.15;
    const targetY = pointer ? pointer.x * lookStrength : Math.sin(t * 0.2) * 0.2;
    g.rotation.x += (targetX - g.rotation.x) * 0.08;
    g.rotation.y += (targetY - g.rotation.y) * 0.08;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      <primitive object={cloned} />
    </group>
  );
}

useGLTF.preload("/models/neorov.glb");
