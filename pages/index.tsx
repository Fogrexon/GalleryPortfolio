import Head from 'next/head'
import { useEffect } from 'react';
import Card from '../components/home/card';

const scrollEventHandler = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      window.scrollTo({
        top: window.pageYOffset + entry.boundingClientRect.top,
        behavior: 'smooth',
      });
    }
  })
}

const Home = () => {
  let observer;
  useEffect(() => {
    observer = new IntersectionObserver(scrollEventHandler, {
      rootMargin: '0px',
      threshold: 0.01,
    });

    const { children } = document.getElementById('cardholder');

    for(let i=0;i<children.length;i++) {
      console.log(children[i]);
      observer.observe(children[i]);
    }

  }, []);
  return (
    <>
      <Head>
        <title>Fogrex Portfolio</title>
      </Head>
      <div id="cardholder">
        <Card title="WelcomeToFogrexSite" link="/" style={{backgroundColor: "#55a"}}>
          このサイトはFogrexのポートフォリオサイトです
        </Card>
        <Card title="About" link="/about" style={{backgroundColor: "#5a5"}}>
          情報工学を学んでいる大学生です。主にゲーム制作ではUnity、WebアプリではReactを使ってクライアントを作っています。
          CG技術に興味があり、コンピューターグラフィックスの勉強のためにWebGLやGLSLなどを勉強しています。
        </Card>
        <Card title="Gallery" link="/gallery" style={{backgroundColor: "#a55"}}>
          作品ページです　今まで作ったアプリケーションやゲームの一覧を載せています
        </Card>
        <Card title="Blog" link="/blog" style={{backgroundColor: "#aaa"}}>
          ブログです。更新情報やイベント参加記、技術についての話をします。前のサイトからの引継ぎと一部記事の移植をしている途中で、閉鎖しています。
        </Card>
      </div>
    </>
  );
}

export default Home;
