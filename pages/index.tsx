import Head from 'next/head';
import { useEffect } from 'react';
import Card from '../components/home/card';

const scrollEventHandler = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      window.scrollTo({
        top: window.pageYOffset + entry.boundingClientRect.top,
        behavior: 'smooth',
      });
    }
  });
};

const Home = () => {
  let observer;
  useEffect(() => {
    observer = new IntersectionObserver(scrollEventHandler, {
      rootMargin: '0px',
      threshold: 0.01,
    });

    const { children } = document.getElementById('cardholder');

    for (let i = 0; i < children.length; i += 1) {
      observer.observe(children[i]);
    }
  }, []);
  return (
    <>
      <Head>
        <title>Fogrex Portfolio</title>
      </Head>
      <div id="cardholder">
        <Card title="WelcomeToFogrexSite" downArrow style={{ backgroundColor: '#55a' }} />
        <Card title="About" link="/about" upArrow downArrow style={{ backgroundColor: '#5a5' }} />
        <Card title="Gallery" link="/gallery" upArrow style={{ backgroundColor: '#a55' }} />
        {/* <Card title="Blog" link="/blog" upArrow style={{ backgroundColor: '#aaa' }} /> */}
      </div>
    </>
  );
};

export default Home;
