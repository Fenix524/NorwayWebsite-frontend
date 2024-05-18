import React from "react";
import PropTypes from "prop-types";
import { PlaceholderImage } from "react-placeholder-image"; // Імпортуйте компонент PlaceholderImage з бібліотеки

const Img = ({ src, alt }) => {
  // Перевіряємо, чи передано правильне значення src
  if (!src || typeof src !== "string" || src.trim() === "") {
    return <PlaceholderImage width={300} height={200} alt={alt} />;
  }

  return <img src={src} alt={alt} />;
};

Img.propTypes = {
  src: PropTypes.string, // src не обов'язковий
  alt: PropTypes.string.isRequired,
};

export default Img;
