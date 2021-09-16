import Head from 'next/head';
import { useRouter } from 'next/router';
import Inner from '../../components/utils/inner';
import Header from '../../components/utils/header';

import client from '../../components/blog/client';
import BlogHeader from '../../components/blog/blogheader';

import style from '../../components/blog/blog.module.scss';

interface BlogData {
  contents: {
    id: string;
  }[];
}

const Blog = ({ blog, contentId }) => {
  const date = new Date(blog.createdAt);
  const router = useRouter();
  return (
    <>
      <Head>

        <meta property="og:url" content={`${router.basePath}blog/${contentId}`} />

        <meta property="og:type" content="article" />

        <meta property="og:title" content={blog.title} />

        <meta property="og:description" content={blog.content.slice(0, 50)} />

        <meta property="og:site_name" content="Fogrex website" />

        <meta name="twitter:card" content="summary" />
      </Head>
      <Header title={blog.title} />
      <Inner>
        <BlogHeader />
        <h1>{blog.title}</h1>
        <div>{`${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`}</div>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} className={style.blog_content} />
      </Inner>
    </>
  );
};
export default Blog;

export async function getStaticPaths() {
  const blogData = await client.get<BlogData>({
    endpoint: 'blog',
  });
  const paths = blogData.contents.map((blog) => ({
    params: { contentid: blog.id },
  }));

  return { paths, fallback: false };
}

export const getInitialProps = async ({ params: { contentid } }) => {
  const blog = await client.get({
    endpoint: 'blog',
    contentId: contentid,
  });

  return {
    props: {
      blog,
      contentId: contentid,
    },
  };
};
