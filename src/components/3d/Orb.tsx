"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { isLowPower, prefersReducedMotion } from "@/lib/device";

export type OrbState = { intensity: number; hue: number; speed: number; mx: number; my: number; warp: number };

export const createOrbState = (): OrbState => ({ intensity: 0.35, hue: 0, speed: 1, mx: 0, my: 0, warp: 0 });

const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const vertexShader = /* glsl */ `
uniform float uTime; uniform float uIntensity;
varying vec3 vNormal; varying vec3 vView; varying float vDisp;
${noise}
float disp(vec3 p){
  float n = snoise(p*1.05 + vec3(uTime*0.26));
  float n2 = snoise(p*2.4 - vec3(uTime*0.4)) * 0.28;
  return (n + n2) * (0.06 + 0.15*uIntensity);
}
vec3 orth(vec3 v){ return abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0) : vec3(0.0, -v.z, v.y); }
void main(){
  vec3 n = normalize(position);
  float d = disp(n);
  vec3 pos = n * (1.0 + d);
  vec3 t = normalize(orth(n)); vec3 b = normalize(cross(n, t));
  vec3 q1 = normalize(n + t*0.012); vec3 q2 = normalize(n + b*0.012);
  q1 *= 1.0 + disp(q1); q2 *= 1.0 + disp(q2);
  vec3 dn = normalize(cross(q1 - pos, q2 - pos));
  vNormal = normalize(normalMatrix * dn);
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vView = normalize(-mv.xyz);
  vDisp = d;
  gl_Position = projectionMatrix * mv;
}`;

const fragmentShader = /* glsl */ `
uniform float uHue; uniform float uIntensity; uniform float uLight;
varying vec3 vNormal; varying vec3 vView; varying float vDisp;
void main(){
  vec3 N = normalize(vNormal); vec3 V = normalize(vView);
  float fres = pow(1.0 - max(dot(N, V), 0.0), 2.3);
  // uLight = 1 brightens the body for light backgrounds.
  vec3 deep = mix(vec3(0.005, 0.03, 0.18), vec3(0.04, 0.2, 0.72), uLight);
  vec3 blue = mix(vec3(0.06, 0.28, 1.0), vec3(0.32, 0.6, 1.0), uLight);
  vec3 cyan = vec3(0.3, 0.88, 1.0);
  vec3 violet = vec3(0.62, 0.38, 1.0);
  float k = smoothstep(-0.22, 0.32, vDisp);
  vec3 base = mix(deep, blue, k * 0.75);
  vec3 rim = mix(cyan, violet, uHue);
  vec3 irid = 0.5 + 0.5 * cos(6.2831 * (vec3(0.0, 0.18, 0.36) + fres * 0.9 + vDisp * 1.6 + uHue * 0.45));
  irid *= vec3(0.35, 0.55, 1.0);
  vec3 L = normalize(vec3(0.35, 0.85, 0.6));
  float diff = max(dot(N, L), 0.0);
  float spec = pow(max(dot(N, normalize(L + V)), 0.0), 60.0);
  vec3 col = base * (0.3 + 0.7 * diff) + rim * fres * (1.1 + 0.9 * uIntensity) + irid * fres * 0.55 + spec * 0.7;
  col += uLight * 0.06;
  gl_FragColor = vec4(col, 1.0);
}`;

function Blob({ state, detail, light }: { state: React.RefObject<OrbState>; detail: number; light: boolean }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uIntensity: { value: 0 }, uHue: { value: 0 }, uLight: { value: light ? 1 : 0 } }), [light]);

  useFrame((_, dt) => {
    const s = state.current;
    const d = Math.min(dt, 0.05);
    const u = mat.current!.uniforms;
    u.uTime.value += d * s.speed;
    u.uIntensity.value += (s.intensity - u.uIntensity.value) * 0.06;
    u.uHue.value += (s.hue - u.uHue.value) * 0.05;
    mesh.current!.rotation.y += d * 0.12 * s.speed;
    const g = group.current!;
    g.rotation.x += (s.my * 0.35 - g.rotation.x) * 0.04;
    g.rotation.z += (-s.mx * 0.2 - g.rotation.z) * 0.04;
  });

  return (
    <group ref={group}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1, detail]} />
        <shaderMaterial ref={mat} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
      </mesh>
    </group>
  );
}

export default function Orb({ state, cameraZ = 4.6, light = false }: { state: React.RefObject<OrbState>; cameraZ?: number; light?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [webgl] = useState(() => {
    try { return !!document.createElement("canvas").getContext("webgl2"); } catch { return false; }
  });
  const [low] = useState(isLowPower);
  const [still] = useState(prefersReducedMotion);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(wrap.current!);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="orb-wrap">
      {webgl ? (
        // offsetSize: measure layout size, not the scaled bounding box — the wrapper is scale-animated.
        <Canvas resize={{ offsetSize: true }} dpr={low ? [1, 1.25] : [1, 1.75]} frameloop={still ? "demand" : visible ? "always" : "never"} camera={{ position: [0, 0, cameraZ], fov: 45 }} gl={{ alpha: true, antialias: !low, powerPreference: "high-performance" }}>
          <Blob state={state} detail={low ? 28 : 64} light={light} />
        </Canvas>
      ) : (
        <div className="orb-fallback" />
      )}
    </div>
  );
}
