import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

function Petal({ position, delay = 0, speed = 1 }) {
  const { scene } = useGLTF('/models/petal/scene.gltf')
  const petalRef = useRef()
  const time = useRef(delay)

  useFrame((state, delta) => {
    if (!petalRef.current) return
    
    time.current += delta * speed
    
    // Falling and drifting motion
    const fallSpeed = 0.3
    const driftX = Math.sin(time.current * 0.5) * 2
    const driftZ = Math.cos(time.current * 0.7) * 1.5
    
    // Rotating as it falls
    petalRef.current.rotation.x = time.current * 0.3
    petalRef.current.rotation.y = time.current * 0.5
    petalRef.current.rotation.z = Math.sin(time.current * 0.8) * 0.5
    
    // Position with drift
    petalRef.current.position.x = position[0] + driftX
    petalRef.current.position.y = position[1] - (time.current * fallSpeed) % 20
    petalRef.current.position.z = position[2] + driftZ
    
    // Reset to top when it falls too far (extended to reach text area)
    if (petalRef.current.position.y < -12) {
      time.current = 0
    }
  })

  return (
    <group ref={petalRef} position={position}>
      <primitive object={scene.clone()} />
    </group>
  )
}

export function CherryPetals(props) {
  // Create multiple petals with different starting positions and speeds
  // Extended across the entire screen, especially to the left
  // Starting at different heights so they're visible immediately
  const petals = [
    { position: [-6, 3, 0], delay: 0, speed: 0.8 },
    { position: [-4, 6, -1], delay: 0, speed: 1.0 },
    { position: [-2, 1, 1], delay: 0, speed: 0.9 },
    { position: [1, 8, 2], delay: 0, speed: 1.1 },
    { position: [3, 4, -2], delay: 0, speed: 0.85 },
    { position: [-5, -1, 1], delay: 0, speed: 0.95 },
    { position: [0, 9, 0], delay: 0, speed: 1.05 },
    { position: [-7, 2, -1], delay: 0, speed: 0.9 },
    { position: [2, 5, 1], delay: 0, speed: 1.0 },
    { position: [-3, 7, 0], delay: 0, speed: 0.88 },
  ]

  return (
    <group {...props}>
      {petals.map((petal, index) => (
        <Petal key={index} {...petal} />
      ))}
    </group>
  )
}

useGLTF.preload('/models/petal/scene.gltf')

export default CherryPetals

