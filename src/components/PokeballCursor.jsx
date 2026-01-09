import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

// Pokéball 3D Model Component
function PokeballModel({ mousePos }) {
  const { scene } = useGLTF('/models/poke_ball/scene.gltf');
  const groupRef = useRef();
  const clockRef = useRef(0);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = false;
        child.receiveShadow = false;
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    clockRef.current += delta;
    
    // Keep front facing forward - rotate around Z axis instead of Y for subtle tilt
    groupRef.current.rotation.z = Math.sin(clockRef.current * 2) * 0.15;
    groupRef.current.rotation.x = Math.sin(clockRef.current * 2) * 0.1;
    // Keep Y rotation minimal to keep front visible
    groupRef.current.rotation.y = Math.sin(clockRef.current * 1.5) * 0.2;
    
    // Subtle floating
    groupRef.current.position.y = Math.sin(clockRef.current * 3) * 0.05;
  });

  return (
    <group ref={groupRef} scale={0.25} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/models/poke_ball/scene.gltf');

// Subtle sparkles component that gently orbit around the Pokéball
function Sparkles() {
  const sparklesRef = useRef();
  const clockRef = useRef(0);
  const sparkleCount = 6;
  
  const sparkles = Array.from({ length: sparkleCount }, (_, i) => ({
    angle: (i / sparkleCount) * Math.PI * 2,
    speed: 0.3 + (i % 2) * 0.15,
    radius: 0.4 + (i % 2) * 0.1,
    size: 0.015 + (i % 2) * 0.008,
  }));

  useFrame((state, delta) => {
    if (!sparklesRef.current) return;
    clockRef.current += delta;
    
    sparkles.forEach((sparkle, i) => {
      const child = sparklesRef.current.children[i];
      if (child) {
        const angle = sparkle.angle + clockRef.current * sparkle.speed;
        child.position.x = Math.cos(angle) * sparkle.radius;
        child.position.y = Math.sin(angle) * sparkle.radius;
        child.position.z = Math.sin(clockRef.current * 1.5 + i) * 0.05;
        
        // Gentle twinkling with visible but subtle opacity
        const opacity = 0.4 + Math.sin(clockRef.current * 2.5 + i) * 0.25;
        child.material.opacity = opacity;
      }
    });
  });

  return (
    <group ref={sparklesRef}>
      {sparkles.map((sparkle, i) => (
        <mesh key={i} position={[Math.cos(sparkle.angle) * sparkle.radius, Math.sin(sparkle.angle) * sparkle.radius, 0]}>
          <sphereGeometry args={[sparkle.size, 8, 8]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#E8F4FF"
            emissiveIntensity={0.5}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

const PokeballCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Check if device supports hover (desktop) vs touch-only (mobile)
    const checkIsMobile = () => {
      const hasHover = window.matchMedia('(hover: hover)').matches;
      const hasPointer = window.matchMedia('(pointer: fine)').matches;
      return !hasHover || !hasPointer || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    setIsMobile(checkIsMobile());

    const updateMousePos = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    if (!checkIsMobile()) {
      window.addEventListener('mousemove', updateMousePos);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', updateMousePos);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Don't render cursor on mobile devices
  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] transition-opacity duration-300"
      style={{
        left: mousePos.x,
        top: mousePos.y,
        transform: 'translate(-40px, -20px)',
        opacity: isVisible ? 1 : 0,
        width: '120px',
        height: '120px',
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 2], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        onCreated={({ gl }) => {
          gl.domElement.style.pointerEvents = 'none';
        }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, 5, 5]} intensity={1.0} />
        <pointLight position={[0, 0, 5]} intensity={1.2} />
        <PokeballModel mousePos={mousePos} />
        <Sparkles />
      </Canvas>
    </div>
  );
};

export default PokeballCursor;
