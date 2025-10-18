import { useRef, useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function RamenBowl({ position, onAnimationComplete }) {
  const { scene } = useGLTF('/models/ramen_bowl/scene.gltf')
  const bowlRef = useRef()
  const animationProgress = useRef(0)
  const targetPosition = useRef(position)
  
  // Clone the scene to allow multiple instances
  const clonedScene = useMemo(() => scene.clone(), [scene])

  useEffect(() => {
    // Random target position - in FRONT of the stall and higher up
    const randomX = (Math.random() - 0.5) * 3 // -1.5 to 1.5 (spread out horizontally)
    const randomY = -0.8 + Math.random() * 0.3 // Higher up (-0.8 to -0.5)
    const randomZ = 2 + Math.random() * 0.5 // 2.0 to 2.5 (well in front of stall)
    targetPosition.current = new THREE.Vector3(randomX, randomY, randomZ)
  }, [])

  useFrame((state, delta) => {
    if (!bowlRef.current || animationProgress.current >= 1) return
    
    animationProgress.current += delta * 2 // Animation speed
    
    if (animationProgress.current > 1) {
      animationProgress.current = 1
      if (onAnimationComplete) onAnimationComplete()
    }
    
    // Ease out cubic for smooth deceleration
    const easeProgress = 1 - Math.pow(1 - animationProgress.current, 3)
    
    // Pop out from center (0, 0, 0) to target position
    bowlRef.current.position.lerpVectors(
      new THREE.Vector3(0, 0, 0),
      targetPosition.current,
      easeProgress
    )
    
    // Add a little bounce scale effect
    const bounceScale = 1 + Math.sin(animationProgress.current * Math.PI) * 0.3
    bowlRef.current.scale.setScalar(0.5 * bounceScale)
    
    // Gentle rotation as it pops out
    bowlRef.current.rotation.y = animationProgress.current * Math.PI * 2
  })

  return (
    <group ref={bowlRef} position={[0, 0, 2]} renderOrder={1000}>
      <primitive object={clonedScene} />
    </group>
  )
}

useGLTF.preload('/models/ramen_bowl/scene.gltf')

export default RamenBowl

