/* eslint-disable jsx-a11y/control-has-associated-label */
import { FaTwitter, FaGithub, FaYoutube } from "react-icons/fa";
import Inner from "../components/utils/inner";
import Header from "../components/utils/header";
import Section from "../components/about/section";
import style from "../components/about/section.module.scss";
import { Card } from "../components/about/card";
import tsIconSrc from "../components/about/icons/ts.png";
import javaIconSrc from "../components/about/icons/java.png";
import pythonIconSrc from "../components/about/icons/python.png";
import reactIconSrc from "../components/about/icons/react.png";
import vueIconSrc from "../components/about/icons/vue.png";
import unityIconSrc from "../components/about/icons/unity.png";
import cIconSrc from "../components/about/icons/c.png";
import cppIconSrc from "../components/about/icons/cpp.png";
import processingIconSrc from "../components/about/icons/processing.png";

const About = () => (
  <>
    <Header title="About" />
    <Inner>
      <Section title="Name">Fogrex</Section>
      <Section title="Infomation">Bachelor, Grade 4</Section>
      <Section title="Languages">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, 150px)",
            gap: "10px",
            justifyContent: "center",
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
      </Section>
      <Section title="Interests">
        WebGL, xR, Computer Graphics, Procedural, Gadgets
      </Section>
      <Section title="Hobbies">
        (Playing|Creating) game, Watching (anime|movies|TV series), (Buying |
        Using) gadgets
      </Section>
      <Section title="Interns">
        <ul style={{ listStyleType: "none" }}>
          <li>株式会社Junni (about 1 year, Frontend)</li>
          <li>株式会社サイバーエージェント (3 days, Game)</li>
          <li>株式会社アカツキ (3 days, Game)</li>
          <li>チームラボ株式会社 (2 weeks, Frontend)</li>
          <li>ピクシブ株式会社 (2 weeks, Frontend)</li>
        </ul>
      </Section>
      <Section title="Links">
        <div className={style.icon_wrapper}>
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
      </Section>
    </Inner>
  </>
);

export default About;
