import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  MeshDistortMaterial,
  Float,
  Stars,
} from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useMousePosition } from "../../hooks/useMousePosition";
import { useLanguage } from "../../context/LanguageContext";

function AnimatedCrystal({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.2 + mouse.y * 0.3;
    meshRef.current.rotation.z = mouse.x * 0.2;
    if (outerRef.current) {
      outerRef.current.rotation.y -= 0.008;
      outerRef.current.rotation.x = t * 0.1;
    }
  });

  return (
    <group>
      {/* Outer wireframe */}
      <mesh ref={outerRef} scale={1.8}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color="#2563EB"
          wireframe
          opacity={0.15}
          transparent
        />
      </mesh>

      {/* Main crystal */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={meshRef} castShadow>
          <octahedronGeometry args={[1, 2]} />
          <MeshDistortMaterial
            color="#F59E0B"
            emissive="#B45309"
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.2}
            distort={0.15}
            speed={2}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>

      {/* Inner glow sphere */}
      <mesh scale={0.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#1D4ED8"
          emissiveIntensity={0.8}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

export default function ThreeDIntro() {
  const { normalised } = useMousePosition();
  const { t } = useLanguage();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <span className="text-amber-400 text-sm tracking-widest uppercase font-medium">
            {t.intro3d.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {t.intro3d.title}{" "}
            <span className="text-gradient-gold">{t.intro3d.titleAccent}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl overflow-hidden"
          style={{ height: "500px" }}
        >
          <Canvas
            camera={{ position: [0, 0, 4], fov: 60 }}
            style={{ background: "transparent" }}
            shadows
          >
            <ambientLight intensity={0.3} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={1.5}
              color="#F59E0B"
              castShadow
            />
            <directionalLight
              position={[-5, -5, -5]}
              intensity={0.5}
              color="#2563EB"
            />
            <pointLight position={[0, 3, 0]} intensity={1} color="#F59E0B" />

            <Stars
              radius={50}
              depth={50}
              count={1000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />

            <AnimatedCrystal mouse={normalised} />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={(Math.PI * 2) / 3}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          // viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-400 mt-4 text-sm"
        >
          {t.intro3d.hint}
        </motion.p>
      </div>
    </section>
  );
}
