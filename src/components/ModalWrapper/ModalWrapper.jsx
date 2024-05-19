import css from "./ModalWrapper.module.css";

const ModalWrapper = ({ children }) => {
  return <div className={css.ModalWrapper}>{children}</div>;
};

export default ModalWrapper;
