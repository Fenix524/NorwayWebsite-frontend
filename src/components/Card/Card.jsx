import { Link } from "react-router-dom";
import Title from "../Title/Title";
import css from "./Card.module.css";

const Card = ({ title, subtitle, bgUrl }) => {
  return (
    <div
      className={css.Card}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9)), url(${bgUrl})`,
      }}
    >
      <div className={css.title}>
        <Title size="middle" level="h3">
          {title}
        </Title>
      </div>
      <p className={css.subtitle}>{subtitle}</p>
    </div>
  );
};

export default Card;
