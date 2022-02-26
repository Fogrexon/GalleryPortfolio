/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import { animated, SpringValue, useSpring } from "@react-spring/three";
import { VFC, useState, useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
// import { Texture } from 'three'
import monolithVertexShader from 'raw-loader!glslify-loader!./monolith/vertexShader.vs';
import monolithFragmentShader from 'raw-loader!glslify-loader!./monolith/fragmentShader.fs';
import aboutMapSrc from './gallery_about.png'
import galleryMapSrc from './gallery_gallery.png'
import blogMapSrc from './gallery_blog.png'

const AlphaPlane: VFC<{opacity: SpringValue<number>, map: ReturnType<TextureLoader.load>, timescale: number} & {[key: string]: any}> = ({opacity, map, timescale, ...rest}) => {
  const materialRef = useRef(null);
  useEffect(() => {
    let id;
    const tick = () => {
      id = requestAnimationFrame(tick)
      if(!materialRef.current) return;
      materialRef.current.uniforms.u_time.value = performance.now() / 1000;
    }
    id = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(id)
    }
  }, [])
  return (
    // @ts-ignore
    <animated.mesh {...rest}>
      <planeGeometry args={[20,20]} />
      <animated.shaderMaterial ref={materialRef} opacity={opacity} uniforms={{u_tex: {value: map}, u_time: {value: 0}, u_timescale: {value: timescale}}} transparent vertexShader={monolithVertexShader} fragmentShader={monolithFragmentShader} />
    </animated.mesh>
  )
}

const Plane: VFC<{[key: string]: any}> = ({...rest}) => (
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
    position: selection === 0 ? [0, 0, 3] : [5, 0, -5],
    rotation: selection === 0 ? [0, 0, 0] : [0, -Math.PI * 0.1, 0],
  });
  const galleryProps = useSpring({
    // scale: selection === 1 ? 1.5 : 1,
    position: selection === 1 ? [0, 0, 3] : [0, 0, -5],
  });
  const blogProps = useSpring({
    // scale: selection === 2 ? 1.5 : 1,
    position: selection === 2 ? [0, 0, 3] : [-5, 0, -5],
    rotation: selection === 2 ? [0, 0, 0] : [0, Math.PI * 0.1, 0],
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
        <>
          <AlphaPlane opacity={alphaProps.opacity} map={selection < 0 ? null : textures[selection]} position={[0, 4, 0.5]} onClick={() => setSelection(-1)} timescale={0.8} />
          <AlphaPlane opacity={alphaProps.opacity} map={selection < 0 ? null : textures[selection]} position={[0, 0, 1]} onClick={() => setSelection(-1)} timescale={1} />
          <AlphaPlane opacity={alphaProps.opacity} map={selection < 0 ? null : textures[selection]} position={[0, -4, 0.5]} onClick={() => setSelection(-1)} timescale={0.8} />
        </>
      ): ''}
      <Plane {...aboutProps} onClick={() => setSelection(0)} />
      <Plane {...galleryProps} onClick={() => setSelection(1)} />
      <Plane {...blogProps} onClick={() => setSelection(2)} />
    </animated.group>
  )
}
