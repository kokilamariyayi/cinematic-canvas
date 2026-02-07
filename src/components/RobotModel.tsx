import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RobotModelProps {
  mousePosition: { x: number; y: number };
  /** Optional JSON data the robot can react to in the future */
  data?: Record<string, unknown>;
}

/* ------------------------------------------------------------------ */
/*  Shared materials – created once, reused across all mesh parts     */
/* ------------------------------------------------------------------ */
const bodyMat = new THREE.MeshStandardMaterial({
  color: new THREE.Color('hsl(210, 15%, 88%)'),
  metalness: 0.15,
  roughness: 0.35,
});

const darkMat = new THREE.MeshStandardMaterial({
  color: new THREE.Color('hsl(220, 20%, 12%)'),
  metalness: 0.6,
  roughness: 0.25,
});

const visorMat = new THREE.MeshStandardMaterial({
  color: new THREE.Color('hsl(200, 30%, 10%)'),
  metalness: 0.9,
  roughness: 0.1,
  envMapIntensity: 2,
});

const accentMat = new THREE.MeshStandardMaterial({
  color: new THREE.Color('hsl(190, 90%, 50%)'),
  emissive: new THREE.Color('hsl(190, 90%, 40%)'),
  emissiveIntensity: 0.8,
  metalness: 0.3,
  roughness: 0.2,
});

const accentOrangeMat = new THREE.MeshStandardMaterial({
  color: new THREE.Color('hsl(25, 90%, 55%)'),
  emissive: new THREE.Color('hsl(25, 90%, 40%)'),
  emissiveIntensity: 0.6,
  metalness: 0.4,
  roughness: 0.3,
});

