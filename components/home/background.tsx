import { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Effects } from '@react-three/drei/Effects';
import style from './background.module.scss';

const Box = ({ index, progress }) => {
  const mesh = useRef();
  const p = (progress * 3) % 1;
  const r = index / 20 * 2;
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
  const mesh = useRef();
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
      <Effects></Effects>
    </Canvas>
  );
};

export default Background;
