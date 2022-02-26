import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import style from './main.module.scss'
import { FirstAnim } from './FirstAnim';
import { Monolith } from './Monolith';

export function TopAnimation() {
  const [pageState, setPageState] = useState({
    first: true,
    mode: 'About'
  })
  const [canvasSize, setCanvasSize] = useState({width: 1000, height: 1000});

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

  // useEffect(() => {
  //   setPosition([(state.x / canvasSize.width - 0.5) * 0.1, (- state.y / canvasSize.height + 0.5) * 0.1, 10]);
  // }, [state, canvasSize]);

  return (
    <main className={style.main}>
      <Canvas>
        <Suspense fallback={null}>
          {/* @ts-ignore */}
          <PerspectiveCamera makeDefault radius={(canvasSize.width + canvasSize.height) / 4} aspect={canvasSize.width / canvasSize.height} fov={45} position={[0, 0, 10]} lookAt={[0, 0, 0]} />
          <FirstAnim first={pageState.first} update={setPageState} />
          <Monolith first={pageState.first} update={setPageState} />
        </Suspense>
      </Canvas>
    </main>
  )
}