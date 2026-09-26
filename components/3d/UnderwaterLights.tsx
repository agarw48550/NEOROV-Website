"use client";

export function UnderwaterLights() {
  return (
    <>
      <color attach="background" args={["#0a1424"]} />
      <ambientLight intensity={0.7} color="#a8e0ef" />
      <directionalLight
        position={[4, 8, 2]}
        intensity={2.1}
        color="#ffffff"
        castShadow={false}
      />
      <directionalLight position={[-3, 2, -4]} intensity={0.85} color="#3ecf9a" />
      <pointLight position={[0, 2, 3]} intensity={1.1} color="#2fd0e8" distance={14} />
      <pointLight position={[2, -0.5, 1]} intensity={0.55} color="#2f7dff" distance={8} />
      <fog attach="fog" args={["#0a1424", 8, 22]} />
    </>
  );
}
