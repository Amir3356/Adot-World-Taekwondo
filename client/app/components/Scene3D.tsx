"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Float, Environment, TorusKnot, Icosahedron } from "@react-three/drei";
import * as THREE from "three";
import { useScrollProgress } from "./useScrollProgress";
import { usePrefersReducedMotion } from "./useReducedMotion";

const GOLD = "#e8b450";
const GOLD_DEEP = "#8a5e15";

/**
 * Deterministic PRNG. Random layout has to be reproducible: an impure
 * Math.random() during render breaks React purity and hydration.
 */
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Slowly turning knot — reads as a belt tied in space. */
function BeltKnot(props: ThreeElements["group"]) {
  const ref = useRef<THREE.Group>(null);
  const progress = useScrollProgress();

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.18;
    // Scroll tilts the knot and pushes it back into depth.
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      progress.current * Math.PI * 0.75,
      0.06,
    );
    ref.current.position.z = THREE.MathUtils.lerp(
      ref.current.position.z,
      -progress.current * 4,
      0.06,
    );
    ref.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.12 - progress.current * 1.2;
  });

  return (
    <group ref={ref} {...props}>
      <TorusKnot args={[0.85, 0.26, 200, 32]}>
        <meshStandardMaterial
          color={GOLD}
          emissive={GOLD_DEEP}
          emissiveIntensity={0.5}
          metalness={0.85}
          roughness={0.32}
          envMapIntensity={0.35}
        />
      </TorusKnot>
    </group>
  );
}

/** Drifting gold motes for depth. */
function Motes({ count = 70 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const progress = useScrollProgress();

  const seeds = useMemo(() => {
    const rand = makeRng(0x5eed);
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (rand() - 0.5) * 16,
        (rand() - 0.5) * 12,
        (rand() - 0.5) * 10 - 2,
      ),
      speed: 0.08 + rand() * 0.22,
      phase: rand() * Math.PI * 2,
      scale: 0.012 + rand() * 0.035,
    }));
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    seeds.forEach((s, i) => {
      // Rise slowly, wrap at the top, and drift sideways with scroll.
      const y = ((s.position.y + t * s.speed + 6) % 12) - 6;
      dummy.position.set(
        s.position.x + Math.sin(t * 0.3 + s.phase) * 0.5,
        y,
        s.position.z + progress.current * 3,
      );
      const pulse = 1 + Math.sin(t * 1.4 + s.phase) * 0.3;
      dummy.scale.setScalar(s.scale * pulse);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={GOLD} transparent opacity={0.75} />
    </instancedMesh>
  );
}

/** Faceted shards that orbit the composition. */
function Shards() {
  const group = useRef<THREE.Group>(null);
  const progress = useScrollProgress();

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y -= delta * 0.07;
    group.current.rotation.z = progress.current * 0.6;
    group.current.position.y = progress.current * 2;
  });

  const shards = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const angle = (i / 7) * Math.PI * 2;
        return {
          key: i,
          position: [
            Math.cos(angle) * 5.6,
            Math.sin(angle * 1.7) * 2.6,
            Math.sin(angle) * 2.5 - 4.5,
          ] as [number, number, number],
          scale: 0.1 + (i % 3) * 0.05,
        };
      }),
    [],
  );

  return (
    <group ref={group}>
      {shards.map((s) => (
        <Float
          key={s.key}
          speed={1.1}
          rotationIntensity={1.4}
          floatIntensity={1.1}
        >
          <Icosahedron args={[s.scale, 0]} position={s.position}>
            <meshStandardMaterial
              color={GOLD}
              emissive={GOLD_DEEP}
              emissiveIntensity={0.55}
              metalness={0.8}
              roughness={0.35}
              envMapIntensity={0.35}
              flatShading
            />
          </Icosahedron>
        </Float>
      ))}
    </group>
  );
}

/**
 * Fixed-position 3D backdrop. Sits behind all content and never
 * intercepts pointer events, so the page stays pure-scroll.
 */
export default function Scene3D() {
  // Skip the canvas entirely for reduced-motion visitors (and during SSR).
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ contain: "strict" }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[4, 6, 5]} intensity={2.2} color="#ffd98a" />
          <pointLight position={[-5, -3, 2]} intensity={18} color="#d4682a" />
          <BeltKnot position={[4.4, 0.6, -2.6]} />
          <Shards />
          <Motes />
          <Environment preset="night" environmentIntensity={0.35} />
        </Suspense>
      </Canvas>
    </div>
  );
}
