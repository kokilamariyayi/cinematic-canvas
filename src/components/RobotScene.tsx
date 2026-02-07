import { Suspense, useRef, useState, useCallback, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
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

  // Normalised mouse position (-1 to 1) from window
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (reducedMotion) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    },
    [reducedMotion]
  );

  useEffect(() => {
    if (reducedMotion) return;
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, reducedMotion]);

  // Touch support for mobile
  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const touch = e.touches[0];
      const x = (touch.clientX / window.innerWidth) * 2 - 1;
      const y = (touch.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    },
    [reducedMotion]
  );

  if (reducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="absolute right-0 bottom-0 z-[1]
                 w-[50%] h-[75%]
                 md:w-[45%] md:h-[80%]
                 max-sm:w-[55%] max-sm:h-[50%] max-sm:right-[-4%] max-sm:bottom-[8%]"
      onTouchMove={handleTouchMove}
      aria-hidden="true"
    >
      {isVisible && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.5, 4.5], fov: 35 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ pointerEvents: 'none' }}
        >
          {/* Ambient fill */}
          <ambientLight intensity={0.6} />

          {/* Key light — warm from top-right */}
          <directionalLight position={[4, 5, 4]} intensity={1.2} color="#ffffff" />

          {/* Fill light — cool cyan from left */}
          <directionalLight position={[-3, 2, 2]} intensity={0.5} color="#00ccff" />

          {/* Rim / back light for depth */}
          <directionalLight position={[0, 3, -4]} intensity={0.4} color="#6688ff" />

          {/* Subtle accent point light */}
          <pointLight
            position={[0, 1, 3]}
            intensity={0.4}
            color="#00ddff"
            distance={8}
          />

          <Suspense fallback={null}>
            <RobotModel mousePosition={mousePosition} data={data} />
          </Suspense>

          {/* Soft ground shadow */}
          <ContactShadows
            position={[0, -1.1, 0]}
            opacity={0.3}
            scale={6}
            blur={2.5}
          />
        </Canvas>
      )}
    </div>
  );
};
