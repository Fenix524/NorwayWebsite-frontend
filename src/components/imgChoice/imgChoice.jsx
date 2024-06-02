import { useId, useState } from "react";
import css from "./imgChoice.module.css";
import { BiImageAdd } from "react-icons/bi";

const ImgChoice = ({ onChangeFile, onChangeUrl }) => {
  const id = useId();
  const [url, setUrl] = useState("");

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div className={css.imgChoice}>
      <input
        type="file"
        className={css.addImgBtn}
        onChange={onChangeFile}
        style={{ display: "none" }}
        id={`uploadSectionImage-${id}`}
      />

      <div className={css.fieldWrapper}>
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter image URL"
          className={css.urlInput}
        />
        <button
          onClick={() => {
            onChangeUrl(url);
          }}
          className={css.urlSubmitBtn}
        >
          Add URL
        </button>
      </div>

      <label htmlFor={`uploadSectionImage-${id}`} className={css.addImgBtn}>
        <BiImageAdd size={40} />
      </label>
    </div>
  );
};

export default ImgChoice;
