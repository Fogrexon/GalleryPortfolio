import { animated, useSpring } from "@react-spring/three";
import { Html } from "@react-three/drei";
import { ReactNode, useMemo, VFC } from "react";
import { BackSide, TextureLoader } from "three";
import { animated as a } from "react-spring";
import style from './tab.module.scss';

interface TabProps {
  index: number;
  side: "left" | "right";
  src: string;
  selected: boolean;
  title: string;
  children: ReactNode;
}

export const Tab: VFC<TabProps> = ({index, side, src, selected, title, children}) => {
  const sideRate = side === "right" ? 1 : -1;
  const texture = useMemo(() => new TextureLoader().load(src), [src]);
  const { spring } = useSpring({
    spring: selected ? 1 : 0,
  })
  const transform = spring.to([0, 1], ["translate(-50%, -50%) scale(0%)", "translate(-50%, -50%) scale(100%)"])
  const alpha = spring.to([0, 1], [0, 1])
  return (
    <group position={[0, 0, index * 2]}>
      <mesh position={[sideRate * 0.5, 0, 0]}>
        <planeGeometry attach="geometry" args={[1.3, 1.3]} />
        <animated.meshBasicMaterial attach="material" opacity={alpha} transparent side={BackSide} color="white" map={texture} />
      </mesh>
      <Html position={[0, -0.3, 0]}>
        <a.h1 className={style.title} style={{opacity: alpha, transform, textAlign: side}}>{title}</a.h1>
      </Html>
      <Html position={[-sideRate * 0.5, 0, 0]} scale={[2, 2, 1]}>
        <a.section className={style.content} style={{opacity: alpha, transform}}>
          {children}
        </a.section>
      </Html>
    </group>
  )
}