import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export function Diorama(props) {
  const { scene } = useGLTF('/models/diorama/scene.gltf')
  const groupRef = useRef()
  const clockRef = useRef(0)

  useEffect(() => {
    // Traverse the scene and ensure all materials are set up properly
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  // Add gentle floating and rotation animations
  useFrame((state, delta) => {
    if (!groupRef.current) return
    
    clockRef.current += delta
    
    // Gentle floating motion (slower and more subtle than MacBook)
    groupRef.current.position.y = Math.sin(clockRef.current * 0.6) * 0.15
    
    // Very subtle swaying rotation
    groupRef.current.rotation.y = Math.sin(clockRef.current * 0.4) * 0.03
    groupRef.current.rotation.z = Math.cos(clockRef.current * 0.5) * 0.01
    
    // Gentle breathing scale effect
    const scale = 1 + Math.sin(clockRef.current * 0.5) * 0.015
    groupRef.current.scale.setScalar(scale)
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} {...props} />
    </group>
  )
}

useGLTF.preload('/models/diorama/scene.gltf')

export default Diorama

