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
  /** When true, gently bob in place */
  bob?: boolean;
  /** Pointer NDC coords (-1..1) for look-at */
  pointer?: { x: number; y: number };
  lookStrength?: number;
};

const PVC = new Color("#eef3f7");
const MOUNT = new Color("#1f6b4a");
const ACCENT = new Color("#0aa4c2");
const DARK = new Color("#1a2333");

function paintRovScene(root: Group) {
  const box = new Box3().setFromObject(root);
  const size = new Vector3();
  const center = new Vector3();
  box.getSize(size);
  box.getCenter(center);

  root.traverse((obj) => {
    const mesh = obj as Mesh;
    if (!mesh.isMesh) return;

    const name = (mesh.name || "").toLowerCase();
    const geoBox = new Box3().setFromObject(mesh);
    const geoSize = new Vector3();
    const geoCenter = new Vector3();
    geoBox.getSize(geoSize);
    geoBox.getCenter(geoCenter);

    const relY = (geoCenter.y - center.y) / Math.max(size.y, 1);
    const relZ = (geoCenter.z - center.z) / Math.max(size.z, 1);
    const aspect =
      Math.max(geoSize.x, geoSize.y, geoSize.z) /
      Math.max(0.001, Math.min(geoSize.x, geoSize.y, geoSize.z));

    let material: MeshStandardMaterial | MeshPhysicalMaterial;

    if (
      name.includes("thruster") ||
      name.includes("t200") ||
      name.includes("motor") ||
      (aspect < 2.2 && geoSize.x / size.x < 0.35 && Math.abs(relY) > 0.15)
    ) {
      material = new MeshStandardMaterial({
        color: DARK,
        metalness: 0.45,
        roughness: 0.4,
      });
    } else if (
      name.includes("mount") ||
      name.includes("green") ||
      name.includes("strap") ||
      name.includes("ring") ||
      (aspect < 3.5 && Math.abs(relZ) < 0.25 && Math.abs(relY) < 0.2)
    ) {
      material = new MeshStandardMaterial({
        color: MOUNT,
        metalness: 0.15,
        roughness: 0.45,
        emissive: MOUNT,
        emissiveIntensity: 0.08,
      });
    } else if (
      name.includes("capsule") ||
      name.includes("tube") ||
      name.includes("acrylic") ||
      name.includes("cylinder")
    ) {
      material = new MeshPhysicalMaterial({
        color: "#c8e7f5",
        metalness: 0.05,
        roughness: 0.12,
        transmission: 0.55,
        thickness: 0.4,
        transparent: true,
        opacity: 0.85,
      });
    } else if (name.includes("tether") || name.includes("cable")) {
      material = new MeshStandardMaterial({
        color: ACCENT,
        metalness: 0.2,
        roughness: 0.35,
      });
    } else {
      // Default: white PVC frame with a cool underwater tint
      material = new MeshPhysicalMaterial({
        color: PVC,
        metalness: 0.08,
        roughness: 0.32,
        clearcoat: 0.55,
        clearcoatRoughness: 0.28,
        sheen: 0.2,
        sheenColor: ACCENT,
      });
    }

    mesh.material = material;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
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
    paintRovScene(next);
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
      {/* Green capsule mounts — visual color when GLB lacks materials */}
      <mesh position={[0, 0.05, 0.15]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.22, 0.035, 16, 48]} />
        <meshStandardMaterial
          color="#1f6b4a"
          metalness={0.2}
          roughness={0.4}
          emissive="#1f6b4a"
          emissiveIntensity={0.12}
        />
      </mesh>
      <mesh position={[0, 0.05, -0.2]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.22, 0.035, 16, 48]} />
        <meshStandardMaterial
          color="#1f6b4a"
          metalness={0.2}
          roughness={0.4}
          emissive="#1f6b4a"
          emissiveIntensity={0.12}
        />
      </mesh>
      {/* Acrylic capsule hint */}
      <mesh position={[0, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, 0.55, 32]} />
        <meshPhysicalMaterial
          color="#b9dff2"
          metalness={0}
          roughness={0.08}
          transmission={0.65}
          thickness={0.35}
          transparent
          opacity={0.55}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/neorov.glb");
