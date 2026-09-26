"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh, MeshStandardMaterial } from "three";
import { Box3, Color, MeshPhysicalMaterial, Vector3 } from "three";

type RovModelProps = {
  url?: string;
  scale?: number;
  position?: [number, number, number];
  bob?: boolean;
  pointer?: { x: number; y: number };
  lookStrength?: number;
};

function enhanceMaterials(root: Group) {
  root.traverse((obj) => {
    const mesh = obj as Mesh;
    if (!mesh.isMesh || !mesh.material) return;

    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : [mesh.material];

    materials.forEach((mat, index) => {
      const std = mat as MeshStandardMaterial;
      const name = (std.name || mesh.name || "").toLowerCase();

      if (name.includes("acrylic") || name.includes("clear")) {
        const physical = new MeshPhysicalMaterial({
          color: new Color("#9fd8f0"),
          metalness: 0.02,
          roughness: 0.05,
          transmission: 0.78,
          thickness: 0.5,
          transparent: true,
          opacity: 0.7,
          name: std.name,
        });
        if (Array.isArray(mesh.material)) mesh.material[index] = physical;
        else mesh.material = physical;
        return;
      }

      if (name.includes("fr4")) {
        std.color = new Color("#1a8f4e");
        std.emissive = new Color("#0b5a30");
        std.emissiveIntensity = 0.35;
        std.roughness = 0.5;
        std.metalness = 0.08;
        std.needsUpdate = true;
        return;
      }

      if (name.includes("abs") || name.includes("white")) {
        std.color = new Color("#f5f8fb");
        std.roughness = 0.28;
        std.metalness = 0.04;
        std.needsUpdate = true;
        return;
      }

      if (name.includes("blue") || name.includes("opaque(202")) {
        std.color = new Color("#2f7dff");
        std.emissive = new Color("#123a80");
        std.emissiveIntensity = 0.18;
        std.metalness = 0.55;
        std.roughness = 0.25;
        std.needsUpdate = true;
        return;
      }

      if (name.includes("aluminum") || name.includes("steel")) {
        std.color = new Color("#9aa7b8");
        std.metalness = 0.85;
        std.roughness = 0.22;
        std.needsUpdate = true;
      }

      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  });
}

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
  const cloned = useMemo(() => {
    const next = scene.clone(true);
    enhanceMaterials(next);
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
    <group ref={group} position={position} scale={scale} rotation={[0, Math.PI * 0.15, 0]}>
      <primitive object={cloned} />
    </group>
  );
}

useGLTF.preload("/models/neorov.glb");
