import React, { useEffect, useRef } from 'react';
import { useGraph } from '@react-three/fiber';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

const SkinnedMeshComponent = ({ node, material }) => {
        return (
            <skinnedMesh
                geometry={node.geometry}
                material={material}
                skeleton={node.skeleton}
                morphTargetDictionary={node.morphTargetDictionary}
                morphTargetInfluences={node.morphTargetInfluences}
            />
        );
};

const Developer = ({ animationName = 'idle', ...props }) => {
        const group = useRef();

        // Load the GLTF model
        const { scene } = useGLTF('/models/animations/developer.glb');
        const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
        const { nodes, materials } = useGraph(clone);

        // Load FBX animations and set names
        const { animations: idleAnimation } = useFBX('models/animations/Sad Idle.fbx');
        idleAnimation[0].name = 'idle';

        const { animations: saluteAnimation } = useFBX('/models/animations/salute.fbx');
        saluteAnimation[0].name = 'salute';

        const { animations: clappingAnimation } = useFBX('/models/animations/clapping.fbx');
        clappingAnimation[0].name = 'clapping';

        // Bind animations to group
        const { actions } = useAnimations(
            [idleAnimation[0], saluteAnimation[0], clappingAnimation[0]],
            group
        );

        // Apply animations
        useEffect(() => {
                if (!actions) return;

                // Stop all animations first to avoid conflicts
                Object.values(actions).forEach((action) => {
                        if (action.isRunning()) {
                                action.stop();
                        }
                });

                // Play the requested animation
                const action = actions[animationName];
                if (action) {
                        console.log(`Playing animation: ${animationName}`);
                        action.reset().fadeIn(0.5).play();
                        return () => {
                                console.log(`Stopping animation: ${animationName}`);
                                action.fadeOut(0.5);
                        };
                } else {
                        console.warn(`Animation "${animationName}" not found.`);
                }
        }, [animationName, actions]);

        return (
            <group ref={group} {...props} dispose={null}>
                    <primitive object={nodes.Hips} />
                    <SkinnedMeshComponent node={nodes.EyeLeft} material={materials.Wolf3D_Eye} />
                    <SkinnedMeshComponent node={nodes.EyeRight} material={materials.Wolf3D_Eye} />
                    <SkinnedMeshComponent node={nodes.Wolf3D_Head} material={materials.Wolf3D_Skin} />
                    <SkinnedMeshComponent node={nodes.Wolf3D_Teeth} material={materials.Wolf3D_Teeth} />
                    <SkinnedMeshComponent node={nodes.Wolf3D_Hair} material={materials.Wolf3D_Hair} />
                    <SkinnedMeshComponent node={nodes.Wolf3D_Body} material={materials.Wolf3D_Body} />
                    <SkinnedMeshComponent node={nodes.Wolf3D_Outfit_Bottom} material={materials.Wolf3D_Outfit_Bottom} />
                    <SkinnedMeshComponent node={nodes.Wolf3D_Outfit_Footwear} material={materials.Wolf3D_Outfit_Footwear} />
                    <SkinnedMeshComponent node={nodes.Wolf3D_Outfit_Top} material={materials.Wolf3D_Outfit_Top} />
            </group>
        );
};

useGLTF.preload('/models/animations/developer.glb');

export default Developer;
