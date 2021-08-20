/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import style from './section.module.scss';
/* eslint-disable react/prop-types */
const SectionTitle = ({ children }) => (
  <h1 className={style.section_title}>
    {children.split('').map((word, i) => <span className={style.section_word} style={{ animationDelay: `${i / children.length}s` }} key={`${word}${i}`}>{word}</span>)}
  </h1>
);

SectionTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SectionTitle;
