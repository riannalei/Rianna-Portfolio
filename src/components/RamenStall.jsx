import { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function RamenStall({ scale = 1, ...props }) {
  const { scene } = useGLTF('/models/ramen_stall/scene.gltf')
  const stallRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  const baseScale = Array.isArray(scale) ? scale[0] : scale

  useFrame((state) => {
    if (!stallRef.current) return
    
    // Subtle bobbing animation to indicate interactivity
    const bobAmount = Math.sin(state.clock.elapsedTime * 1.5) * 0.02
    
    if (hovered) {
      stallRef.current.scale.setScalar(baseScale * 1.01)
      stallRef.current.position.y = props.position[1] + bobAmount
    } else {
      stallRef.current.scale.setScalar(baseScale)
      stallRef.current.position.y = props.position[1] + bobAmount
    }
  })

  return (
    <group 
      ref={stallRef} 
      {...props} 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={scene.clone()} />
    </group>
  )
}

useGLTF.preload('/models/ramen_stall/scene.gltf')

export default RamenStall

