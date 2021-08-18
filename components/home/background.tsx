/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  EffectComposer,
} from '@react-three/postprocessing';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'

import { BlendFunction, Resizer, KernelSize } from 'postprocessing';
import { City } from './Scene/City';
import style from './background.module.scss';

const Sun = (props) => (
  <mesh {...props} position={[0, 2, -40]}>
    <sphereGeometry args={[1, 36, 36]} />
    <meshBasicMaterial color="#00FF00" />
  </mesh>
);

const Effects = () => {
  const sunRef = useRef();
  return (
    <>
      <Sun ref={sunRef} />
      {sunRef.current && (
        <EffectComposer multisampling={0}>
          <ShaderPass
            attachArray="passes"
            args={[FXAAShader]}
            renderToScreen
          />
        </EffectComposer>
      )}
    </>
  );
};

const Background = () => {
  const [progress, setProgress] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  // const mesh = useRef();
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
        // transform: 'scale(2.0)',
        // transformOrigin: 'top left',
      }}
    >
      <Canvas
        className={style.bg_canvas}
        style={{ position: 'relative' }}
        camera={{
          position: [0, 0, -10], fov: 60, near: 0.0001, far: 100,
        }}
      >
        <City progress={progress} />
        <Effects />
        {/* <EffectComposer>
          <DepthOfField focusDistance={20} focalLength={0.02} bokehScale={2} height={480} />
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
          <Noise opacity={0.02} />
        </EffectComposer> */}
      </Canvas>
    </div>
  );
};

export default Background;
