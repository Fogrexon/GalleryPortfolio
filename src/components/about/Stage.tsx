import { animated, useSpring } from '@react-spring/three'
import { VFC } from 'react'
import { FaTwitter, FaGithub, FaYoutube } from "react-icons/fa";
import { Card } from './card'
import zeroSrc from './silhouette/0.png'
import oneSrc from './silhouette/1.png'
import twoSrc from './silhouette/2.png'
import threeSrc from './silhouette/3.png'
import fourSrc from './silhouette/4.png'
import fiveSrc from './silhouette/5.png'
import { Tab } from './Tab'
import tsIconSrc from "./icons/ts.png";
import javaIconSrc from "./icons/java.png";
import pythonIconSrc from "./icons/python.png";
import reactIconSrc from "./icons/react.png";
import vueIconSrc from "./icons/vue.png";
import unityIconSrc from "./icons/unity.png";
import cIconSrc from "./icons/c.png";
import cppIconSrc from "./icons/cpp.png";
import processingIconSrc from "./icons/processing.png";
import style from './section.module.scss';

interface StageProps {
  selected: number;
}
export const Stage: VFC<StageProps> = ({selected}) => {
  const move = useSpring({
    position: [0, 0, -selected * 2]  as [number, number, number],
  })
  return (
    <animated.group position={move.position}>
      <Tab src={zeroSrc.src} index={0} selected={selected === 0} side="left" title="Name">
        Fogrex
      </Tab>
      <Tab src={oneSrc.src} index={1} selected={selected === 1} side="right" title="Information">
        bachelor, Grade 4
      </Tab>
      <Tab src={twoSrc.src} index={2} selected={selected === 2} side="left" title="Languages">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, 100px)",
            gap: "10px",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Card level={4} src={tsIconSrc.src}>
            TypeScript
          </Card>
          <Card level={4} src={unityIconSrc.src}>
            Unity
          </Card>
          <Card level={4}>GLSL</Card>
          <Card level={4} src={reactIconSrc.src}>
            React
          </Card>
          <Card level={3} src={pythonIconSrc.src}>
            Python
          </Card>
          <Card level={2} src={vueIconSrc.src}>
            Vue
          </Card>
          <Card level={2} src={processingIconSrc.src}>
            Processing
          </Card>
          <Card level={2} src={javaIconSrc.src}>
            Java
          </Card>
          <Card level={1} src={cppIconSrc.src}>
            C++
          </Card>
          <Card level={1} src={cIconSrc.src}>
            C
          </Card>
        </div>
      </Tab>
      <Tab src={threeSrc.src} index={3} selected={selected === 3} side="right" title="Interests">
        WebGL, xR, Computer Graphics, Procedural, Gadgets
      </Tab>
      <Tab src={fourSrc.src} index={4} selected={selected === 4} side="left" title="Hobbies">
        (Playing|Creating) game, Watching (anime|movies|TV series), (Buying |
        Using) gadgets
      </Tab>
      <Tab src={fiveSrc.src} index={5} selected={selected === 5} side="right" title="Links"><div className={style.icon_wrapper}>
          <a
            className={style.icon}
            href="https://twitter.com/Faglexon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            className={style.icon}
            href="https://github.com/Fogrexon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            className={style.icon}
            href="https://www.youtube.com/channel/UCNs8VOkhh8JPYwyH9yTsjzA"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
          <a
            className={style.link}
            href="https://www.shadertoy.com/user/Fogrex"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shadertoy
          </a>
          <a
            className={style.link}
            href="https://qiita.com/FogRexOn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Qiita
          </a>
          <a
            className={style.link}
            href="https://trap.jp/author/fogrex/"
            target="_blank"
            rel="noopener noreferrer"
          >
            traP
          </a>
        </div>
      </Tab>
    </animated.group>
  )
}