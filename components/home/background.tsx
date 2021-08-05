import { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Effects } from '@react-three/drei';
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing';
// import PostProcessing from './PostProcessing/effect';
import style from './background.module.scss';

const Box = ({ index, progress }) => {
  const mesh = useRef();
  const p = (progress * 3) % 1;
  const r = (index / 20) * 2;
  const rot = (p + index / 10) * Math.PI * 2 * (4 - r);
  return (
    <mesh
      rotation={[rot, rot, 0]}
      position={[Math.cos(rot) * r, Math.sin(rot) * r, 0]}
      ref={mesh}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
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

  const boxes = lists.map((index) => <Box index={index} progress={progress} />);

  return (
    <Canvas className={style.bg_canvas} style={{ position: 'fixed', width: windowSize?.width || 0, height: windowSize?.height || 0 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {boxes}
      <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Canvas>
  );
};

export default Background;
