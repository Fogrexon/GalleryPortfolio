import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, ScrollControls, useScroll } from "@react-three/drei";
import { PerspectiveCamera as ThreePerspectiveCamera } from "three";
import { NextRouter, useRouter } from "next/router";
import style from "./main.module.scss";
import { ErrorBoundary } from "../utils/ErrorBoundary";
import { Stage } from "./Stage";

export const RouterContext = createContext<{ router: null | NextRouter }>({
  router: null,
});

export const Inner = () => {
  
  const { width, height } = useThree(state => state.viewport);
  const [page, setPage] = useState(0);

  const cameraRef = useRef<ThreePerspectiveCamera>(null);
  const scroll = useScroll();

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, -2);
      cameraRef.current.lookAt(0, 0, 0);
    }
  }, [cameraRef.current]);

  useFrame(() => {
    const nowpage = Math.floor(scroll.offset * scroll.pages);
    if (nowpage !== page) {
      setPage(nowpage)
    }
  })

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        aspect={width / height}
        fov={39.6}
      />
      <Stage selected={page} />
    </>
  );
};

export const AboutCanvas = () => {
  const router = useRouter();
  const passContextValue = useMemo(() => ({ router }), [router.pathname]);
  return (
    <main className={style.main}>
      <ErrorBoundary>
        <Canvas shadows>
          <RouterContext.Provider value={passContextValue}>
            <color attach="background" args={[1, 1, 1]} />
            <ScrollControls pages={6}>
              <Inner />
            </ScrollControls>
          </RouterContext.Provider>
        </Canvas>
      </ErrorBoundary>
    </main>
  );
};
