import { useRef } from 'react';
import PropTypes from 'prop-types';
import style from './galleryitem.module.scss';
import works from './works.json';

export const GalleryItem = ({
  item: {
    name, tags, link, sourcecode, image, description,
  },
}) => {
  const ref = useRef();
  const clickWork = () => {
    ref.current?.classList.add(style.visible);
  };
  const removeWork = (e) => {
    e.stopPropagation();
    ref.current?.classList.remove(style.visible);
  }
  const wrap = (
    <div className={style.work} style={{ backgroundImage: `url(${image})` }} ref={ref} onClick={clickWork}>
      <div className={style.background} onClick={removeWork}>
        <div className={style.details}>
          <img src={image} alt={name} />
          <h2>{name}</h2>
          {tags.map((entry: string) => <span>{entry}</span>)}
          <div>
            {link ? <span><a href={link}>Link</a></span> : ''}
            {sourcecode ? <span><a href={sourcecode}>Sourcecode</a></span> : ''}
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
  <div className={style.wrapper}>
    {
      works.map((entry) => <GalleryItem item={entry} key={entry.name} />)
    }
  </div>
);

export default GalleryWrapper;
