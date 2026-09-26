"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import {
  Box3,
  Color,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Vector3,
} from "three";

type RovModelProps = {
  url?: string;
  scale?: number;
  position?: [number, number, number];
  bob?: boolean;
  pointer?: { x: number; y: number };
  lookStrength?: number;
};

function colorForName(name: string): MeshStandardMaterial | MeshPhysicalMaterial {
  const n = name.toLowerCase();

  if (n.includes("acrylic") || n.includes("clear")) {
    return new MeshPhysicalMaterial({
      color: new Color("#8fd0ea"),
      metalness: 0,
      roughness: 0.05,
      transmission: 0.8,
      thickness: 0.55,
      transparent: true,
      opacity: 0.65,
      name,
    });
  }
  if (n.includes("fr4")) {
    return new MeshStandardMaterial({
      color: new Color("#14964f"),
      emissive: new Color("#0a5c30"),
      emissiveIntensity: 0.45,
      metalness: 0.1,
      roughness: 0.45,
      name,
    });
  }
  if (n.includes("blue") || n.includes("opaque")) {
    return new MeshStandardMaterial({
      color: new Color("#2f7dff"),
      emissive: new Color("#16448c"),
      emissiveIntensity: 0.25,
      metalness: 0.55,
      roughness: 0.28,
      name,
    });
  }
  if (n.includes("aluminum") || n.includes("steel")) {
    return new MeshStandardMaterial({
      color: new Color("#8e9aab"),
      metalness: 0.9,
      roughness: 0.2,
      name,
    });
  }
  // ABS / default frame — keep light but not blown-out
  return new MeshStandardMaterial({
    color: new Color("#e8eef5"),
    metalness: 0.08,
    roughness: 0.32,
    name,
  });
}

function paintRov(root: Group) {
  let painted = 0;
  root.traverse((obj) => {
    const mesh = obj as Mesh;
    if (!mesh.isMesh) return;

    const sourceMats = Array.isArray(mesh.material)
      ? mesh.material
      : [mesh.material];

    const next = sourceMats.map((mat) => {
      const name = (mat && "name" in mat && mat.name) || mesh.name || `part-${painted}`;
      painted += 1;
      return colorForName(String(name));
    });

    mesh.material = next.length === 1 ? next[0] : next;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });
}

export function RovModel({
  url = "/models/neorov-colored.glb",
  scale: scaleProp,
  position = [0, 0, 0],
  bob = true,
  pointer,
  lookStrength = 0.35,
}: RovModelProps) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(url, true);
  const cloned = useMemo(() => {
    const next = scene.clone(true);
    paintRov(next);
    return next;
  }, [scene]);

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

useGLTF.preload("/models/neorov-colored.glb");
