import { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import style from './background.module.scss';

const Box = ({ index, progress }) => {
    const mesh = useRef();
    return (
        <mesh
            rotation={[progress * Math.PI * 2 + index, 0, 0]}
            position={[index % 5, Math.floor(index / 5), 0]}
            ref={mesh}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'orange'} />
        </mesh>
    )
}

const Background = () => {
    const [progress, setProgress] = useState(0);
    let [windowSize, setWindowSize] = useState({width: 0, height: 0});
    const mesh = useRef();
    useEffect(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        const onScroll = () => {
            setProgress(document.documentElement.scrollTop / (document.body.clientHeight - window.innerHeight));
        }
        const onResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
        } 
    }, []);

    const boxes = [0, 1,2,3,4,5,6,7,8,9].map((index) => {
        return <Box index={index} progress={progress} />; 
    });

    return (
        <Canvas className={style.bg_canvas} style={{ position: 'fixed', width: windowSize?.width || 0, height: windowSize?.height || 0 }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {boxes}
        </Canvas>
    );
}

export default Background;
