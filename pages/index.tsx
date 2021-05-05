import Head from 'next/head'
import Card from '../components/home/card';

const Home = () => {
  return (
    <>
      <Head>
        <title>Fogrex Portfolio</title>
      </Head>
      <div>
        <Card title="WelcomeToFogrexSite" link="/" style={{backgroundColor: "#55a"}}>
          ようこそFogrexのページへ
        </Card>
        <Card title="WelcomeToFogrexSite" link="/" style={{backgroundColor: "#5a5"}}>
          ようこそFogrexのページへ
        </Card>
        <Card title="WelcomeToFogrexSite" link="/" style={{backgroundColor: "#a55"}}>
          ようこそFogrexのページへ
        </Card>
      </div>
    </>
  );
}

export default Home;
