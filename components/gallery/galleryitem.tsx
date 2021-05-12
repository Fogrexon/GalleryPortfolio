/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef } from 'react';
import PropTypes from 'prop-types';
import style from './galleryitem.module.scss';
import works from './works.json';
import joins from './joins.json';
import small from './small.json';

export const GalleryItem = ({
  item: {
    name, tags, link, sourcecode, image, description,
  },
}) => {
  const ref = useRef<HTMLElement>();
  const clickWork = () => {
    ref.current.classList.add(style.visible);
  };
  const removeWork = (e) => {
    e.stopPropagation();
    ref.current.classList.remove(style.visible);
  };
  const imgSrc = image || '/gallery/noimage.png';
  const wrap = (
    <div className={style.work} style={{ backgroundImage: `url(${imgSrc})` }} ref={ref} onClick={clickWork}>
      <div className={style.background} onClick={removeWork}>
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
      <div className={style.name}>
        {name}
      </div>
    </div>
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
    <h1 className={style.section_title}>作品集</h1>
    <div className={style.wrapper}>
      {
      works.map((entry) => <GalleryItem item={entry} key={entry.name} />)
    }
    </div>
    <h1 className={style.section_title}>現在参加中のプロジェクト</h1>
    <div className={style.wrapper}>
      {
        joins.map((entry) => <GalleryItem item={entry} key={entry.name} />)
      }
    </div>

    <h1 className={style.section_title}>小物</h1>
    <p className={style.section_description}>授業課題とかで作った作品未満のプログラム</p>
    <div className={style.wrapper}>
      {
        small.map((entry) => <GalleryItem item={entry} key={entry.name} />)
      }
    </div>
  </>
);

export default GalleryWrapper;
