import { animated, useSpring } from "@react-spring/three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, VFC } from "react";
import { Color, Mesh } from "three";

const wait = (time: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), time);
  });

export const EffectPlane: VFC<
  {
    to: Record<string, any>;
    visible: boolean;
    speed: number;
    textureSrc: string;
  } & Record<string, any>
> = ({ to, speed, textureSrc, ...props }) => {
  const anim = useSpring({
    to,
    config: {
      mass: 2.3,
      tension: 190,
      friction: 77,
      velocity: 0.017,
    },
  });
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += Math.PI * 0.2 * delta * speed;
  });
  const tex = useTexture(textureSrc);
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <animated.mesh ref={ref} {...props} {...anim}>
      <planeBufferGeometry />
      <meshBasicMaterial
        map={tex}
        transparent
        color={new Color(1, 0, 0)}
        opacity={0.3}
      />
    </animated.mesh>
  );
};
export const IconPlane: VFC<
{ to: Record<string, any>; visible: boolean, textureSrc: string } & Record<string, any>
> = ({ to, textureSrc, ...props }) => {
  const anim = useSpring({
    to: async (next) => {
      await next({ scale: to.scale });
      await next({ scale: [0, 0, 0] });
    },
    config: {
      mass: 0.5,
      tension: 456,
      friction: 36,
      velocity: 0.032,
    },
  });
  const tex = useTexture(textureSrc);
  tex.generateMipmaps = false;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <animated.mesh {...props} {...anim}>
      <planeBufferGeometry />
      <meshBasicMaterial map={tex} color={new Color(1, 0, 0)} alphaTest={0.3} />
    </animated.mesh>
  );
};
export const NamePlane: VFC<
  { to: Record<string, any>; visible: boolean, textureSrc: string } & Record<string, any>
> = ({ to, textureSrc, ...props }) => {
  const anim = useSpring({
    to: async (next) => {
      await next({ scale: [0, 0, 0] });
      await wait(600);
      await next({ scale: to.scale });
    },
    config: {
      mass: 0.5,
      tension: 456,
      friction: 36,
      velocity: 0.032,
    },
  });
  const tex = useTexture(textureSrc)
  tex.generateMipmaps = false;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <animated.mesh {...props} {...anim}>
      <planeBufferGeometry />
      <meshBasicMaterial map={tex} color={new Color(1, 0, 0)} alphaTest={0.3} />
    </animated.mesh>
  );
};
