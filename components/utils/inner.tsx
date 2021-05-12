import PropTypes from 'prop-types';
import style from './inner.module.scss';

const Inner = ({ children }) => <div className={style.inner}>{children}</div>;

Inner.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default Inner;
