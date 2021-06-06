import Link from 'next/link';
import PropTypes from 'prop-types';
import { Style } from 'react-style-proptype';
import style from './card.module.scss';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

const Card = ({
  title, link, upArrow, downArrow, style: styleObj,
}) => (
  <div className={style.card} style={styleObj}>
    <section>
      { upArrow ? <div><FaAngleUp /></div> : '' }
      <h1>{link ? <Link href={link}>{title}</Link> : title}</h1>
      { downArrow ? <div><FaAngleDown /></div> : '' }
    </section>
  </div>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
  upArrow: PropTypes.bool,
  downArrow: PropTypes.bool,
  styleObj: PropTypes.object,
};

Card.defaultProps = {
  style: {},
  link: null,
  upArrow: false,
  downArrow: false,
};

export default Card;
