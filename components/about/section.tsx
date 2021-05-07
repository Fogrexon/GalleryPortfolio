import PropTypes from 'prop-types';
import style from './section.module.scss';

const Section = ({ title, children }) => (
  <div className={style.section}>
    <h1>{title}</h1>
    {children}
  </div>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default Section;
