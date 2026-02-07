import { useRef, useEffect, useMemo } from 'react';
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

  // Clone the scene so multiple instances don't conflict
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Play idle animation on mount
  useEffect(() => {
    const idleAction = actions['Idle'] || actions['idle'];
    if (idleAction) {
      idleAction.reset().fadeIn(0.5).play();
      idleAction.setLoop(THREE.LoopRepeat, Infinity);
    }

    return () => {
      mixer.stopAllAction();
    };
  }, [actions, mixer]);

  // Future: React to data changes (e.g., trigger wave, thumbs up)
  useEffect(() => {
    if (!data) return;
    // Structure for future API/JSON reactions:
    // if (data.mood === 'happy') { actions['ThumbsUp']?.play(); }
    // if (data.greeting) { actions['Wave']?.play(); }
  }, [data, actions]);

  // Subtle mouse-based rotation + breathing idle motion
  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // Breathing: gentle Y oscillation
    groupRef.current.position.y = -1.5 + Math.sin(time * 1.2) * 0.05;

    // Mouse-based rotation (subtle, clamped)
    const targetRotationY = mousePosition.x * 0.3;
    const targetRotationX = mousePosition.y * -0.1;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX,
      0.05
    );
  });

  return (
    <group ref={groupRef} position={[0, -1.5, 0]} scale={0.8} dispose={null}>
      <primitive object={clonedScene} />
    </group>
  );
};

// Preload the model
useGLTF.preload('/models/RobotExpressive.glb');
