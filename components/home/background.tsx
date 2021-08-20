/* eslint-disable react/jsx-props-no-spreading */
import {
  useState, useEffect, Suspense,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { MyCustomEffect } from './PostProcessing/CustomEffect';
import { City } from './Scene/City';
import style from './background.module.scss';

const Effects = ({ progress, aspect }) => {
  const [time, setTime] = useState(0);

  useFrame(() => {
    setTime(time + 0.1);
  });
  return (
    <>
      <EffectComposer multisampling={0} disableNormalPass>
        <MyCustomEffect uniforms={new Map([
          ['progress', { value: progress }],
          ['aspect', { value: aspect }],
          ['time', { value: time }],
        ])}
        />
      </EffectComposer>
    </>
  );
};

const Background = () => {
  const [progress, setProgress] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const onScroll = () => {
      setProgress(
        document.documentElement.scrollTop / (document.body.clientHeight - window.innerHeight),
      );
    };
    const onResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const lists = [];
  for (let i = 0; i < 40; i += 1) lists.push(i);

  return (
    <div
      style={{
        position: 'fixed',
        width: (windowSize?.width || 0),
        height: (windowSize?.height || 0),
        zIndex: -100,
      }}
    >
      <Canvas
        className={style.bg_canvas}
        style={{ position: 'relative' }}
        camera={{
          position: [0, 0, -10], fov: 60, near: 1, far: 100,
        }}
        gl={{
          powerPreference: 'high-performance',
          alpha: false,
          antialias: false,
          stencil: false,
          depth: false,
        }}
      >
        <Suspense fallback={null}>
          <mesh position={[0, 0, 100]}>
            <boxGeometry args={[1000, 1000, 1]} />
            <meshBasicMaterial color={0x000000} />
          </mesh>
          <City progress={progress} />
        </Suspense>
        <Effects progress={progress} aspect={windowSize.width / windowSize.height} />
      </Canvas>
    </div>
  );
};

export default Background;
