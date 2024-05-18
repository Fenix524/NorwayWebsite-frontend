import css from "./Title.module.css";
import PropTypes from "prop-types";

const Title = ({ size='large', level = "h2", desc, children }) => {
  // Визначаємо клас на основі пропса size
  const sizeClass =
    size === "large" ? css.large : size === "middle" ? css.middle : css.small;

  // Визначаємо тег на основі пропса level
  const Tag = level;

  return (
    <div className={css.titleContainer}>
      <Tag className={`${css.Title} ${sizeClass}`}>{children}</Tag>
      <p className={css.desc}>{desc}</p>
    </div>
  );
};

Title.propTypes = {
  size: PropTypes.oneOf(["large", "middle", "small"]).isRequired,
  level: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]).isRequired,
  desc: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Title;
