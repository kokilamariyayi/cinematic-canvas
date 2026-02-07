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

  // Normalised mouse position (-1 to 1) relative to viewport
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (reducedMotion) return;
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePosition({ x, y });
  }, [reducedMotion]);

  // Listen to window-level mouse so the robot reacts even when cursor is over text
  useEffect(() => {
    if (reducedMotion) return;
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, reducedMotion]);

  // Touch support for mobile
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const touch = e.touches[0];
    const x = (touch.clientX / window.innerWidth) * 2 - 1;
    const y = (touch.clientY / window.innerHeight) * 2 - 1;
    setMousePosition({ x, y });
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="absolute right-0 bottom-0 w-[45%] h-[80%] z-[1] pointer-events-none
                 max-md:w-[55%] max-md:h-[50%] max-md:right-[-5%] max-md:bottom-[10%]
                 max-sm:w-[60%] max-sm:h-[45%] max-sm:right-[-8%] max-sm:bottom-[12%]
                 opacity-80 md:opacity-100"
      onTouchMove={handleTouchMove}
      aria-hidden="true"
    >
      {isVisible && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.3, 4], fov: 40 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 4, 5]} intensity={0.9} color="#ffffff" />
          <directionalLight position={[-2, 2, -1]} intensity={0.25} color="#4af" />
          <pointLight position={[0, 0, 3]} intensity={0.3} color="hsl(190, 90%, 50%)" distance={6} />

          <Suspense fallback={null}>
            <RobotModel mousePosition={mousePosition} data={data} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};
