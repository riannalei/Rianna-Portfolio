import { useRef, useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function RamenBowl({ position, onAnimationComplete }) {
  const { scene } = useGLTF('/models/ramen_bowl/scene.gltf')
  const bowlRef = useRef()
  const animationProgress = useRef(0)
  const targetPosition = useRef(position)
  const clockRef = useRef(0)
  const randomOffset = useRef(Math.random() * Math.PI * 2) // Random phase offset for variation
  
  // Clone the scene to allow multiple instances
  const clonedScene = useMemo(() => scene.clone(), [scene])

  useEffect(() => {
    // Random target position - in FRONT of the stall and higher up
    const randomX = (Math.random() - 0.5) * 2 // -1.0 to 1.0 (narrower spread to prevent cutoff)
    const randomY = -0.8 + Math.random() * 0.3 // Higher up (-0.8 to -0.5)
    const randomZ = 2 + Math.random() * 0.5 // 2.0 to 2.5 (well in front of stall)
    targetPosition.current = new THREE.Vector3(randomX, randomY, randomZ)
  }, [])

  useFrame((state, delta) => {
    if (!bowlRef.current) return
    
    clockRef.current += delta
    
    // Initial pop-out animation
    if (animationProgress.current < 1) {
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
    } 
    // Continuous floating animation after pop-out completes
    else {
      const time = clockRef.current + randomOffset.current
      
      // Gentle floating motion with random offset for variation
      const floatY = Math.sin(time * 0.7) * 0.08
      const floatX = Math.cos(time * 0.5) * 0.05
      
      bowlRef.current.position.x = targetPosition.current.x + floatX
      bowlRef.current.position.y = targetPosition.current.y + floatY
      bowlRef.current.position.z = targetPosition.current.z + Math.sin(time * 0.4) * 0.03
      
      // Gentle swaying rotation
      bowlRef.current.rotation.y = Math.sin(time * 0.6) * 0.15
      bowlRef.current.rotation.x = Math.cos(time * 0.5) * 0.08
      bowlRef.current.rotation.z = Math.sin(time * 0.8) * 0.05
      
      // Subtle breathing scale
      const breatheScale = 1 + Math.sin(time * 0.5) * 0.02
      bowlRef.current.scale.setScalar(0.5 * breatheScale)
    }
  })

  return (
    <group ref={bowlRef} position={[0, 0, 2]} renderOrder={1000}>
      <primitive object={clonedScene} />
    </group>
  )
}

useGLTF.preload('/models/ramen_bowl/scene.gltf')

export default RamenBowl

