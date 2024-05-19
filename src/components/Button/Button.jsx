import React from "react";
import PropTypes from "prop-types";
import css from "./Button.module.css";

const Button = ({ style, type = "button", onClick, children }) => {
  return (
    <div className={`${css.Button} ${css[style]}`} onClick={onClick}>
      {children}
    </div>
  );
};

Button.propTypes = {
  style: PropTypes.oneOf(["normal", "transparent", "bordered"]),
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  style: "normal",
};

export default Button;
