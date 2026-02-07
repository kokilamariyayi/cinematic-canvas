import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface RobotModelProps {
  mousePosition: { x: number; y: number };
  /** Optional JSON data the robot can react to in the future */
  data?: Record<string, unknown>;
}

export const RobotModel = ({ mousePosition, data }: RobotModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/models/RobotExpressive.glb');
  const { actions, mixer } = useAnimations(animations, groupRef);

  // Play idle animation on mount
  useEffect(() => {
    // Try common animation names
    const idleAction =
      actions['Idle'] ?? actions['idle'] ?? actions['Standing'] ?? Object.values(actions)[0];
    if (idleAction) {
      idleAction.reset().fadeIn(0.5).play();
      idleAction.setLoop(THREE.LoopRepeat, Infinity);
      idleAction.timeScale = 0.8; // Slightly slower for a calm feel
    }
    return () => {
      mixer.stopAllAction();
    };
  }, [actions, mixer]);

  // Future: React to data changes (e.g., trigger wave, thumbs up)
  useEffect(() => {
    if (!data) return;
    // Structure for future API/JSON reactions:
    // if (data.mood === 'happy') triggerAnimation('ThumbsUp');
    // if (data.greeting) triggerAnimation('Wave');
  }, [data, actions]);

  // Subtle mouse-based rotation + breathing idle motion
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Gentle breathing / hover
    groupRef.current.position.y = -1.1 + Math.sin(t * 1.2) * 0.04;

    // Mouse-based body rotation (subtle, smooth lerp)
    const targetRotationY = mousePosition.x * 0.3;
    const targetRotationX = mousePosition.y * -0.08;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX,
      0.04
    );
  });

  // Tint the model to match the dark-cyan theme
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.envMapIntensity = 1.5;
          mesh.material = mat;
        }
      }
    });
  }, [scene]);

  return (
    <group ref={groupRef} position={[0, -1.1, 0]} scale={0.9} dispose={null}>
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload('/models/RobotExpressive.glb');
