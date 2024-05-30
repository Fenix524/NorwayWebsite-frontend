import PropTypes from "prop-types";
import css from "./Button.module.css";

const Button = ({ style, type = "button", onClick, children }) => {
  return (
    <button
      className={`${css.Button} ${css[style]}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  style: PropTypes.oneOf(["normal", "transparent", "bordered"]),
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  style: "normal",
};

export default Button;
