import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import style from './main.module.scss'
import { FirstAnim } from './FirstAnim';
import { Monolith } from './Monolith';

const useMove = () => {
  const [state, setState] = useState({x: 500, y: 500})

  const handleMouseMove = e => {
    e.persist()
    setState(_state => ({..._state, x: e.clientX, y: e.clientY}))
  }
  return {
    state,
    handleMouseMove,
  }
}

export function TopAnimation() {
  const [pageState, setPageState] = useState({
    first: true,
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
    setPosition([(state.x / canvasSize.width - 0.5) * 0.1, (- state.y / canvasSize.height + 0.5) * 0.1, 10]);
  }, [state, canvasSize]);

  return (
    <main className={style.main} onMouseMove={handleMouseMove}>
      <Canvas>
        {/* @ts-ignore */}
        <PerspectiveCamera makeDefault radius={(canvasSize.width + canvasSize.height) / 4} aspect={canvasSize.width / canvasSize.height} fov={45} position={position} lookAt={[0, 0, 0]} />
        <FirstAnim first={pageState.first} update={setPageState} />
        <Monolith first={pageState.first} update={setPageState} />
      </Canvas>
    </main>
  )
}