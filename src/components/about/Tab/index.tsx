import { animated, useSpring } from "@react-spring/three";
import { useMemo, VFC } from "react";
import { BackSide, TextureLoader } from "three";

interface TabProps {
  index: number;
  side: "left" | "right";
  src: string;
  selected: boolean;
}

export const Tab: VFC<TabProps> = ({index, side, src, selected}) => {
  const sideRate = side === "right" ? 1 : -1;
  const texture = useMemo(() => new TextureLoader().load(src), [src]);
  const { spring } = useSpring({
    spring: selected ? 1 : 0,
  })
  const alpha = spring.to([0, 1], [0, 1])
  return (
    <group position={[0, 0, index * 2]}>
      <mesh position={[sideRate * 0.5, 0, 0]}>
        <planeGeometry attach="geometry" args={[1.3, 1.3]} />
        <animated.meshBasicMaterial attach="material" opacity={alpha} transparent side={BackSide} color="white" map={texture} />
      </mesh>
    </group>
  )
}