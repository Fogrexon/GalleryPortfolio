/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from '../utils/section';
import style from './galleryitem.module.scss';
import works from './works.json';
import joins from './joins.json';
import small from './small.json';

export const GalleryItem = ({
  item: {
    name, tags, link, sourcecode, image, description,
  },
}) => {
  const imgSrc = image || '/gallery/noimage.png';
  const ref = useRef<HTMLElement>();
  const [boxStyle, setBoxStyle] = useState<{[key: string]: string}>({ backgroundImage: `url(${imgSrc})` });
  const clickWork = () => {
    ref.current.classList.add(style.visible);
  };
  const removeWork = (e) => {
    e.stopPropagation();
    ref.current.classList.remove(style.visible);
  };

  const mouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const boxX = (e.clientX - rect.left) / rect.width - 0.5;
    const boxY = (e.clientY - rect.top) / rect.height - 0.5;
    setBoxStyle({
      backgroundImage: `url(${imgSrc})`,
      transform: `perspective(500px) rotateX(${-Math.floor(boxY * 30 * 10) / 10}deg) rotateY(${Math.floor(boxX * 30 * 10) / 10}deg)`,
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
      <div className={style.background} ref={ref} onClick={removeWork}>
        <div className={style.details}>
          <img src={imgSrc} alt={name} />
          <h2>{name}</h2>
          <div>
            Tags :
            {tags.map((entry: string) => <span className={style.tags}>{entry}</span>)}
          </div>
          <div className={style.link_wrapper}>
            {link ? <span><a href={link} target="_blank" rel="noopener noreferrer">Link</a></span> : ''}
            {sourcecode ? <span><a href={sourcecode} target="_blank" rel="noopener noreferrer">Sourcecode</a></span> : ''}
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
      >
        <div className={style.name}>
          {name}
        </div>
      </div>
    </>
  );
  return wrap;
};

GalleryItem.propTypes = {
  item: PropTypes.exact({
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    link: PropTypes.string,
    sourcecode: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

const GalleryWrapper = () => (
  <>
    <SectionTitle>作品集</SectionTitle>
    <div className={style.wrapper}>
      {
      works.map((entry) => <GalleryItem item={entry} key={entry.name} />)
    }
    </div>
    <SectionTitle>参加中のプロジェクト</SectionTitle>
    <div className={style.wrapper}>
      {
        joins.map((entry) => <GalleryItem item={entry} key={entry.name} />)
      }
    </div>

    <SectionTitle>小物</SectionTitle>
    <p className={style.section_description}>授業課題とかで作った作品未満のプログラム</p>
    <div className={style.wrapper}>
      {
        small.map((entry) => <GalleryItem item={entry} key={entry.name} />)
      }
    </div>
  </>
);

export default GalleryWrapper;
