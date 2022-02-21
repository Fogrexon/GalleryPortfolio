import PropTypes from "prop-types";
import style from "./section.module.scss";
import SectionTitle from "../utils/section";

const Section = ({ title, children }) => (
  <div className={style.section}>
    <SectionTitle>{title}</SectionTitle>
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
