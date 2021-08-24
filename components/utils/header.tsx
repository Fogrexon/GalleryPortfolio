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
          <svg height="100" width="100">
            <polygon points="50,0 100,86.6 0,86.6" />
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
