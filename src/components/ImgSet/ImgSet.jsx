import { useState } from "react";
import PropTypes from "prop-types";
import css from "./ImgSet.module.css";
import Modal from "react-modal";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // імпортуються стрілочки

const ImgSet = ({ imgArr }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    setModalIsOpen(false);
  };

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === imgArr.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? imgArr.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={css.ImgSet}>
      {imgArr.map((img, index) => (
        <img
          className={css.img}
          key={index}
          src={img.src}
          alt={img.alt}
          onClick={() => openModal(index)}
        />
      ))}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={css.Modal}
        overlayClassName={css.Overlay}
      >
        {selectedImageIndex !== null && (
          <>
            <button className={css.PrevButton} onClick={prevImage}>
              <FaArrowLeft /> {/* Стрілка "Назад" */}
            </button>
            <img
              className={css.FullImage}
              src={imgArr[selectedImageIndex].src}
              alt="Full size"
            />
            <button className={css.NextButton} onClick={nextImage}>
              <FaArrowRight /> {/* Стрілка "Вперед" */}
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

ImgSet.propTypes = {
  imgArr: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImgSet;
