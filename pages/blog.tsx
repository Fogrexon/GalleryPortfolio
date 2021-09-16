import Inner from '../components/utils/inner';
import Header from '../components/utils/header';
import Section from '../components/about/section';

import client from '../components/blog/client';

import style from '../components/blog/blog.module.scss';

const Blog = ({ blogData }) => (
  <>
    <Header title="Blog" />
    <Inner>
      <Section title="Blog">
        {
            blogData.contents.map((blog) => (
              <div key={blog.id} className={style.blog_card}>
                <h1><a href={`./blog/${blog.id}`}>{blog.title}</a></h1>
                <div
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                  className={style.line_clamp}
                />
              </div>
            ))
          }
      </Section>
    </Inner>
  </>
);
export default Blog;

export const getInitialProps = async () => {
  const blogData = await client.get({
    endpoint: 'blog',
  });

  return {
    props: {
      blogData,
    },
  };
};
