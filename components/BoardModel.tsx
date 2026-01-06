import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

// Augment React's JSX namespace to support Three.js elements
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      meshPhysicalMaterial: any;
      cylinderGeometry: any;
      planeGeometry: any;
      meshBasicMaterial: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
    }
  }
}

// Augment global JSX namespace as a fallback
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      meshPhysicalMaterial: any;
      cylinderGeometry: any;
      planeGeometry: any;
      meshBasicMaterial: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
    }
  }
}

// --- Sub-components for PCB Parts ---

const PinHeader = ({ position, count = 8, side = 'left' }: { position: [number, number, number], count?: number, side?: 'left' | 'right' }) => {
  // Create an array of pins
  const pins = Array.from({ length: count });
  const plasticColor = "#111";
  const metalColor = "#FFD700"; // Gold

  return (
    <group position={position}>
        {/* Plastic Base */}
        <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.25, 0.2, count * 0.254]} />
            <meshStandardMaterial color={plasticColor} roughness={0.8} />
        </mesh>
        
        {/* Pins */}
        {pins.map((_, i) => (
            <mesh key={i} position={[0, 0.1, (i - count / 2) * 0.254 + 0.127]}>
                <boxGeometry args={[0.05, 0.6, 0.05]} />
                <meshStandardMaterial color={metalColor} metalness={1} roughness={0.2} />
            </mesh>
        ))}
    </group>
  );
};

const Chip = ({ position, size, rotation = 0, label }: { position: [number, number, number], size: [number, number, number], rotation?: number, label?: string }) => {
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            {/* Body */}
            <mesh position={[0, size[1]/2, 0]}>
                <boxGeometry args={size} />
                <meshStandardMaterial color="#151515" roughness={0.3} />
            </mesh>
            {/* Legs (Simulated with simple texture or geometry, using geometry here for 3D feel) */}
            <mesh position={[size[0]/2 + 0.02, 0, 0]}>
                 <boxGeometry args={[0.05, 0.05, size[2] * 0.8]} />
                 <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[-size[0]/2 - 0.02, 0, 0]}>
                 <boxGeometry args={[0.05, 0.05, size[2] * 0.8]} />
                 <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
            </mesh>
             <mesh position={[0, 0, size[2]/2 + 0.02]} rotation={[0, Math.PI/2, 0]}>
                 <boxGeometry args={[0.05, 0.05, size[0] * 0.8]} />
                 <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0, -size[2]/2 - 0.02]} rotation={[0, Math.PI/2, 0]}>
                 <boxGeometry args={[0.05, 0.05, size[0] * 0.8]} />
                 <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
            </mesh>
        </group>
    )
}

const SMDComponent = ({ position, rotation = 0, type = 'resistor' }: { position: [number, number, number], rotation?: number, type?: 'resistor' | 'capacitor' }) => {
    const color = type === 'resistor' ? '#000' : '#8B4513'; // Black for resistor, brown for cap
    return (
        <mesh position={position} rotation={[0, rotation, 0]}>
            <boxGeometry args={[0.08, 0.04, 0.04]} />
            <meshStandardMaterial color={color} />
            {/* End caps */}
            <mesh position={[0.05, 0, 0]}>
                <boxGeometry args={[0.02, 0.04, 0.04]} />
                <meshStandardMaterial color="#silver" metalness={1} roughness={0.1} />
            </mesh>
            <mesh position={[-0.05, 0, 0]}>
                <boxGeometry args={[0.02, 0.04, 0.04]} />
                <meshStandardMaterial color="#silver" metalness={1} roughness={0.1} />
            </mesh>
        </mesh>
    )
}

const USBPort = ({ position }: { position: [number, number, number] }) => {
    return (
        <group position={position}>
            <mesh position={[0, 0.15, 0]}>
                <boxGeometry args={[0.9, 0.25, 0.6]} />
                <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.15, 0.31]}>
                 <boxGeometry args={[0.8, 0.1, 0.05]} />
                 <meshStandardMaterial color="#000" />
            </mesh>
        </group>
    )
}

