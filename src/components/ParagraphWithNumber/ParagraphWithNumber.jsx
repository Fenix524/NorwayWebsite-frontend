import css from "./ParagraphWithNumber.module.css";

const ParagraphWithNumber = ({ number, reverse = false, children }) => {
  return (
    <div className={css.ParagraphWithNumber}>
      <p className={css.number}>{number}</p>
      <p className={css.text}>{children}</p>
    </div>
  );
};

export default ParagraphWithNumber;
