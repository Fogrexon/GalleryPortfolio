import PropTypes from 'prop-types';
import { Style } from 'react-style-proptype';
import style from './card.module.scss';

const Card = ({
  title, children, link, style: styleObj,
}) => (
  <div className={style.card} style={styleObj}>
    <section>
      <h1>{title}</h1>
      {children}
      <div><a href={link}>Learn more</a></div>
    </section>
  </div>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  link: PropTypes.string.isRequired,
  style: Style,
};

Card.defaultProps = {
  style: {},
  children: '',
};

export default Card;
