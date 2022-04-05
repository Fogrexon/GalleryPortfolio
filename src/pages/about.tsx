/* eslint-disable jsx-a11y/control-has-associated-label */
import { FaTwitter, FaGithub, FaYoutube } from "react-icons/fa";
import Inner from "../components/utils/inner";
import Header from "../components/utils/header";
import Section from "../components/about/section";
import style from "../components/about/section.module.scss";

const About = () => (
  <>
    <Header title="About" />
    <Inner>
      <Section title="Name">Fogrex</Section>
      <Section title="Infomation">Bachelor, Grade 4</Section>
      <Section title="Languages">TypeScript, React, Vue, UnityC#, GLSL, Python, Java, etc...</Section>
      <Section title="Interests">WebGL, xR, Computer Graphics, Procedural, Gadgets</Section>
      <Section title="Hobbies">(Playing|Creating) game, Watching (anime|movies|TV series), (Buying | Using) gadgets</Section>
      <Section title="Interns">
        <ul>
          <li>株式会社Junni (about 1 year)</li>
          <li>株式会社サイバーエージェント (3 days)</li>
          <li>株式会社アカツキ (3 days)</li>
          <li>チームラボ株式会社 (2 weeks)</li>
          <li>ピクシブ株式会社 (2 weeks)</li>
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
