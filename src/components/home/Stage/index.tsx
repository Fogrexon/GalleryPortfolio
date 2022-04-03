import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useEffect, useMemo, useRef, VFC } from "react";
import { Euler, SpotLight, Vector3 } from "three";

import floorSrc from "./floor.glb";
import windowSrc from "./light.glb";
import { Monolith } from "./Monolith";

import galleryMonolithSrc from "./imgs/galleryMonolith.png";
import aboutMonolithSrc from "./imgs/aboutMonolith.png";
import blogMonolithSrc from "./imgs/blogMonolith.png";
import galleryTextSrc from "./imgs/galleryText.png";
import aboutTextSrc from "./imgs/aboutText.png";
import blogTextSrc from "./imgs/blogText.png";
import galleryIconSrc from "./imgs/galleryIcon.png";
import aboutIconSrc from "./imgs/aboutIcon.png";
import blogIconSrc from "./imgs/blogIcon.png";

export const Models: VFC<{}> = () => {
  const floor = useLoader(GLTFLoader, floorSrc);
  const window = useLoader(GLTFLoader, windowSrc);
  const lightRef = useRef<SpotLight>(null);

  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.position.set(0, 7.2, 0);
      lightRef.current.lookAt(0, 0, 0);
      lightRef.current.castShadow = true;
    }
  }, []);
  return (
    <>
      <Monolith
        key="gallery"
        position={useMemo(() => new Vector3(-1.2955, 1.3, -4.2001), [])}
        rotation={useMemo(() => new Euler(0, 0, -0.21), [])}
        textureSrc={galleryMonolithSrc.src}
        textSrc={galleryTextSrc.src}
        iconSrc={galleryIconSrc.src}
      />
      <Monolith
        key="about"
        position={useMemo(() => new Vector3(3.794, 1.669, -3.1085), [])}
        rotation={useMemo(() => new Euler(-0.15, 0.28, 0.31), [])}
        textureSrc={aboutMonolithSrc.src}
        textSrc={aboutTextSrc.src}
        iconSrc={aboutIconSrc.src}
      />
      <Monolith
        key="blog"
        position={useMemo(() => new Vector3(2.8337, 0.33942, 2.6606), [])}
        rotation={useMemo(() => new Euler(0.3, 0.34, -1.06), [])}
        textureSrc={blogMonolithSrc.src}
        textSrc={blogTextSrc.src}
        iconSrc={blogIconSrc.src}
      />
      <primitive object={floor.scene.children[0]} receiveShadow castShadow />
      <primitive object={window.scene} />
      <spotLight
        ref={lightRef}
        castShadow
        angle={Math.PI / 3}
        penumbra={0.3}
        decay={300}
        intensity={1}
        distance={1000}
      />
      <ambientLight color={[0.02, 0.02, 0.02]} />
    </>
  );
};

export const Stage: VFC<{}> = () => (
  <group>
    <Suspense fallback={null}>
      <Models />
    </Suspense>
  </group>
);
