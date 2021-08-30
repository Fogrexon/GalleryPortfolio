import PropTypes from 'prop-types';
import Head from 'next/head';
import style from './header.module.scss';

const Header = ({ title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <header className={style.header}>
      <div>
        <a href="/">
          <svg viewBox="0, 0, 100, 100">
            <polygon points="50,8.4 100,95 0,95" stroke="black" fill="none" strokeWidth="3" />
          </svg>
        </a>
        <ul>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/gallery">Gallery</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
        </ul>
      </div>
    </header>
  </>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