const jointMat = new THREE.MeshStandardMaterial({
  color: new THREE.Color('hsl(220, 10%, 30%)'),
  metalness: 0.7,
  roughness: 0.3,
});

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export const RobotModel = ({ mousePosition, data }: RobotModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  // Subtle idle + mouse interaction
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Breathing body bob
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.04;

    // Gentle body sway
    groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.02;

    // Mouse-based body rotation (subtle)
    const targetY = mousePosition.x * 0.25;
    const targetX = mousePosition.y * -0.08;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      0.04
    );

    // Head tracks the mouse more than body
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        mousePosition.x * 0.35,
        0.06
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        mousePosition.y * -0.15,
        0.06
      );
    }

    // Arm idle sway
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(t * 1.0 + 0.5) * 0.08;
      leftArmRef.current.rotation.z = -0.15 + Math.sin(t * 0.7) * 0.03;
    }
    if (rightArmRef.current) {
      // Right arm extended slightly (pointing gesture like reference)
      rightArmRef.current.rotation.x = -0.3 + Math.sin(t * 0.9) * 0.06;
      rightArmRef.current.rotation.z = 0.15 + Math.sin(t * 0.8 + 1) * 0.03;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* ── TORSO ── */}
      <mesh material={bodyMat} position={[0, 0, 0]}>
        <capsuleGeometry args={[0.42, 0.55, 16, 16]} />
      </mesh>

      {/* Chest accent ring */}
      <mesh material={accentMat} position={[0, 0.15, 0.38]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.025, 8, 24]} />
      </mesh>

      {/* Chest core light */}
      <mesh material={accentMat} position={[0, 0.15, 0.42]}>
        <sphereGeometry args={[0.06, 16, 16]} />
      </mesh>

      {/* Lower torso dark section */}
      <mesh material={darkMat} position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.32, 0.28, 0.15, 16]} />
      </mesh>

      {/* ── HEAD ── */}
      <group ref={headRef} position={[0, 0.72, 0]}>
        {/* Head dome */}
        <mesh material={bodyMat} position={[0, 0.08, 0]}>
          <sphereGeometry args={[0.38, 24, 24]} />
        </mesh>

        {/* Helmet top cap */}
        <mesh material={darkMat} position={[0, 0.28, -0.02]}>
          <sphereGeometry args={[0.28, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
        </mesh>

        {/* Visor */}
        <mesh material={visorMat} position={[0, 0.05, 0.22]} rotation={[0.15, 0, 0]}>
          <sphereGeometry args={[0.28, 24, 16, -Math.PI / 2.5, Math.PI / 1.25, 0.3, Math.PI / 2.5]} />
        </mesh>

        {/* Eye glow left */}
        <mesh material={accentMat} position={[-0.1, 0.07, 0.34]}>
          <sphereGeometry args={[0.035, 12, 12]} />
        </mesh>

        {/* Eye glow right */}
        <mesh material={accentMat} position={[0.1, 0.07, 0.34]}>
          <sphereGeometry args={[0.035, 12, 12]} />
        </mesh>

        {/* Antenna */}
        <mesh material={jointMat} position={[0, 0.42, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.14, 8]} />
        </mesh>
        <mesh material={accentMat} position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.035, 10, 10]} />
        </mesh>

        {/* Ear accent left */}
        <mesh material={accentOrangeMat} position={[-0.36, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.06, 16]} />
        </mesh>

        {/* Ear accent right */}
        <mesh material={accentOrangeMat} position={[0.36, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.06, 16]} />
        </mesh>

        {/* Neck */}
        <mesh material={jointMat} position={[0, -0.28, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.12, 12]} />
        </mesh>
      </group>

      {/* ── LEFT ARM ── */}
      <group ref={leftArmRef} position={[-0.55, 0.12, 0]}>
        {/* Shoulder joint */}
        <mesh material={jointMat}>
          <sphereGeometry args={[0.1, 12, 12]} />
        </mesh>

        {/* Upper arm */}
        <mesh material={bodyMat} position={[0, -0.22, 0]}>
          <capsuleGeometry args={[0.07, 0.2, 8, 12]} />
        </mesh>

        {/* Elbow accent */}
        <mesh material={accentMat} position={[0, -0.38, 0]}>
          <sphereGeometry args={[0.055, 10, 10]} />
        </mesh>

        {/* Forearm */}
        <mesh material={darkMat} position={[0, -0.52, 0]}>
          <capsuleGeometry args={[0.06, 0.16, 8, 12]} />
        </mesh>

        {/* Hand */}
        <mesh material={bodyMat} position={[0, -0.68, 0]}>
          <sphereGeometry args={[0.06, 10, 10]} />
        </mesh>
      </group>

      {/* ── RIGHT ARM (extended / pointing) ── */}
      <group ref={rightArmRef} position={[0.55, 0.12, 0]}>
        {/* Shoulder joint */}
        <mesh material={jointMat}>
          <sphereGeometry args={[0.1, 12, 12]} />
        </mesh>

        {/* Upper arm */}
        <mesh material={bodyMat} position={[0, -0.22, 0]}>
          <capsuleGeometry args={[0.07, 0.2, 8, 12]} />
        </mesh>

        {/* Elbow accent */}
        <mesh material={accentMat} position={[0, -0.38, 0]}>
          <sphereGeometry args={[0.055, 10, 10]} />
        </mesh>

        {/* Forearm */}
        <mesh material={darkMat} position={[0, -0.52, 0.05]}>
          <capsuleGeometry args={[0.06, 0.16, 8, 12]} />
        </mesh>

        {/* Hand — pointing */}
        <group position={[0, -0.68, 0.08]}>
          <mesh material={bodyMat}>
            <sphereGeometry args={[0.06, 10, 10]} />
          </mesh>
          {/* Finger */}
          <mesh material={jointMat} position={[0, -0.06, 0.06]} rotation={[0.8, 0, 0]}>
            <capsuleGeometry args={[0.018, 0.08, 6, 8]} />
          </mesh>
        </group>
      </group>

      {/* ── LEGS ── */}
      {/* Left leg */}
      <group position={[-0.18, -0.55, 0]}>
        <mesh material={jointMat}>
          <sphereGeometry args={[0.08, 10, 10]} />
        </mesh>
        <mesh material={darkMat} position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.065, 0.2, 8, 12]} />
        </mesh>
        <mesh material={accentMat} position={[0, -0.36, 0]}>
          <sphereGeometry args={[0.045, 8, 8]} />
        </mesh>
        <mesh material={bodyMat} position={[0, -0.52, 0]}>
          <capsuleGeometry args={[0.058, 0.16, 8, 12]} />
        </mesh>
        {/* Foot */}
        <mesh material={darkMat} position={[0, -0.68, 0.04]}>
          <boxGeometry args={[0.12, 0.06, 0.18]} />
        </mesh>
      </group>

      {/* Right leg */}
      <group position={[0.18, -0.55, 0]}>
        <mesh material={jointMat}>
          <sphereGeometry args={[0.08, 10, 10]} />
        </mesh>
        <mesh material={darkMat} position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.065, 0.2, 8, 12]} />
        </mesh>
        <mesh material={accentMat} position={[0, -0.36, 0]}>
          <sphereGeometry args={[0.045, 8, 8]} />
        </mesh>
        <mesh material={bodyMat} position={[0, -0.52, 0]}>
          <capsuleGeometry args={[0.058, 0.16, 8, 12]} />
        </mesh>
        {/* Foot */}
        <mesh material={darkMat} position={[0, -0.68, 0.04]}>
          <boxGeometry args={[0.12, 0.06, 0.18]} />
        </mesh>
      </group>

      {/* ── BACKPACK / JETPACK ACCENT ── */}
      <mesh material={darkMat} position={[0, 0.05, -0.4]}>
        <boxGeometry args={[0.3, 0.4, 0.15]} />
      </mesh>
      <mesh material={accentMat} position={[0, 0.05, -0.48]}>
        <boxGeometry args={[0.22, 0.08, 0.02]} />
      </mesh>
      <mesh material={accentOrangeMat} position={[-0.08, -0.08, -0.48]}>
        <cylinderGeometry args={[0.03, 0.03, 0.04, 8]} />
      </mesh>
      <mesh material={accentOrangeMat} position={[0.08, -0.08, -0.48]}>
        <cylinderGeometry args={[0.03, 0.03, 0.04, 8]} />
      </mesh>
    </group>
  );
};
