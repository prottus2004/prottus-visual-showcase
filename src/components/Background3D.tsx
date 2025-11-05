import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, TorusKnot } from "@react-three/drei";
import { Mesh, MeshStandardMaterial } from "three"; // Import MeshStandardMaterial here

function AnimatedObject() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Slower, smoother rotation
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    // Use a more complex shape
    <TorusKnot ref={meshRef} args={[1, 0.3, 100, 16]} scale={1.5}>
      {/* Use MeshStandardMaterial for realistic lighting */}
      <meshStandardMaterial
        color="#7c3aed"
        roughness={0.1}
        metalness={0.6}
      />
    </TorusKnot>
  );
}

export const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Improved lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#22d3ee" />
        
        {/* Add Stars */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <AnimatedObject />
        
        {/* Add OrbitControls for interaction */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          // Constrain vertical rotation
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};
