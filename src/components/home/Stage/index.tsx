import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Suspense, useEffect, useMemo, useRef, useState, VFC } from 'react'
import { Color, Euler, SpotLight, Vector3 } from 'three'
import monolithSrc from './monolith.glb'
import floorSrc from './floor.glb'

const EffectPlane: VFC<Record<string, any>> = ({...props}) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <mesh {...props}>
      <planeBufferGeometry />
      <meshBasicMaterial transparent color={new Color(1, 0, 0)} opacity={0.5} />
    </mesh>
  )

interface MonolithProps {
  position: Vector3
  rotation: Euler
}
const Monolith: VFC<MonolithProps> = ({position, rotation}) => {
  const monolithOrigin = useLoader(GLTFLoader, monolithSrc);
  const monolith = useMemo(() => monolithOrigin.scene.children[0].clone() || null, [monolithOrigin]);
  const [visible, setVisible] = useState(false)
  
  return (
    <group position={position} rotation={rotation}>
      <EffectPlane visible={visible} position={[-0.6, 0, 0]} rotation={[0, -Math.PI * 0.5, 0]} scale={[2, 0.5, 1]} />
      <EffectPlane visible={visible} position={[-0.4, 0, 0]} rotation={[0, -Math.PI * 0.5, 0]} scale={[2.5, 2.5, 2.5]} />
      <EffectPlane visible={visible} position={[-0.5, 0, 0]} rotation={[0, -Math.PI * 0.5, 0]} scale={[3, 3, 3]} />
      <primitive object={monolith} onClick={() => setVisible(true)} />
    </group>
  )
}

export const Models: VFC<{}> = () => {
  const floor = useLoader(GLTFLoader, floorSrc)
  const lightRef = useRef<SpotLight>(null)
  
  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.position.set(0, 6, 0)
      lightRef.current.lookAt(0, 0, 0)
    }
  }, [])
  return (
    <>
      <Monolith position={useMemo(() => new Vector3(-1.2955, 1.3, -4.2001), [])} rotation={useMemo(() => new Euler(0, 0, -0.210), [])} />
      <Monolith position={useMemo(() => new Vector3(3.794, 1.669, -3.1085), [])} rotation={useMemo(() => new Euler(-0.150, 0.280, 0.310), [])} />
      <Monolith position={useMemo(() => new Vector3(2.8337, 0.33942, 2.6606), [])} rotation={useMemo(() => new Euler(0.300, 0.340, -1.060), [])} />
      <primitive object={floor.scene}/>
      <spotLight ref={lightRef} castShadow angle={Math.PI / 3} penumbra={0.3} decay={300} intensity={1} distance={1000} />
    </>
  )
}

export const Stage: VFC<{}> = () => (
    <group>
      <Suspense fallback={null}>
        <Models />
      </Suspense>
    </group>
  )