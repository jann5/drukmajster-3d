import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function TechnicalPart() {
    const meshRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y += 0.005;
    });

    return (
        <group ref={meshRef}>
            {/* Main vertical body */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.8, 1, 2, 8]} />
                <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.9} />
            </mesh>

            {/* Top ring */}
            <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.8, 0.1, 16, 32]} />
                <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.9} />
            </mesh>

            {/* Middle ribs */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <mesh key={i} position={[Math.cos(i * Math.PI / 4) * 0.9, 0, Math.sin(i * Math.PI / 4) * 0.9]}>
                    <boxGeometry args={[0.2, 1.5, 0.1]} />
                    <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.9} />
                </mesh>
            ))}

            {/* Bottom base */}
            <mesh position={[0, -1.2, 0]}>
                <cylinderGeometry args={[1.2, 1.2, 0.2, 8]} />
                <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.9} />
            </mesh>
        </group>
    );
}

export default function ThreeDModel() {
    return (
        <div className="w-full h-full min-h-[400px] relative group overflow-hidden">
            {/* Labels / Technical Overlay */}
            <div className="absolute top-8 left-8 z-10 pointer-events-none">
                <span className="font-mono text-[10px] text-gray-text uppercase tracking-widest block mb-2">Live Preview // 01</span>
                <h3 className="font-sans font-bold text-black text-xl uppercase tracking-tighter">Detale techniczne</h3>
            </div>

            <div className="absolute bottom-8 right-8 z-10 text-right pointer-events-none">
                <span className="font-mono text-[10px] text-gray-text uppercase tracking-widest block mb-2">Technologia FDM</span>
                <div className="flex gap-4 justify-end">
                    <span className="font-mono text-black text-xs">X: 124.5mm</span>
                    <span className="font-mono text-black text-xs">Y: 210.0mm</span>
                </div>
            </div>

            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={1} />

                <Float
                    speed={1.5}
                    rotationIntensity={1}
                    floatIntensity={1}
                >
                    <TechnicalPart />
                </Float>

                <OrbitControls
                    enableZoom={false}
                    autoRotate={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                />

                {/* Grid helper for industrial feel */}
                <gridHelper args={[20, 20, '#000000', '#f1f1f1']} position={[0, -2, 0]} />
            </Canvas>

            {/* Noise overlay */}
            <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.03] bg-black" />
        </div>
    );
}
