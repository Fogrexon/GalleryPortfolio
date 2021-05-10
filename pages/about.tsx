/* eslint-disable jsx-a11y/control-has-associated-label */
import { FaTwitter, FaGithub } from 'react-icons/fa';
import Inner from '../components/utils/inner';
import Section from '../components/about/section';
import style from '../components/about/section.module.scss';

const About = () => (
  <Inner>
    <Section title="Name">
      Fogrex
    </Section>
    <Section title="Info">
      大学3年 情報系
    </Section>
    <Section title="Language">
      JS, UnityC#, GLSL, Python, Java etc...
    </Section>
    <Section title="Interest">
      WebGL, Computer Graphics
    </Section>
    <Section title="Links">
      <div className={style.icon_wrapper}>
        <a className={style.icon} href="https://twitter.com/Faglexon"><FaTwitter /></a>
        <a className={style.icon} href="https://github.com/Fogrexon"><FaGithub /></a>
        <a className={style.link} href="https://www.shadertoy.com/user/Fogrex">Shadertoy</a>
        <a className={style.link} href="https://qiita.com/FogRexOn">Qiita</a>
        <a className={style.link} href="https://trap.jp/author/fogrex/">traP</a>
      </div>
    </Section>
  </Inner>
);

export default About;
