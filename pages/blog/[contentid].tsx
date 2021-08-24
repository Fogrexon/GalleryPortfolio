import { useRouter } from 'next/router';

import Inner from '../../components/utils/inner';
import Header from '../../components/utils/header';
import Section from '../../components/about/section';

import client from '../../components/blog/client';

const Blog = ({ blog }) => (
  <>
    <Header title={blog.title} />
    <Inner>
        <div>{(new Date(blog.createdAt)).toString()}</div>
        <div dangerouslySetInnerHTML={{__html: blog.content}} />
    </Inner>
  </>
);
export default Blog;

export async function getStaticPaths() {
  const blogData = await client.get({
    endpoint: 'blog',
  });
  const paths = blogData.contents?.map((blog) => ({
    params: { contentid: blog.id },
  }));

  return { paths, fallback: false };
}

export const getStaticProps = async ({ params: { contentid } }) => {
  const blog = await client.get({
    endpoint: 'blog',
    contentId: contentid,
  });

  return {
    props: {
      blog,
    },
  };
};
