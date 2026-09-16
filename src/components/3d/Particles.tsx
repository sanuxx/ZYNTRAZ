"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { isLowPower, prefersReducedMotion } from "@/lib/device";
import { BASE_PATH } from "@/lib/site";

// m: shape morph 0..4. a: assemble 0 (scattered burst) → 1 (formed). mx/my: pointer.
export type SwarmState = { m: number; mx: number; my: number; a: number };

// Shared between the WebGL scene and the HTML labels so both agree on where shapes sit.
export const CAMERA_Z = 6;
const VIEW_H = 2 * CAMERA_Z * Math.tan((45 / 2) * (Math.PI / 180));
export const PLATFORM_CENTERS: [number, number][] = [[-1.75, 1.05], [1.75, 1.05], [-1.75, -1.05], [1.75, -1.05]];

export function swarmLayout(aspect: number, m: number) {
  const viewW = VIEW_H * aspect;
  const scale = Math.min(0.78, viewW / 5.8);
  const final = Math.min(Math.max(m - 3, 0), 1);
  const wide = aspect > 1.15;
  const offX = wide ? viewW * 0.2 * (1 - final) : 0;
  const offY = wide ? 0 : VIEW_H * (0.17 - 0.07 * final);
  return { viewW, viewH: VIEW_H, scale, offX, offY };
}

