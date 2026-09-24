"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import {
  Box3,
  Mesh,
  MeshStandardMaterial,
  Vector3,
  type Object3D,
} from "three";

type ReefModelProps = {
  url?: string;
  position?: [number, number, number];
  scale?: number;
  opacity?: number;
};

export function ReefModel({
  url = "/models/reef.glb",
  position = [0, -1.2, -2],
  scale: scaleProp,
  opacity = 1,
}: ReefModelProps) {
  const { scene } = useGLTF(url, true);
  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((obj: Object3D) => {
      if (obj instanceof Mesh && obj.material) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => {
          if (m instanceof MeshStandardMaterial) {
            m.transparent = opacity < 1;
            m.opacity = opacity;
            m.needsUpdate = true;
          }
        });
      }
    });
    return c;
  }, [scene, opacity]);

  const autoScale = useMemo(() => {
    const box = new Box3().setFromObject(cloned);
    const size = new Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return 4.5 / maxDim;
  }, [cloned]);

  return (
    <group position={position} scale={scaleProp ?? autoScale}>
      <primitive object={cloned} />
    </group>
  );
}

useGLTF.preload("/models/reef.glb");
