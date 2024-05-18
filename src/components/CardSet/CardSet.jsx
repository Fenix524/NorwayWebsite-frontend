import React from "react";
import css from "./CardSet.module.css";

const CardSet = ({ children }) => {
  return <ul className={css.CardSet}>{children}</ul>;
};

export default CardSet;
