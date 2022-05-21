import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import style from './header.module.scss';

type PageList = "about" | "gallery" | "blog";
interface HeaderProps {
  current?: PageList;
  title: string;
}

const Header = ({title, current}: HeaderProps) => {
  // const [ first, setFirst ] = useState(false);
  const [ hover, setHover ] = useState(false);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header className={style.header} onMouseLeave={() => setHover(false)}>
        <div className={style.homeIcon} data-hover={hover} onMouseEnter={() => setHover(true)}>
          <Link href="/" passHref>
            <a href="dummy">
              <svg viewBox="0, 0, 100, 100">
                <polygon
                  points="50,8.4 100,95 0,95"
                  stroke="black"
                  fill="none"
                  strokeWidth="3"
                />
              </svg>
            </a>
          </Link>
        </div>
        <div className={style.links} data-hover={hover}>
          <ul>
            <li data-current={current === "about"}><Link passHref href="/about"><a href="dummy">About</a></Link></li>
            <li data-current={current === "gallery"}><Link passHref href="/gallery"><a href="dummy">Gallery</a></Link></li>
            <li data-current={current === "blog"}><Link passHref href="/blog"><a href="dummy">Blog</a></Link></li>
          </ul>
        </div>
      </header>
    </>

  )
};

export default Header;
