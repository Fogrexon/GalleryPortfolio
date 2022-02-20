/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef, useState, VFC } from 'react';
import SectionTitle from '../utils/section';
import Image from 'next/image';
import style from './galleryitem.module.scss';
import works from './works.json';
import joins from './joins.json';
import small from './small.json';

interface GalleryItemProps {
  item: {
    name: string;
    tags: string[];
    link?: string;
    sourcecode?: string;
    demo?: string;
    image?: string;
    description: string;
  };
};

export const GalleryItem: VFC<GalleryItemProps> = ({
  item: {
    name, tags, link, sourcecode, image, description, demo
  },
}) => {
  const imgSrc = image || '/gallery/noimage.png';
  const ref = useRef<HTMLDivElement>();
  const [boxStyle, setBoxStyle] = useState<{[key: string]: string}>({ backgroundImage: `url(${imgSrc})` });
  const clickWork = () => {
    ref.current.classList.add(style.visible);
  };
  const removeWork = (e) => {
    e.stopPropagation();
    ref.current.classList.remove(style.visible);
  };
  const preventBubbling = (e) => {
    e.stopPropagation();
  };

  const mouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const boxX = (e.clientX - rect.left) / rect.width - 0.5;
    const boxY = (e.clientY - rect.top) / rect.height - 0.5;
    setBoxStyle({
      backgroundImage: `url(${imgSrc})`,
      transform: `perspective(500px) rotateX(${-Math.floor(boxY * 10 * 10) / 10}deg) rotateY(${Math.floor(boxX * 10 * 10) / 10}deg)`,
      zIndex: '1',
    });
  };
  const mouseLeave = () => {
    setBoxStyle({
      backgroundImage: `url(${imgSrc})`,
      transform: 'perspective(500px) rotateX(0deg) rotateY(0deg)',
      zIndex: '0',
    });
  };
  const wrap = (
    <>
      <div className={style.background} ref={ref} onClick={removeWork} key="detal-card">
        <div className={style.details} onClick={preventBubbling}>
          <img src={imgSrc} alt={name} />
          <h2>{name}</h2>
          <div key="tags">
            Tags :
            {tags.map((entry: string) => <span className={style.tags} key={entry}>{entry}</span>)}
          </div>
          <div className={style.link_wrapper} key="links">
            {link ? <span><a href={link} target="_blank" rel="noopener noreferrer">Link</a></span> : ''}
            {sourcecode ? <span><a href={sourcecode} target="_blank" rel="noopener noreferrer">Sourcecode</a></span> : ''}
            {demo ? <span><a href={sourcecode} target="_blank" rel="noopener noreferrer">Demo</a></span> : ''}
          </div>
          <p>{description}</p>
        </div>
      </div>
      <div
        className={style.work}
        style={boxStyle}
        onClick={clickWork}
        onMouseMove={mouseMove}
        onMouseLeave={mouseLeave}
        key="gallery-card"
      >
        <div className={style.name}>
          {name}
        </div>
      </div>
    </>
  );
  return wrap;
};



const GalleryWrapper: VFC = () => (
  <>
    <SectionTitle>作品集</SectionTitle>
    <div className={style.wrapper} key="works">
      {
      works.map((entry) => <GalleryItem item={entry} key={entry.name} />)
    }
    </div>
    <SectionTitle>参加中のプロジェクト</SectionTitle>
    <div className={style.wrapper} key="project">
      {
        joins.map((entry) => <GalleryItem item={entry} key={entry.name} />)
      }
    </div>

    <SectionTitle>小物</SectionTitle>
    <p className={style.section_description}>授業課題などで作った作品未満のプログラム</p>
    <div className={style.wrapper} key="small">
      {
        small.map((entry) => <GalleryItem item={entry} key={entry.name} />)
      }
    </div>
  </>
);

export default GalleryWrapper;
