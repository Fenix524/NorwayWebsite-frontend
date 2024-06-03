import css from "./ModalWrapper.module.css";

const ModalWrapper = ({ onClose, isVisible, children }) => {
  const handleWrapperClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.ModalWrapper} onClick={handleWrapperClick}>
      {children}
    </div>
  );
};

export default ModalWrapper;
