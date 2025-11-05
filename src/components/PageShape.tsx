import { useRef } from 'react';
import { useFrame } from '@react-three-fiber';
import { useScroll, Box, Sphere, Torus, Dodecahedron } from '@react-three/drei';
import { Mesh } from 'three';
import * as THREE from 'three';

// This component renders a shape and links its animation to scroll progress
export const PageShape = ({ shape }: { shape: 'sphere' | 'box' | 'torus' | 'dodecahedron' }) => {
  const meshRef = useRef<Mesh>(null!);
  const scroll = useScroll(); // Hook to get scroll data

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle constant rotation
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;

      // --- New Scroll Animation ---
      // scroll.offset goes from 0 (top) to 1 (bottom)

      // 1. Move the shape up as user scrolls
      // It starts at y=1.5 and moves up to y=4
      meshRef.current.position.y = THREE.MathUtils.lerp(
        1.5, // Start position
        4,   // End position
        scroll.offset
      );

      // 2. Shrink the shape as user scrolls
      // It starts at scale=1 and shrinks to scale=0
      const scale = THREE.MathUtils.lerp(
        1,   // Start scale
        0,   // End scale
        scroll.offset
      );
      meshRef.current.scale.set(scale, scale, scale);
      // --- End New Scroll Animation ---
    }
  });

  // Common material for all shapes
  const material = (
    <meshStandardMaterial
      color="#7c3aed"
      roughness={0.1}
      metalness={0.6}
      transparent // Needed to allow fading, though we animate scale now
      opacity={1}
    />
  );

  // Render a different shape based on the prop
  const renderShape = () => {
    switch (shape) {
      case 'sphere':
        return <Sphere ref={meshRef} args={[1.5, 32, 32]}>{material}</Sphere>;
      case 'box':
        return <Box ref={meshRef} args={[2.5, 2.5, 2.5]}>{material}</Box>;
      case 'torus':
        return <Torus ref={meshRef} args={[1.5, 0.5, 16, 100]}>{material}</Torus>;
      case 'dodecahedron':
        return <Dodecahedron ref={meshRef} args={[1.5, 0]}>{material}</Dodecahedron>;
      default:
        return <Sphere ref={meshRef} args={[1.5, 32, 32]}>{material}</Sphere>;
    }
  };

  // Set the starting position to be centered (x=0) and slightly up (y=1.5)
  return <group position={[0, 1.5, 0]}>{renderShape()}</group>;
};
