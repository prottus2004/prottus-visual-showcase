import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Box, Sphere, Torus, Dodecahedron } from '@react-three/drei';
import { Mesh } from 'three';
import * as THREE from 'three';

// This component renders a shape and links its rotation to scroll progress
export const PageShape = ({ shape }: { shape: 'sphere' | 'box' | 'torus' | 'dodecahedron' }) => {
  const meshRef = useRef<Mesh>(null!);
  const scroll = useScroll(); // Hook to get scroll data

  // Animate the shape on every frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle constant rotation (Increased speeds)
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;

      // Make rotation follow scroll
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z, // from
        scroll.offset * Math.PI * 1.5, // to
        0.05 // smooth factor
      );

      // Make position move slightly with scroll
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        1 - scroll.offset * 10, // move up as user scrolls down
        0.05
      );
    }
  });

  // Common material for all shapes
  const material = (
    <meshStandardMaterial
      color="#7c3aed"
      roughness={0.1}
      metalness={0.6}
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

  return <group position={[1.5, 1, 0]}>{renderShape()}</group>;
};
