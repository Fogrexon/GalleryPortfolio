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

const Blog = ({ blog }) => {
  const date = new Date(blog.createdAt);
  return (
  <>
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
