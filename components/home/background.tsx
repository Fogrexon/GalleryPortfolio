/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import {
  EffectComposer, DepthOfField, Bloom, Noise, Vignette,
} from '@react-three/postprocessing';
import { Mesh } from 'three';
import { Box } from './Scene/Box';
import style from './background.module.scss';

const Camera = (props) => {
  const ref = useRef();
  const { setDefaultCamera } = useThree();
  useEffect(() => setDefaultCamera(ref.current), []);
  useFrame(() => (ref.current as Mesh).updateMatrixWorld());
  return <perspectiveCamera ref={ref} {...props} />;
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

  const boxes = lists.map((index) => <Box index={index} progress={progress} />);

  return (
    <Canvas
      className={style.bg_canvas}
      style={{
        position: 'fixed',
        width: windowSize?.width || 0,
        height: windowSize?.height || 0,
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, -10]}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {boxes}
        <EffectComposer>
          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </PerspectiveCamera>
    </Canvas>
  );
};

export default Background;