function prng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildShapes(n: number) {
  const r = prng(7);
  const s0 = new Float32Array(n * 3), s1 = new Float32Array(n * 3), s2 = new Float32Array(n * 3), s3 = new Float32Array(n * 3);
  const rand = new Float32Array(n);
  const v = new THREE.Vector3();
  const put = (arr: Float32Array, i: number, p: THREE.Vector3) => { arr[i * 3] = p.x; arr[i * 3 + 1] = p.y; arr[i * 3 + 2] = p.z; };

  // 0 — AI core: a sphere shell with orbiting rings.
  const ringTilts = [new THREE.Euler(1.2, 0.2, 0), new THREE.Euler(-0.9, 0.9, 0.3), new THREE.Euler(0.3, -1.1, 1.3)];
  const shell = Math.floor(n * 0.7);
  for (let i = 0; i < n; i++) {
    rand[i] = r();
    if (i < shell) {
      const y = 1 - (i / (shell - 1)) * 2, rad = Math.sqrt(1 - y * y), th = i * 2.399963;
      const R = 1.45 + (r() - 0.5) * 0.08;
      v.set(Math.cos(th) * rad * R, y * R, Math.sin(th) * rad * R);
    } else {
      const k = i % 3, R = 2.05 + k * 0.32 + (r() - 0.5) * 0.05, a = r() * Math.PI * 2;
      v.set(Math.cos(a) * R, (r() - 0.5) * 0.04, Math.sin(a) * R).applyEuler(ringTilts[k]);
    }
    put(s0, i, v);
  }

  // 1 — Business systems: three stacked dashboard layers, bar chart on top.
  const layerRot = new THREE.Euler(-1.05, 0.55, 0);
  for (let i = 0; i < n; i++) {
    const kind = r();
    const layer = i % 3;
    const ly = (layer - 1) * 0.95;
    if (kind < 0.3) {
      const t = r() * 2 * (3.6 + 2.2), side = t < 3.6 ? 0 : t < 5.8 ? 1 : t < 9.4 ? 2 : 3;
      const u = side === 0 ? t - 1.8 : side === 1 ? 1.8 : side === 2 ? t - 5.8 - 1.8 : -1.8;
      const w = side === 0 ? -1.1 : side === 1 ? t - 3.6 - 1.1 : side === 2 ? 1.1 : t - 9.4 - 1.1;
      v.set(u, 0, w);
    } else if (kind < 0.82 || layer !== 2) {
      v.set(Math.round((r() - 0.5) * 3.4 * 7) / 7, 0, Math.round((r() - 0.5) * 2 * 5) / 5);
      v.x += (r() - 0.5) * 0.03; v.z += (r() - 0.5) * 0.03;
    } else {
      const bar = Math.floor(r() * 8), h = [0.4, 0.7, 0.55, 0.95, 0.8, 1.2, 1.05, 1.4][bar];
      v.set(-1.4 + bar * 0.4, 0, 0.3);
      v.applyEuler(layerRot).add(new THREE.Vector3(0, ly + r() * h, 0));
      put(s1, i, v);
      continue;
    }
    v.applyEuler(layerRot).add(new THREE.Vector3(0, ly, 0));
    put(s1, i, v);
  }

  // 2 — Automation: a network of connected nodes with data flowing along the links.
  const nodes: THREE.Vector3[] = [];
  for (let k = 0; k < 9; k++) {
    const a = (k / 9) * Math.PI * 2 + r() * 0.4, R = 1.3 + r() * 0.9;
    nodes.push(new THREE.Vector3(Math.cos(a) * R, (r() - 0.5) * 2.4, Math.sin(a) * R * 0.6));
  }
  nodes.push(new THREE.Vector3(0, 0, 0));
  const edges: [number, number][] = [];
  nodes.forEach((a, ai) => {
    nodes.map((b, bi) => ({ bi, d: a.distanceTo(b) })).filter((e) => e.bi !== ai).sort((x, y) => x.d - y.d).slice(0, 2)
      .forEach(({ bi }) => { if (!edges.some(([p, q]) => (p === bi && q === ai) || (p === ai && q === bi))) edges.push([ai, bi]); });
    if (ai !== 9) edges.push([ai, 9]);
  });
  for (let i = 0; i < n; i++) {
    if (r() < 0.42) {
      const c = nodes[Math.floor(r() * nodes.length)], rr = (i % 10 === 9 ? 0.32 : 0.17) * Math.cbrt(r());
      const th = r() * Math.PI * 2, ph = Math.acos(2 * r() - 1);
      v.set(c.x + rr * Math.sin(ph) * Math.cos(th), c.y + rr * Math.cos(ph), c.z + rr * Math.sin(ph) * Math.sin(th));
    } else {
      const [a, b] = edges[Math.floor(r() * edges.length)];
      v.copy(nodes[a]).lerp(nodes[b], r());
      v.x += (r() - 0.5) * 0.03; v.y += (r() - 0.5) * 0.03;
    }
    put(s2, i, v);
  }

  // 3 — Platforms: four floating app windows, each sketching its product's UI.
  // Window-local space: x -0.75..0.75, y -0.5..0.5; title bar above y 0.3.
  const WIN_W = 1.5, WIN_H = 1.0;
  const uis: [number, number, number, number][][] = [
    // ZynRest — POS tile grid
    [[-0.68, 0.02, -0.26, 0.26], [-0.21, 0.02, 0.21, 0.26], [0.26, 0.02, 0.68, 0.26],
      [-0.68, -0.44, -0.26, -0.06], [-0.21, -0.44, 0.21, -0.06], [0.26, -0.44, 0.68, -0.06]],
    // ZynStay — booking timeline
    [[-0.6, 0.16, 0.1, 0.26], [-0.2, -0.02, 0.62, 0.08], [-0.68, -0.2, -0.2, -0.1], [0.05, -0.38, 0.55, -0.28]],
    // ZynDesk — ticket list and chat bubbles
    [[-0.68, 0.16, -0.22, 0.26], [-0.68, -0.02, -0.22, 0.08], [-0.68, -0.2, -0.22, -0.1], [-0.68, -0.38, -0.22, -0.28],
      [-0.12, 0.12, 0.4, 0.24], [0.12, -0.1, 0.66, 0.02], [-0.12, -0.34, 0.36, -0.22]],
    // ZynCRM — pipeline columns and cards
    [[-0.66, 0.1, -0.26, 0.26], [-0.66, -0.12, -0.26, 0.04], [-0.2, 0.1, 0.2, 0.26], [-0.2, -0.12, 0.2, 0.04],
      [-0.2, -0.34, 0.2, -0.18], [0.26, 0.1, 0.66, 0.26]],
  ];
  const areas = uis.map((rects) => {
    let acc = 0;
    return rects.map(([x0, y0, x1, y1]) => (acc += (x1 - x0) * (y1 - y0)));
  });
  const winTilt = [new THREE.Euler(0.16, 0.3, 0), new THREE.Euler(0.16, -0.3, 0), new THREE.Euler(-0.12, 0.3, 0), new THREE.Euler(-0.12, -0.3, 0)];
  for (let i = 0; i < n; i++) {
    const k = i % 4, roll = r();
    let x: number, y: number;
    if (roll < 0.34) {
      // Window outline.
      const t = r() * 2 * (WIN_W + WIN_H);
      if (t < WIN_W) { x = t - WIN_W / 2; y = WIN_H / 2; }
      else if (t < WIN_W + WIN_H) { x = WIN_W / 2; y = WIN_H / 2 - (t - WIN_W); }
      else if (t < 2 * WIN_W + WIN_H) { x = WIN_W / 2 - (t - WIN_W - WIN_H); y = -WIN_H / 2; }
      else { x = -WIN_W / 2; y = -WIN_H / 2 + (t - 2 * WIN_W - WIN_H); }
    } else if (roll < 0.44) {
      // Title bar: divider line and three dots.
      if (r() < 0.55) { x = (r() - 0.5) * WIN_W; y = 0.3; }
      else { const a = r() * Math.PI * 2, rad = Math.sqrt(r()) * 0.028; x = -0.64 + Math.floor(r() * 3) * 0.075 + Math.cos(a) * rad; y = 0.4 + Math.sin(a) * rad; }
    } else {
      // Product UI blocks, sampled by area so density is even.
      const cum = areas[k], pick = r() * cum[cum.length - 1];
      const [x0, y0, x1, y1] = uis[k][cum.findIndex((c) => c >= pick)];
      x = x0 + r() * (x1 - x0); y = y0 + r() * (y1 - y0);
    }
    const [cx, cy] = PLATFORM_CENTERS[k];
    v.set(x + (r() - 0.5) * 0.012, y + (r() - 0.5) * 0.012, (r() - 0.5) * 0.02).applyEuler(winTilt[k]).add(new THREE.Vector3(cx, cy, 0));
    put(s3, i, v);
  }

  return { s0, s1, s2, s3, s4: s0.slice(), rand };
}

