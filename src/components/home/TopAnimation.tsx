import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { PerspectiveCamera as ThreePerspectiveCamera } from "three";
import style from "./main.module.scss";
import { Stage } from "./Stage";
import { ErrorBoundary } from "../utils/ErrorBoundary";

export const Inner = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 1000, height: 1000 });
  const cameraRef = useRef<ThreePerspectiveCamera>(null);

  useLayoutEffect(() => {
    if (!window) return;
    const resizeHandler = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };

    resizeHandler();

    window.addEventListener("resize", resizeHandler);
    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(-12, 4, 13);
      cameraRef.current.lookAt(0, 2, 0);
    }
  }, [cameraRef.current]);

  return (
    <>
      {/* @ts-ignore */}
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        aspect={canvasSize.width / canvasSize.height}
        fov={39.6}
      />
      {/* <primitive object={new AxesHelper(10)} /> */}
      <Stage />
    </>
  );
};

export const TopAnimation = () => (
  <main className={style.main}>
    <ErrorBoundary>
      <Canvas shadows>
        <color attach="background" args={[0, 0, 0]} />
        <Inner />
      </Canvas>
    </ErrorBoundary>
  </main>
);
