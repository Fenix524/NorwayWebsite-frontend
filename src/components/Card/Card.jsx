import Title from "../Title/Title";
import css from "./Card.module.css";

const Card = ({ title, subtitle, onClick }) => {
  return (
    <div className={css.Card} onClick={onClick}>
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