async function sampleLogo(n: number, width: number) {
  const img = new Image();
  img.src = `${BASE_PATH}/zyntraz-logo-white.png`;
  await img.decode();
  const W = 520, H = Math.round((W * img.height) / img.width);
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const g = c.getContext("2d", { willReadFrequently: true })!;
  g.drawImage(img, 0, 0, W, H);
  const data = g.getImageData(0, 0, W, H).data;
  const pts: number[] = [];
  for (let y = 0; y < H; y += 1) for (let x = 0; x < W; x += 1) if (data[(y * W + x) * 4 + 3] > 140) pts.push(x, y);
  const r = prng(11), out = new Float32Array(n * 3), k = width / W;
  for (let i = 0; i < n; i++) {
    const j = Math.floor(r() * (pts.length / 2)) * 2;
    out[i * 3] = (pts[j] - W / 2 + (r() - 0.5)) * k;
    out[i * 3 + 1] = -(pts[j + 1] - H / 2 + (r() - 0.5)) * k;
    out[i * 3 + 2] = (r() - 0.5) * 0.08;
  }
  return out;
}

const vertexShader = /* glsl */ `
attribute vec3 aS0; attribute vec3 aS1; attribute vec3 aS2; attribute vec3 aS3; attribute vec3 aS4;
attribute float aRand;
uniform float uM; uniform float uA; uniform float uTime; uniform float uSize; uniform float uPixel;
varying float vRand; varying float vGlow;
float seg(float k){ return smoothstep(0.0, 1.0, clamp((uM - k) * 1.35 - aRand * 0.35, 0.0, 1.0)); }
void main(){
  float t1 = seg(0.0), t2 = seg(1.0), t3 = seg(2.0), t4 = seg(3.0);
  vec3 p = mix(aS0, aS1, t1); p = mix(p, aS2, t2); p = mix(p, aS3, t3); p = mix(p, aS4, t4);
  float mid = max(max(t1 * (1.0 - t1), t2 * (1.0 - t2)), max(t3 * (1.0 - t3), t4 * (1.0 - t4))) * 4.0;
  // Assemble from a burst: each particle flies in from its own far-out direction.
  vec3 dir = normalize(vec3(sin(aRand * 91.7), cos(aRand * 47.3), sin(aRand * 13.1 + 1.3)) + 0.001);
  float ga = smoothstep(0.0, 1.0, clamp(uA * 1.3 - aRand * 0.3, 0.0, 1.0));
  p = mix(dir * (3.5 + aRand * 5.0), p, ga);
  mid = max(mid, ga * (1.0 - ga) * 3.0);
  float tt = uTime * 0.6 + aRand * 6.2831;
  vec3 swirl = vec3(sin(p.y * 2.7 + tt), sin(p.z * 2.3 + tt * 1.3), sin(p.x * 2.9 + tt * 0.7));
  p += swirl * (0.018 + 0.7 * mid) * (1.0 - t4 * 0.7);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (0.55 + aRand * 0.9) * uPixel / -mv.z * (1.0 - t4 * 0.25);
  vRand = aRand; vGlow = mid;
}`;