const BoardMesh = (props: any) => {
  const boardRef = useRef<THREE.Group>(null);
  
  // Slow rotation
  useFrame((state) => {
    if (boardRef.current && !props.isInteracting) {
        boardRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={boardRef} {...props}>
      {/* PCB Substrate */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 0.08, 4.5]} />
        {/* DarkLight brand color: Dark Grey/Black PCB */}
        <meshPhysicalMaterial 
            color="#111111" 
            roughness={0.4} 
            metalness={0.1} 
            clearcoat={0.5}
            clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Mounting Holes */}
      {[[-1.1, 0, -2.1], [1.1, 0, -2.1], [-1.1, 0, 2.1], [1.1, 0, 2.1]].map((pos, i) => (
          <mesh key={i} position={[pos[0], 0, pos[2]] as [number, number, number]}>
               <cylinderGeometry args={[0.12, 0.12, 0.1, 16]} />
               <meshStandardMaterial color="#b87333" metalness={1} roughness={0.3} /> {/* Copper/Gold rim */}
          </mesh>
      ))}

      {/* Pin Headers (Left and Right) */}
      <PinHeader position={[-1.1, 0.04, 0]} count={16} />
      <PinHeader position={[1.1, 0.04, 0]} count={16} />
      {/* Bottom header */}
      <group position={[0, 0.04, 2.1]} rotation={[0, Math.PI/2, 0]}>
         <PinHeader position={[0,0,0]} count={8} />
      </group>

      {/* Main MCU (Center) */}
      <Chip position={[0, 0.04, 0]} size={[0.8, 0.1, 0.8]} rotation={Math.PI / 4} />
      
      {/* Power Regulator / Chip (Top) */}
      <Chip position={[0.5, 0.04, -1.2]} size={[0.4, 0.1, 0.3]} />
      
      {/* USB-UART Bridge */}
      <Chip position={[-0.4, 0.04, -1.2]} size={[0.3, 0.08, 0.3]} />

      {/* USB Connector */}
      <USBPort position={[0, 0.04, -2.2]} />

      {/* Crystal Oscillator */}
      <mesh position={[0.4, 0.08, 0.5]}>
          <boxGeometry args={[0.3, 0.1, 0.15]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Reset Button */}
      <group position={[-0.8, 0.08, 1.5]}>
          <mesh position={[0, 0.05, 0]}>
              <boxGeometry args={[0.2, 0.1, 0.2]} />
              <meshStandardMaterial color="#silver" />
          </mesh>
           <mesh position={[0, 0.12, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.1]} />
              <meshStandardMaterial color="#white" />
          </mesh>
      </group>

      {/* Random SMDs for realism */}
      <SMDComponent position={[0.2, 0.06, -0.5]} />
      <SMDComponent position={[0.3, 0.06, -0.5]} />
      <SMDComponent position={[-0.2, 0.06, 0.6]} type="capacitor" />
      <SMDComponent position={[-0.3, 0.06, 0.6]} type="capacitor" />
      <SMDComponent position={[0.8, 0.06, 0.2]} rotation={Math.PI/2} />
      
      {/* Status LEDs */}
      <mesh position={[-0.9, 0.06, -1.5]}>
          <boxGeometry args={[0.05, 0.02, 0.05]} />
          <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
      </mesh>
       <mesh position={[-0.9, 0.06, -1.4]}>
          <boxGeometry args={[0.05, 0.02, 0.05]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0} />
      </mesh>

      {/* Silk Screen Lines (Simple geometry for visuals) */}
      <mesh position={[0, 0.041, -0.8]} rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[1, 0.02]} />
          <meshBasicMaterial color="#fff" opacity={0.5} transparent />
      </mesh>
       <mesh position={[0, 0.041, 0.9]} rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[1, 0.02]} />
          <meshBasicMaterial color="#fff" opacity={0.5} transparent />
      </mesh>

    </group>
  );
};

export const BoardModel: React.FC = () => {
    const [isInteracting, setInteracting] = React.useState(false);

    return (
        <div className="w-full h-full relative">
            <Canvas shadows camera={{ position: [4, 4, 4], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1000} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={500} color="#2dd4bf" /> {/* Teal reflection */}
                
                <Environment preset="city" />
                
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <BoardMesh isInteracting={isInteracting} />
                </Float>
                
                <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
                
                <OrbitControls 
                    enablePan={false} 
                    minDistance={3} 
                    maxDistance={10}
                    onStart={() => setInteracting(true)}
                    onEnd={() => setInteracting(false)}
                />
            </Canvas>
            
            <div className="absolute bottom-4 left-4 pointer-events-none">
                <div className="bg-gray-900/80 backdrop-blur border border-gray-700 p-3 rounded-lg text-xs text-gray-300">
                    <p className="font-bold text-white mb-1">DarkLight Core v2</p>
                    <p>Interactive 3D Preview</p>
                    <p className="text-gray-500 mt-1">Left Click: Rotate • Scroll: Zoom</p>
                </div>
            </div>
        </div>
    );
};
