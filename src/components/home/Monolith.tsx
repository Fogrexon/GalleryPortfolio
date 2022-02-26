/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import { animated, SpringValue, useSpring } from "@react-spring/three";
import { VFC, useState } from "react";

const AlphaPlane: VFC<{opacity: SpringValue<number>} & {[key: string]: any}> = ({opacity, ...rest}) => (
    // @ts-ignore
    <animated.mesh {...rest}>
      <planeGeometry args={[20,20]} />
      <animated.meshBasicMaterial opacity={opacity} color="yellow" />
    </animated.mesh>
  );

const Plane: VFC<{scale: SpringValue<number>, position: SpringValue<number[]>} & {[key: string]: any}> = ({position, scale, ...rest}) => (
    <animated.mesh position={position} scale={scale} {...rest}>
      <boxGeometry args={[2, 4, 1]} />
      <meshBasicMaterial color="pink" wireframe />
    </animated.mesh>
  );

export const Monolith: VFC<{first: boolean, update: (props: any) => void}> = ({first}) => {

  const [selection, setSelection] = useState(-1);

  const aboutProps = useSpring({
    scale: selection === 0 ? 1.5 : 1,
    position: selection === 0 ? [0, 0, 3] : [5, 0, 0],
    rotation: selection === 0 ? [0, 0, 0] : [0, -Math.PI * 0.1, 0],
  });
  const galleryProps = useSpring({
    scale: selection === 1 ? 1.5 : 1,
    position: selection === 1 ? [0, 0, 3] : [0, 0, 0],
  });
  const blogProps = useSpring({
    scale: selection === 2 ? 1.5 : 1,
    position: selection === 2 ? [0, 0, 3] : [-5, 0, 0],
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
      {selection !== -1 ? <AlphaPlane opacity={alphaProps.opacity} position={[0, 0, 1]} onClick={() => setSelection(-1)} />: ''}
      <Plane {...aboutProps} onClick={() => setSelection(0)} />
      <Plane {...galleryProps} onClick={() => setSelection(1)} />
      <Plane {...blogProps} onClick={() => setSelection(2)} />
    </animated.group>
  )
}
