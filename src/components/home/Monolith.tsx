/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import { animated, SpringValue, useSpring } from "@react-spring/three";
import { VFC, useState, useEffect, useRef, Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { Texture } from 'three'
import monolithVertexShader from './monolith/vertexShader.vs';
import monolithFragmentShader from './monolith/fragmentShader.fs';
import aboutMapSrc from './gallery_about.png'
import galleryMapSrc from './gallery_gallery.png'
import blogMapSrc from './gallery_blog.png'
import wallsSrc from './walls.glb';

const AlphaPlane: VFC<{opacity: SpringValue<number>, map: ReturnType<TextureLoader.load>, timescale: number} & {[key: string]: any}> = ({opacity, map, timescale, ...rest}) => {
  const materialRef = useRef(null);
  useEffect(() => {
    let id;
    const tick = () => {
      id = requestAnimationFrame(tick)
      if(!materialRef.current) return;
      materialRef.current.uniforms.u_time.value = performance.now() / 1000;
      materialRef.current.uniforms.u_alpha.value = opacity.get();
    }
    id = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(id)
    }
  }, [])
  return (
    // @ts-ignore
    <animated.mesh {...rest}>
      <planeGeometry args={[40,40]} />
      <animated.shaderMaterial
        ref={materialRef}
        opacity={opacity}
        uniforms={{u_tex: {value: map}, u_time: {value: 0}, u_timescale: {value: timescale}, u_alpha: {value: 0}}}
        transparent
        vertexShader={monolithVertexShader}
        fragmentShader={monolithFragmentShader}
      />
    </animated.mesh>
  )
}

const FloorPlane = () => {
  const gltf = useLoader(GLTFLoader, wallsSrc);
  console.log(wallsSrc)
  return (
    <group position={[0, -2, -21]} scale={[40, 40, 40]}>
      <Suspense fallback={null}>
        <ambientLight args={[0xffffff]} />
        <primitive object={gltf.scene} />
      </Suspense>
    </group>
  );
}

const StoneBox: VFC<{[key: string]: any}> = ({...rest}) => (
    <animated.mesh {...rest}>
      <boxGeometry args={[2, 4, 1]} />
      <meshBasicMaterial color="pink" />
    </animated.mesh>
  );

export const Monolith: VFC<{first: boolean, update: (props: any) => void}> = ({first}) => {

  const textures = useLoader(TextureLoader, [aboutMapSrc.src, galleryMapSrc.src, blogMapSrc.src])

  const [selection, setSelection] = useState(-1);

  const aboutProps = useSpring({
    // scale: selection === 0 ? 1.5 : 1,
    // position: selection === 0 ? [0, 0, 3] : [5, 0, 0],
    // rotation: selection === 0 ? [0, 0, 0] : [0, -Math.PI * 0.1, 0],
  });
  const galleryProps = useSpring({
    // scale: selection === 1 ? 1.5 : 1,
    // position: selection === 1 ? [0, 0, 3] : [0, 0, 0],
  });
  const blogProps = useSpring({
    // scale: selection === 2 ? 1.5 : 1,
    // position: selection === 2 ? [0, 0, 3] : [-5, 0, 0],
    // rotation: selection === 2 ? [0, 0, 0] : [0, Math.PI * 0.1, 0],
  });
  const alphaProps = useSpring({
    opacity: selection === -1 ? 0 : 1,
  });

  const groupUp = useSpring({
    config: {
      tension: 52,
      friction: 36,
      precision: 0.001
    },
    position: !first ? [0, 0, 0] : [0, -20, 0],
  })


  return (
    <animated.group position={groupUp.position}>
      {selection !== -1 ? (
        <group>
          <AlphaPlane opacity={alphaProps.opacity} map={selection < 0 ? null : textures[selection]} position={[0, 10, -20.001]} onClick={() => setSelection(-1)} timescale={0.8} />
          <AlphaPlane opacity={alphaProps.opacity} map={selection < 0 ? null : textures[selection]} position={[0, 0, -20]} scale={[1.2, 1.2, 1.2]} onClick={() => setSelection(-1)} timescale={1} />
          <AlphaPlane opacity={alphaProps.opacity} map={selection < 0 ? null : textures[selection]} position={[0, -10, -20.001]} onClick={() => setSelection(-1)} timescale={0.8} />
        </group>
      ): ''}
      <FloorPlane />
      <StoneBox {...aboutProps} onClick={() => selection >= 0 || setSelection(0)} />
      <StoneBox {...galleryProps} onClick={() => selection >= 0 || setSelection(1)} />
      <StoneBox {...blogProps} onClick={() => selection >= 0 || setSelection(2)} />
    </animated.group>
  )
}
