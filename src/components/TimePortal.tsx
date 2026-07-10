import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, TorusKnot, MeshWobbleMaterial } from "@react-three/drei";
import { Color, Group, Mesh, MathUtils } from "three";

/** A tunnel of receding rings — the "chrono stream". */
function WormholeRings({ hue }: { hue: number }) {
  const group = useRef<Group>(null);
  const ringMeshes = useRef<Mesh[]>([]);
  const target = useMemo(() => new Color(`hsl(${hue}, 90%, 60%)`), [hue]);

  const rings = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        z: -i * 2.2,
        r: 1.6 + i * 0.18,
        speed: 0.2 + (i % 3) * 0.08,
      })),
    [],
  );

  useFrame((state, delta) => {
    target.set(`hsl(${hue}, 90%, 60%)`);
    if (group.current) group.current.rotation.z += delta * 0.05;
    const t = state.clock.elapsedTime;
    ringMeshes.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.rotation.x = t * rings[i].speed;
      mesh.rotation.y = t * rings[i].speed * 0.7;
      const mat = mesh.material as { color?: Color };
      if (mat?.color) mat.color.lerp(target, Math.min(1, delta * 1.2));
    });
  });

  return (
    <group ref={group}>
      {rings.map((ring, i) => (
        <mesh
          key={i}
          ref={(m) => {
            if (m) ringMeshes.current[i] = m;
          }}
          position={[0, 0, ring.z]}
        >
          <torusGeometry args={[ring.r, 0.015, 12, 80]} />
          <meshStandardMaterial
            color={`hsl(${hue}, 90%, 60%)`}
            emissive={`hsl(${hue}, 90%, 60%)`}
            emissiveIntensity={0.6}
            transparent
            opacity={0.5 - i * 0.025}
          />
        </mesh>
      ))}
    </group>
  );
}

/** The central portal gate — a wobbling torus knot core. */
function PortalCore({ hue }: { hue: number }) {
  const mesh = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.15;
      mesh.current.rotation.y += delta * 0.2;
    }
  });
  return (
    <mesh ref={mesh} position={[0, 0, -1]} scale={1.15}>
      <TorusKnot args={[0.9, 0.26, 140, 24]}>
        <MeshWobbleMaterial
          color={`hsl(${hue}, 90%, 62%)`}
          emissive={`hsl(${hue}, 90%, 50%)`}
          emissiveIntensity={0.35}
          factor={0.6}
          speed={1.1}
          roughness={0.15}
          metalness={0.7}
        />
      </TorusKnot>
    </mesh>
  );
}

/** Slow parallax drift of the whole scene with the pointer. */
function SceneRig({ hue }: { hue: number }) {
  useFrame((state) => {
    state.camera.position.x = MathUtils.lerp(
      state.camera.position.x,
      state.pointer.x * 0.6,
      0.03,
    );
    state.camera.position.y = MathUtils.lerp(
      state.camera.position.y,
      state.pointer.y * 0.4,
      0.03,
    );
    state.camera.lookAt(0, 0, -2);
  });
  // touch hue target each frame so a hue prop change re-tints immediately
  void hue;
  return null;
}

export const TimePortal = ({ hue }: { hue: number }) => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#05060d"]} />
        <fog attach="fog" args={["#05060d", 6, 22]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[6, 6, 4]} intensity={1.2} />
        <pointLight position={[-8, -6, -4]} intensity={1.1} color={`hsl(${hue},90%,60%)`} />

        <Stars radius={120} depth={60} count={3500} factor={4} saturation={0} fade speed={0.8} />
        <WormholeRings hue={hue} />
        <PortalCore hue={hue} />
        <SceneRig hue={hue} />
      </Canvas>

      {/* vignette + era glow overlay (pure CSS, cheap) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, transparent 40%, rgba(5,6,13,0.85) 100%)",
        }}
      />
    </div>
  );
};