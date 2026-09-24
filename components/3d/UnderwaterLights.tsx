"use client";

export function UnderwaterLights() {
  return (
    <>
      <color attach="background" args={["#0a1424"]} />
      <ambientLight intensity={0.45} color="#7ec8d8" />
      <directionalLight
        position={[4, 8, 2]}
        intensity={1.35}
        color="#c8f0ff"
        castShadow={false}
      />
      <directionalLight position={[-3, 2, -4]} intensity={0.4} color="#0d968b" />
      <pointLight position={[0, 2, 3]} intensity={0.6} color="#07b6d5" distance={12} />
      <fog attach="fog" args={["#0a1424", 6, 18]} />
    </>
  );
}
