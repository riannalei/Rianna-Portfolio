/*
 * MacBook Pro M3 16 inch 2024 model
 * Based on "macbook pro M3 16 inch 2024" (https://sketchfab.com/3d-models/macbook-pro-m3-16-inch-2024-8e34fc2b303144f78490007d91ff57c4)
 * by jackbaeten (https://sketchfab.com/jackbaeten)
 * licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
 */

import React, { useEffect, useMemo, useRef } from 'react'
import { useGLTF, useVideoTexture } from '@react-three/drei'
import * as THREE from 'three'

export function Model(props) {
  const { scene } = useGLTF('/models/macbook_m3.gltf')
  const screenRef = useRef()

  const videoTexture = useVideoTexture('/textures/project/catcode.mp4', {
    loop: true,
    muted: true,
    start: true,
    crossOrigin: 'anonymous',
  })

  useEffect(() => {
    if (videoTexture) {
      videoTexture.colorSpace = THREE.SRGBColorSpace
      videoTexture.flipY = true
      videoTexture.needsUpdate = true
    }
  }, [videoTexture])

  // Clone the scene to avoid material conflicts
  const clonedScene = useMemo(() => scene.clone(), [scene])

  // Create a custom material for the screen with video texture
  const screenMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: videoTexture,
      toneMapped: false,
      side: THREE.FrontSide,
    })
  }, [videoTexture])

  useEffect(() => {
    // Find the screen mesh and get its world position/rotation
    let screenMesh = null
    clonedScene.traverse((child) => {
      if (child.isMesh && child.name === 'Object_101') {
        screenMesh = child
        // Make the original screen black
        child.material = new THREE.MeshBasicMaterial({ color: 0x000000 })
      }
    })
    
    // Position our custom video plane if we found the screen
    if (screenMesh && screenRef.current) {
      // Get world position of the screen
      const worldPos = new THREE.Vector3()
      const worldRot = new THREE.Quaternion()
      const worldScale = new THREE.Vector3()
      
      screenMesh.getWorldPosition(worldPos)
      screenMesh.getWorldQuaternion(worldRot)
      screenMesh.getWorldScale(worldScale)
      
      screenRef.current.position.copy(worldPos)
      screenRef.current.quaternion.copy(worldRot)
      screenRef.current.position.z += 0.001 // Slightly in front
    }
  }, [clonedScene, screenMaterial])

  return (
    <group {...props}>
      <primitive object={clonedScene} />
      {/* Custom video screen plane - positioned on the laptop screen */}
      {videoTexture && (
        <mesh position={[-0.1, 11.6, -16.5]} rotation={[-0.33, 0, 0]}>
          <planeGeometry args={[34.2, 22.1]} />
          <meshBasicMaterial map={videoTexture} toneMapped={false} />
        </mesh>
      )}
    </group>
  )
}

useGLTF.preload('/models/macbook_m3.gltf')
