import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

function ModelContent() {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      {/* Aumentamos args a [2.5] para que sea una esfera GRANDE */}
      <mesh ref={meshRef} scale={2.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#00f2ff"
          speed={2}
          distort={0.4}
          radius={1}
          emissive="#00f2ff"
          emissiveIntensity={0.8} // Más brillante
        />
      </mesh>
    </Float>
  );
}

const Model3D = () => {
  return <ModelContent />;
};

export default Model3D;