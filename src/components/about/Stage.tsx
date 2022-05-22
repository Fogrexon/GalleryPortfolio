import { animated, useSpring } from '@react-spring/three'
import { VFC } from 'react'
import zeroSrc from './silhouette/0.png'
import oneSrc from './silhouette/1.png'
import twoSrc from './silhouette/2.png'
import threeSrc from './silhouette/3.png'
import fourSrc from './silhouette/4.png'
import fiveSrc from './silhouette/5.png'
import { Tab } from './Tab'

interface StageProps {
  selected: number;
}
export const Stage: VFC<StageProps> = ({selected}) => {
  const move = useSpring({
    position: [0, 0, -selected * 2]  as [number, number, number],
  })
  return (
    <animated.group position={move.position}>
      <Tab src={zeroSrc.src} index={0} selected={selected === 0} side="left" />
      <Tab src={oneSrc.src} index={1} selected={selected === 1} side="right" />
      <Tab src={twoSrc.src} index={2} selected={selected === 2} side="left" />
      <Tab src={threeSrc.src} index={3} selected={selected === 3} side="right" />
      <Tab src={fourSrc.src} index={4} selected={selected === 4} side="left" />
      <Tab src={fiveSrc.src} index={5} selected={selected === 5} side="right" />
    </animated.group>
  )
}