const fragmentShader = /* glsl */ `
varying float vRand; varying float vGlow;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d); a *= a;
  vec3 col = mix(vec3(0.28, 0.52, 1.0), vec3(0.64, 0.45, 1.0), vRand);
  col = mix(col, vec3(0.45, 0.92, 1.0), step(0.86, vRand));
  col += vGlow * 0.35;
  gl_FragColor = vec4(col * a * 1.25, a);
}`;

function Swarm({ state, n }: { state: React.RefObject<SwarmState>; n: number }) {
  const group = useRef<THREE.Group>(null);
  const geo = useRef<THREE.BufferGeometry>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const shapes = useMemo(() => buildShapes(n), [n]);
  const uniforms = useMemo(() => ({ uM: { value: 0 }, uA: { value: 0 }, uTime: { value: 0 }, uSize: { value: 26 }, uPixel: { value: 1 } }), []);

  useEffect(() => {
    let alive = true;
    sampleLogo(n, 5.2).then((pts) => {
      if (!alive || !geo.current) return;
      const attr = geo.current.getAttribute("aS4") as THREE.BufferAttribute;
      (attr.array as Float32Array).set(pts);
      attr.needsUpdate = true;
    }).catch(() => {});
    return () => { alive = false; };
  }, [n]);

  useFrame((three, dt) => {
    const s = state.current;
    const u = mat.current!.uniforms;
    u.uTime.value += Math.min(dt, 0.05);
    u.uM.value += (s.m - u.uM.value) * 0.12;
    u.uA.value += (s.a - u.uA.value) * 0.1;
    u.uPixel.value = three.gl.getPixelRatio();
    const L = swarmLayout(size.width / size.height, u.uM.value);
    const g = group.current!;
    const settle = 1 - Math.min(Math.max(u.uM.value - 3, 0), 1);
    g.scale.setScalar(L.scale);
    g.position.set(L.offX, L.offY, 0);
    g.rotation.y += ((Math.sin(u.uTime.value * 0.18) * 0.45 + s.mx * 0.5) * settle - g.rotation.y) * 0.05;
    g.rotation.x += ((s.my * 0.3) * settle - g.rotation.x) * 0.05;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry ref={geo}>
          <bufferAttribute attach="attributes-position" args={[shapes.s0, 3]} />
          <bufferAttribute attach="attributes-aS0" args={[shapes.s0, 3]} />
          <bufferAttribute attach="attributes-aS1" args={[shapes.s1, 3]} />
          <bufferAttribute attach="attributes-aS2" args={[shapes.s2, 3]} />
          <bufferAttribute attach="attributes-aS3" args={[shapes.s3, 3]} />
          <bufferAttribute attach="attributes-aS4" args={[shapes.s4, 3]} />
          <bufferAttribute attach="attributes-aRand" args={[shapes.rand, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={mat} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms}
          transparent depthWrite={false} blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function Particles({ state }: { state: React.RefObject<SwarmState> }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [low] = useState(isLowPower);
  const [still] = useState(prefersReducedMotion);
  const n = low ? 3500 : 11000;

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(wrap.current!);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} style={{ position: "absolute", inset: 0 }}>
      <Canvas resize={{ offsetSize: true }} dpr={low ? [1, 1.25] : [1, 1.75]} frameloop={still ? "demand" : visible ? "always" : "never"} camera={{ position: [0, 0, CAMERA_Z], fov: 45 }} gl={{ alpha: true, antialias: false }}>
        <Swarm state={state} n={n} />
      </Canvas>
    </div>
  );
}
