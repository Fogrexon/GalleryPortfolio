import PropTypes from 'prop-types';
import Head from 'next/head';
import style from './header.module.scss';

const Header = ({ title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <header className={style.header}>
      <ul>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/gallery">Gallery</a>
        </li>
      </ul>
    </header>
  </>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
