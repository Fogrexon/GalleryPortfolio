import { FaTwitter, FaGithub } from 'react-icons/fa';
import Inner from '../components/utils/inner';
import Section from '../components/about/section';

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
    <Section title="Accounts">
      <div>
        <a href="https://twitter.com/Faglexon"><FaTwitter /></a>
        <a href="https://github.com/Fogrexon"><FaGithub /></a>
      </div>
    </Section>
  </Inner>
);

export default About;
