"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import {
  Box3,
  Color,
  Group as ThreeGroup,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Vector3,
} from "three";

type RovModelProps = {
  url?: string;
  scale?: number;
  position?: [number, number, number];
  bob?: boolean;
  /** When false, model holds a fixed upright pose (no pointer / idle look). */
  interactive?: boolean;
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
      emissiveIntensity: 0.35,
      metalness: 0.1,
      roughness: 0.45,
      name,
    });
  }
  if (n.includes("blue") || n.includes("opaque")) {
    return new MeshStandardMaterial({
      color: new Color("#2f7dff"),
      emissive: new Color("#16448c"),
      emissiveIntensity: 0.18,
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
      const name =
        (mat && "name" in mat && mat.name) || mesh.name || `part-${painted}`;
      painted += 1;
      return colorForName(String(name));
    });

    mesh.material = next.length === 1 ? next[0] : next;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });
}

/**
 * GLB root is baked at +90° X (capsule stands vertical).
 * Correct with -90° X, re-center, and leave a stable upright pose for cameras.
 */
function prepareOriented(scene: Group) {
  const model = scene.clone(true);
  paintRov(model);

  const oriented = new ThreeGroup();
  // Undo baked +90° X so the acrylic tube lies horizontal along Z.
  oriented.rotation.set(-Math.PI / 2, 0, 0);
  oriented.add(model);
  oriented.updateMatrixWorld(true);

  const box = new Box3().setFromObject(oriented);
  const center = new Vector3();
  box.getCenter(center);
  oriented.position.sub(center);
  oriented.updateMatrixWorld(true);

  const size = new Vector3();
  new Box3().setFromObject(oriented).getSize(size);
  const autoScale = 1.8 / Math.max(size.x, size.y, size.z, 1);

  return { oriented, autoScale };
}

export function RovModel({
  url = "/models/neorov-colored.glb",
  scale: scaleProp,
  position = [0, 0, 0],
  bob = true,
  interactive = true,
  pointer,
  lookStrength = 0.35,
}: RovModelProps) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(url, true);
  const { oriented, autoScale } = useMemo(
    () => prepareOriented(scene as Group),
    [scene],
  );

  const scale = scaleProp ?? autoScale;
  const baseY = position[1];

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;

    if (bob) {
      g.position.y = baseY + Math.sin(t * 0.9) * 0.04;
    } else {
      g.position.y = baseY;
    }

    if (!interactive) {
      g.rotation.x += (0 - g.rotation.x) * 0.1;
      g.rotation.y += (0 - g.rotation.y) * 0.1;
      return;
    }

    const targetX = pointer ? pointer.y * lookStrength : Math.sin(t * 0.25) * 0.12;
    const targetY = pointer ? pointer.x * lookStrength : Math.sin(t * 0.2) * 0.16;
    g.rotation.x += (targetX - g.rotation.x) * 0.08;
    g.rotation.y += (targetY - g.rotation.y) * 0.08;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      <primitive object={oriented} />
    </group>
  );
}

useGLTF.preload("/models/neorov-colored.glb");
