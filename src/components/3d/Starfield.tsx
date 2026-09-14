"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type WarpState = { warp: number };

const DEPTH = 34;

function field(n: number) {
  let seed = 3;
  const r = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const pts = new Float32Array(n * 3);
  const seg = new Float32Array(n * 6);
  const tail = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    const x = (r() - 0.5) * 36, y = (r() - 0.5) * 22, z = r() * DEPTH;
    pts.set([x, y, z], i * 3);
    seg.set([x, y, z, x, y, z], i * 6);
    tail[i * 2 + 1] = 1;
  }
  return { pts, seg, tail };
}

const common = /* glsl */ `
uniform float uTravel; uniform float uWarp;
float depth(float z0){ return mod(z0 + uTravel, ${DEPTH}.0) - ${DEPTH - 4}.0; }
`;

const pointVert = /* glsl */ `${common}
varying float vA;
void main(){
  vec3 p = position; p.z = depth(p.z);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float near = smoothstep(-${DEPTH - 4}.0, -4.0, p.z);
  gl_PointSize = (1.2 + near * 2.6) * (1.0 + uWarp) * 1.5;
  vA = near * (0.35 + 0.65 * near);
}`;
const pointFrag = /* glsl */ `
varying float vA;
void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.0, d); gl_FragColor = vec4(vec3(0.78, 0.86, 1.0) * a * vA, a * vA); }`;

const lineVert = /* glsl */ `${common}
attribute float aTail; varying float vA;
void main(){
  vec3 p = position; p.z = depth(p.z) - aTail * uWarp * 4.5;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  vA = smoothstep(-${DEPTH - 4}.0, -2.0, p.z) * uWarp * (1.0 - aTail * 0.9);
}`;
const lineFrag = /* glsl */ `varying float vA; void main(){ gl_FragColor = vec4(vec3(0.55, 0.72, 1.0) * vA, vA); }`;

function Stars({ state }: { state: React.RefObject<WarpState> }) {
  const pMat = useRef<THREE.ShaderMaterial>(null);
  const lMat = useRef<THREE.ShaderMaterial>(null);
  const { pts, seg, tail } = useMemo(() => field(2600), []);
  const pUni = useMemo(() => ({ uTravel: { value: 0 }, uWarp: { value: 0 } }), []);
  const lUni = useMemo(() => ({ uTravel: { value: 0 }, uWarp: { value: 0 } }), []);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    const pu = pMat.current!.uniforms, lu = lMat.current!.uniforms;
    pu.uWarp.value += (state.current.warp - pu.uWarp.value) * 0.1;
    pu.uTravel.value += d * (0.5 + pu.uWarp.value * 42);
    lu.uWarp.value = pu.uWarp.value;
    lu.uTravel.value = pu.uTravel.value;
  });

  const blend = { transparent: true, depthWrite: false, blending: THREE.AdditiveBlending } as const;
  return (
    <>
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[pts, 3]} /></bufferGeometry>
        <shaderMaterial ref={pMat} vertexShader={pointVert} fragmentShader={pointFrag} uniforms={pUni} {...blend} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[seg, 3]} />
          <bufferAttribute attach="attributes-aTail" args={[tail, 1]} />
        </bufferGeometry>
        <shaderMaterial ref={lMat} vertexShader={lineVert} fragmentShader={lineFrag} uniforms={lUni} {...blend} />
      </lineSegments>
    </>
  );
}

export default function Starfield({ state }: { state: React.RefObject<WarpState> }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(wrap.current!);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={wrap} style={{ position: "absolute", inset: 0 }}>
      <Canvas resize={{ offsetSize: true }} dpr={1} frameloop={visible ? "always" : "never"} camera={{ position: [0, 0, 4], fov: 60 }} gl={{ alpha: true, antialias: false }}>
        <Stars state={state} />
      </Canvas>
    </div>
  );
}
