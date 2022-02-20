import style from "./blog.module.scss";

const BlogHeader = () => (
  <header className={style.header}>
    <div>
      <ul>
        <li>
          <a href="/blog">&lt; Back</a>
        </li>
      </ul>
    </div>
  </header>
);

export default BlogHeader;
