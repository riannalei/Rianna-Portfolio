/*
 * MacBook Pro M3 16 inch 2024 model - Project Display Version
 * Based on "macbook pro M3 16 inch 2024" (https://sketchfab.com/3d-models/macbook-pro-m3-16-inch-2024-8e34fc2b303144f78490007d91ff57c4)
 * by jackbaeten (https://sketchfab.com/jackbaeten)
 * licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
 */

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useGLTF, useVideoTexture } from '@react-three/drei'
import * as THREE from 'three'

export function ProjectMacbook({ texture, ...props }) {
  const { scene } = useGLTF('/models/macbook_m3.gltf')
  const [videoTexture, setVideoTexture] = useState(null)
  const [isReady, setIsReady] = useState(false)

  // Load video texture
  useEffect(() => {
    if (!texture) return
    
    setIsReady(false)

    const video = document.createElement('video')
    video.src = texture
    video.crossOrigin = 'anonymous'
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.preload = 'auto'
    
    const vidTexture = new THREE.VideoTexture(video)
    vidTexture.colorSpace = THREE.SRGBColorSpace
    vidTexture.flipY = true
    vidTexture.needsUpdate = true
    
    // Wait for video to be ready before showing
    video.addEventListener('loadeddata', () => {
      setIsReady(true)
    })
    
    // Set texture immediately
    setVideoTexture(vidTexture)
    
    // Play video
    video.play().catch(err => console.log('Video play error:', err))
    
    return () => {
      video.pause()
      video.src = ''
      vidTexture.dispose()
    }
  }, [texture])

  // Clone the scene to avoid material conflicts
  const clonedScene = useMemo(() => scene.clone(), [scene])

  // Custom shader material for rounded corners
  const screenMaterial = useMemo(() => {
    if (!videoTexture) return null
    
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: videoTexture },
        uRadius: { value: 0.02 }, // Adjust this for corner roundness (0.0 - 0.5)
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 centerPos, vec2 size, float radius) {
          return length(max(abs(centerPos) - size + radius, 0.0)) - radius;
        }
        
        void main() {
          vec2 center = vUv - 0.5;
          float dist = roundedBoxSDF(center, vec2(0.5), uRadius);
          float smoothAlpha = 1.0 - smoothstep(-0.005, 0.005, dist);
          
          vec4 texColor = texture2D(uTexture, vUv);
          gl_FragColor = vec4(texColor.rgb, texColor.a * smoothAlpha);
          
          // Discard fully transparent pixels
          if (gl_FragColor.a < 0.01) discard;
        }
      `,
      transparent: true,
      side: THREE.FrontSide,
      toneMapped: false,
    })
  }, [videoTexture])

  useEffect(() => {
    // Find the screen mesh and make it black
    clonedScene.traverse((child) => {
      if (child.isMesh && child.name === 'Object_101') {
        child.material = new THREE.MeshBasicMaterial({ color: 0x000000 })
      }
    })
  }, [clonedScene])

  // Don't render until video is ready
  if (!isReady) {
    return null
  }

  return (
    <group {...props}>
      <primitive object={clonedScene} />
      {/* Custom video screen plane with rounded corners */}
      {videoTexture && screenMaterial && (
        <mesh position={[0.12, 11.6, -16.5]} rotation={[-0.33, 0, 0]}>
          <planeGeometry args={[34.2, 22.1]} />
          <primitive object={screenMaterial} attach="material" />
        </mesh>
      )}
    </group>
  )
}

useGLTF.preload('/models/macbook_m3.gltf')

export default ProjectMacbook

