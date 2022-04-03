/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import { animated, SpringValue, useSpring } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";
import { VFC, useRef, useEffect } from "react";

const RotatePlane: VFC<
  { position: SpringValue<number[]>; seed: number } & { [key: string]: any }
> = ({ position, seed, ...rest }) => {
  const meshRef = useRef(null);

  useEffect(() => {
    meshRef.current.rotation.z = seed;
  }, []);

  useFrame(() => {
    meshRef.current.rotation.z += (Math.PI / 450) * seed;
  });

  return (
    // @ts-ignore
    <animated.mesh ref={meshRef} position={position} {...rest}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="pink" />
    </animated.mesh>
  );
};

const IconPlane: VFC<
  { position: SpringValue<number[]>; onClick: () => void } & {
    [key: string]: any;
  }
> = ({ position, onClick, ...rest }) => (
  // @ts-ignore
  <animated.mesh onClick={onClick} position={position} {...rest}>
    <planeGeometry args={[0.9, 0.9]} />
    <meshBasicMaterial color="white" />
  </animated.mesh>
);

export const FirstAnim: VFC<{
  first: boolean;
  update: (props: any) => void;
}> = ({ first, update }) => {
  const { position: firstRing } = useSpring({
    from: {
      position: [0, 0, 20],
    },
    to: {
      position: first ? [0, 0, 0] : [0, 0, 20],
    },
  });

  const { position: secondRing } = useSpring({
    from: {
      position: [0, 0, 20],
    },
    to: {
      position: first ? [0, 0, -3] : [0, 0, 20],
    },
  });

  const { position: iconRing } = useSpring({
    from: {
      position: [0, 0, 20],
    },
    to: {
      position: first ? [0, 0, 2] : [0, 0, 20],
    },
  });

  return (
    <animated.group>
      <RotatePlane position={firstRing} scale={3} seed={1} />
      <RotatePlane position={secondRing} scale={4} seed={3} />
      <IconPlane onClick={() => update({ first: false })} position={iconRing} />
    </animated.group>
  );
};
