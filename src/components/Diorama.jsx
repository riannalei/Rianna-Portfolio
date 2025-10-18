import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

export function Diorama(props) {
  const { scene } = useGLTF('/models/diorama/scene.gltf')

  useEffect(() => {
    // Traverse the scene and ensure all materials are set up properly
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  return <primitive object={scene} {...props} />
}

useGLTF.preload('/models/diorama/scene.gltf')

export default Diorama

