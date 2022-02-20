/* eslint-disable react/forbid-prop-types */
import Link from "next/link";
import PropTypes from "prop-types";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import style from "./card.module.scss";

const Card = ({ title, link, upArrow, downArrow, style: styleObj }) => (
  <div className={style.card} style={styleObj}>
    <section>
      {upArrow ? (
        <div>
          <FaAngleUp />
        </div>
      ) : (
        ""
      )}
      <h1>{link ? <Link href={link}>{title}</Link> : title}</h1>
      {downArrow ? (
        <div>
          <FaAngleDown />
        </div>
      ) : (
        ""
      )}
    </section>
  </div>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
  upArrow: PropTypes.bool,
  downArrow: PropTypes.bool,
  style: PropTypes.object,
};

Card.defaultProps = {
  link: null,
  upArrow: false,
  downArrow: false,
  style: {},
};

export default Card;
