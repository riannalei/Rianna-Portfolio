import React, { useEffect } from 'react'
import { useGLTF, useVideoTexture } from '@react-three/drei'
import * as THREE from 'three'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/model.gltf')

  const videoTexture = useVideoTexture('/textures/project/catcode.mp4', {
    loop: true,
    muted: true,
    start: true,
    crossOrigin: 'anonymous',
  })

  useEffect(() => {
    if (videoTexture) {
      videoTexture.encoding = THREE.sRGBEncoding
      videoTexture.flipY = true // fix upside down
      videoTexture.needsUpdate = true
    }
  }, [videoTexture])

  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.519, 0]} scale={0.103}>
        {/* MacBook Base */}
        <mesh geometry={nodes.Circle001.geometry} material={materials['Frame.001']} />
        <mesh geometry={nodes.Circle001_1.geometry} material={materials['Frame.001']} />
        <mesh geometry={nodes.Circle001_2.geometry} material={materials.HeadPhoneHole} />
        <mesh geometry={nodes.Circle001_3.geometry} material={materials.USB_C_INSIDE} />
        <mesh geometry={nodes.Circle001_4.geometry} material={materials['Frame.001']} />
        <mesh geometry={nodes.Circle001_5.geometry} material={materials.TouchbarBorder} />
        <mesh geometry={nodes.Circle001_6.geometry} material={materials.Keyboard} />

        {/* Bottom Group */}
        <group position={[0, -0.509, 0]} scale={5.796}>
          <mesh geometry={nodes.Circle006.geometry} material={materials['Frame.001']} />
          <mesh geometry={nodes.Circle006_1.geometry} material={materials.USB_C_INSIDE} />
        </group>

        {/* Misc */}
        <mesh
          geometry={nodes.FrontCameraRing001.geometry}
          material={materials['CameraRIngBlack.002']}
          position={[-0.155, 19.571, -16.151]}
          scale={5.796}
        />

        {/* Keyboard */}
        <group position={[-11.786, -0.15, -8.301]} scale={5.796}>
          <mesh geometry={nodes.Circle.geometry} material={materials['Keyboard.001']} />
          <mesh geometry={nodes.Circle_1.geometry} material={materials.Key} />
          <mesh geometry={nodes.Circle_2.geometry} material={materials.Touchbar} />
        </group>
        <mesh
          geometry={nodes.KeyboardKeyHole.geometry}
          material={materials['Keyboard.001']}
          position={[-11.786, -0.152, -8.301]}
          scale={5.796}
        />

        <mesh
          geometry={nodes.RubberFoot.geometry}
          material={materials.DarkRubber}
          position={[-11.951, -0.751, 7.857]}
          scale={5.796}
        />

        {/* Hinge */}
        <group position={[0.011, -0.211, -10.559]} scale={5.796}>
          <mesh geometry={nodes.Circle012.geometry} material={materials.HingeBlack} />
          <mesh geometry={nodes.Circle012_1.geometry} material={materials.HingeMetal} />
        </group>

        {/* Speakers */}
        <group position={[-15.026, 0.031, 0.604]} scale={5.796}>
          <mesh geometry={nodes.Circle009.geometry} material={materials['Frame.001']} />
          <mesh geometry={nodes.Circle009_1.geometry} material={materials.SpeakerHole} />
        </group>
        <group position={[12.204, 0.031, 0.604]} scale={5.796}>
          <mesh geometry={nodes.Circle003.geometry} material={materials['Frame.001']} />
          <mesh geometry={nodes.Circle003_1.geometry} material={materials.SpeakerHole} />
        </group>

        {/* 📺 Screen Group */}
        <group position={[0.007, -0.472, -10.412]} rotation={[1.311, 0, 0]} scale={5.796}>
          {/* Lid Frame */}
          <mesh geometry={nodes.Circle002.geometry} material={materials['Frame.001']} />
          <mesh geometry={nodes.Circle002_3.geometry} material={materials.Rubber} />
          <mesh
            geometry={nodes.AppleLogo000.geometry}
            material={materials['AppleLogo.004']}
            position={[0.005, -0.111, -1.795]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={0.579}
          />

          {/* ✅ Video screen plane fixed */}
          <mesh
  position={[0, 0.1, -1.90]}        // 🆙 Raise it just a touch
  rotation={[-Math.PI / 2.0, 0, 0]} // 🔁 Slightly adjust tilt back
  scale={[4.8, 2.9, 1]}             // 🪞 Slight width trim
>
  <planeGeometry args={[1, 1]} />
  <meshBasicMaterial
    map={videoTexture}
    toneMapped={false}
    side={THREE.FrontSide}
    transparent
  />
</mesh>


        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/model.gltf')
