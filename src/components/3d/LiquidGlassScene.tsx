"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function GlassSphere({
  position,
  scale,
  floatSpeed,
  offset,
}: {
  position: [number, number, number];
  scale: number;
  floatSpeed: number;
  offset: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * 0.3 + offset;
    meshRef.current.rotation.y = t * 0.12;
    meshRef.current.rotation.x = Math.sin(t * 0.25) * 0.08;
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.25} floatIntensity={0.7}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          transmission={1}
          roughness={0.04}
          thickness={2.5}
          ior={1.52}
          chromaticAberration={0.07}
          anisotropicBlur={0.08}
          temporalDistortion={0.12}
          color="#c8d8ff"
          attenuationColor="#4f6ef7"
          attenuationDistance={1.0}
          clearcoat={1}
          clearcoatRoughness={0.05}
          backside
          samples={16}
          resolution={512}
        />
      </mesh>
    </Float>
  );
}

export default function LiquidGlassScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-4, 3, 3]} intensity={3} color="#4f6ef7" />
        <pointLight position={[4, -3, 2]} intensity={2} color="#a855f7" />
        <pointLight position={[0, 0, 6]} intensity={1} color="#06b6d4" />

        <GlassSphere position={[-3, 0.5, 0]} scale={1.9} floatSpeed={0.8} offset={0} />
        <GlassSphere position={[2.8, -0.8, -1.5]} scale={1.5} floatSpeed={1.1} offset={2.1} />
        <GlassSphere position={[0.2, 1.8, -2.5]} scale={1.2} floatSpeed={0.7} offset={4.3} />
        <GlassSphere position={[-0.8, -1.8, 0.5]} scale={1.0} floatSpeed={1.3} offset={6.7} />

        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
