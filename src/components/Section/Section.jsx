import React from "react";
import css from "./Section.module.css";

const Section = ({ children }) => {
  // Динамічно додаємо стилі для відступу
  // const sectionStyle = {
  //   padding: padding
  // };

  return <section className={css.Section}>{children}</section>;
};

export default Section;
