import { Suspense, useRef, useState, useCallback, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { RobotModel } from './RobotModel';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RobotSceneProps {
  /** Optional data for future API/JSON-driven reactions */
  data?: Record<string, unknown>;
}

export const RobotScene = ({ data }: RobotSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  // Intersection Observer — only mount Canvas when visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Normalised mouse position (-1 to 1)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePosition({ x, y });
  }, [reducedMotion]);

  // Touch support for mobile
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((touch.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePosition({ x, y });
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[1] pointer-events-auto"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      aria-hidden="true"
    >
      {isVisible && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ pointerEvents: 'none' }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#4af" />

          <Suspense fallback={null}>
            <RobotModel mousePosition={mousePosition} data={data} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};
