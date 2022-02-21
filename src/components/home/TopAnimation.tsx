import React, { useEffect, useRef, useState, VFC } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useSpring, animated, SpringValue } from '@react-spring/three';
import style from './main.module.scss'



const AlphaPlane: VFC<{position: SpringValue<number[]>}> = ({position}) => {
  const meshRef = useRef(null);

  useFrame(() => {
    meshRef.current.rotation.z += Math.PI / 450;
  })

  return (
    // @ts-ignore
    <animated.mesh ref={meshRef} position={position}>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial color="pink" />
    </animated.mesh>
  )
};

const useMove = () => {
  const [state, setState] = useState({x: 0, y: 0})

  const handleMouseMove = e => {
    e.persist()
    setState(_state => ({..._state, x: e.clientX, y: e.clientY}))
  }
  return {
    state,
    handleMouseMove,
  }
}

export const TopAnimation = () => {
  const [pageState, setPageState] = useState({
    first: false,
    mode: 'About'
  })
  const [canvasSize, setCanvasSize] = useState({width: 1000, height: 1000});
  const {state, handleMouseMove} = useMove();
  const [position, setPosition] = useState([0, 0, 10]);

  useEffect(() => {
    if(!window) return;
    const resizeHandler = () => {
      setCanvasSize({width: window.innerWidth, height: window.innerHeight})
    }

    resizeHandler();

    window.addEventListener('resize', resizeHandler);
    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
  }, [])

  useEffect(() => {
    setPosition([state.x / canvasSize.width - 0.5, - state.y / canvasSize.height + 0.5, 10]);
  }, [state, canvasSize]);

  const { position: facePos } = useSpring({from: {position: [0, 0, 20]}, to: {position:  [0, 0, 0]}});

  return (
    <main className={style.main} onMouseMove={handleMouseMove}>
      <Canvas>
        {/* @ts-ignore */}
      <PerspectiveCamera makeDefault radius={(canvasSize.width + canvasSize.height) / 4} aspect={canvasSize.width / canvasSize.height} fov={45} position={position} lookAt={[0, 0, 0]} />
        <AlphaPlane position={facePos} />
      </Canvas>
    </main>
  )
}