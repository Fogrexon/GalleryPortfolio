import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import {
  Group,
  PerspectiveCamera as ThreePerspectiveCamera,
} from "three";
import { NextRouter, useRouter } from "next/router";
import style from "./main.module.scss";
import { Stage } from "./Stage";
import { ErrorBoundary } from "../utils/ErrorBoundary";
import { PostProcessing } from "./Stage/PostProcessing";
import { Splash } from "./Splash";

export const RouterContext = createContext<{ router: null | NextRouter }>({
  router: null,
});

export const Inner = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 1000, height: 1000 });
  const cameraRef = useRef<ThreePerspectiveCamera>(null);
  const groupRef = useRef<Group>(null);

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
      if (groupRef.current) {
        groupRef.current.position.copy(cameraRef.current.position);
        groupRef.current.rotation.copy(cameraRef.current.rotation);
      }
    }
  }, [cameraRef.current]);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        aspect={canvasSize.width / canvasSize.height}
        fov={39.6}
      />
      <group ref={groupRef} name="splash">
        <Splash
          position={[0, 0, -1]}
          scale={[2, 2, 2]}
          rotation={[0, 0, 0]}
          onClick={() => null}
        />
      </group>
      <Stage />
    </>
  );
};

export const TopAnimation = () => {
  const router = useRouter();
  const passContextValue = useMemo(() => ({ router }), [router.pathname]);
  return (
    <main className={style.main}>
      <ErrorBoundary>
        <Canvas shadows>
          <RouterContext.Provider value={passContextValue}>
            <color attach="background" args={[0, 0, 0]} />
            <Inner />
            <PostProcessing />
          </RouterContext.Provider>
        </Canvas>
      </ErrorBoundary>
    </main>
  );
};
