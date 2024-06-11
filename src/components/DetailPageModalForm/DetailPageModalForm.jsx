import { useDispatch } from "react-redux";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import { Link } from "react-router-dom";
import Title from "../../components/Title/Title";
import { useEffect, useId, useState } from "react";
import css from "./DetailPageModalForm.module.css";
import { HiOutlineTrash } from "react-icons/hi";
import { BiImageAdd } from "react-icons/bi";
import { addPageImg, removePageImg } from "../../utils/axios/uploadAxios";
import { imgPathNormalize } from "../../utils/imgPathNormalize";
import ImgChoice from "../imgChoice/imgChoice";
import { IoClose } from "react-icons/io5";
// import { addPageImg, removePageImg } from "../../services/api";

const DetailPageModalForm = ({
  handleClose,
  initialData = {},
  createPage,
  updatePage,
  onCreate,
  onUpdate,
}) => {
  const [formValues, setFormValues] = useState({ ...initialData });
  const [isNewPage, setIsNewPage] = useState(true);

  useEffect(() => {
    if (initialData._id) return setIsNewPage(false);

    setIsNewPage(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const addNewSection = () => {
    const newSection = {
      title: "",
      content: "",
      images: [],
    };

    formValues.sections.push(newSection);
    setFormValues({ ...formValues });
  };

  const removeSection = (removedSectionIndex) => {
    formValues.sections.splice(removedSectionIndex, 1);
    setFormValues({ ...formValues });
  };

  const handleSectionChange = (index, e) => {
    const { name, value } = e.target;

    formValues.sections[index] = {
      ...formValues.sections[index],
      [name]: value,
    };
    setFormValues({ ...formValues });
  };

  //============================================================
  const handleAddImage = async (input) => {
    console.log("Data", input);
    if (!input) return;

    try {
      if (input instanceof File) {
        console.log("file");
        const newImage = await addPageImg(input);
        formValues.images.unshift(newImage);
      } else {
        console.log("url");
        formValues.images.unshift({ url: input });
      }

      console.log(formValues);

      await updatePage(formValues._id, formValues);
      setFormValues({ ...formValues });
    } catch (error) {
      console.error("Error adding image", error);
    }
  };

  const removeImage = async (imagePath, imgIndex) => {
    try {
      formValues.images.splice(imgIndex, 1);
      const deleatedImg = await removePageImg(imagePath);

      await updatePage(formValues._id, formValues);
      setFormValues({ ...formValues });

      console.log({ imagePath, deleatedImg });
    } catch (error) {
      if (error.response.status === 404) {
        await updatePage(formValues._id, formValues);
        setFormValues({ ...formValues });
      }
      console.log(error);
    }
  };

  //============================================================
  const handleAddSectionImage = async (input, sectionIndex) => {
    console.log({ input, sectionIndex });
    if (!input) return;

    try {
      if (input instanceof File) {
        console.log("file");
        const newImage = await addPageImg(input);
        formValues.sections[sectionIndex].images.unshift(newImage.url);
      } else {
        console.log("url");
        formValues.sections[sectionIndex].images.unshift(input);
      }

      console.log(formValues);

      await updatePage(formValues._id, formValues);
      setFormValues({ ...formValues });
    } catch (error) {
      console.error("Error adding image", error);
    }
  };

  const removeSectionImage = async (sectionIndex, imagePath) => {
    try {
      formValues.sections[sectionIndex].images = formValues.sections[
        sectionIndex
      ].images.filter((img) => img !== imagePath);

      const deleatedImg = await removePageImg(imagePath);

      await updatePage(formValues._id, formValues);
      setFormValues({ ...formValues });

      console.log({ imagePath, deleatedImg });
    } catch (error) {
      if (error.response.status === 404) {
        await updatePage(formValues._id, formValues);
        setFormValues({ ...formValues });
      }
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPage = isNewPage
      ? onCreate(await createPage({ ...formValues, sections: [] }))
      : onUpdate(await updatePage(formValues._id, formValues));
    console.log(newPage);

    setFormValues(newPage);
    setIsNewPage(false);
  };

  return (
    <div className={css.modalWrapper}>
      <button className={css.closeModal} onClick={handleClose}>
        <IoClose size={40} />
      </button>
      <Container>
        <div className={css.formWrapper}>
          <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.title}>
              <Title>{formValues.name}</Title>
            </div>
            <div className={css.inputGroup}>
              <label className={css.label} htmlFor="name">
                Назва
              </label>
              <input
                className={css.field}
                id={useId()}
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
              />
            </div>
            <div className={css.inputGroup}>
              <label className={css.label} htmlFor="shortDesc">
                Короткий опис
              </label>
              <textarea
                className={css.field}
                id={useId()}
                name="shortDesc"
                value={formValues.shortDesc}
                onChange={handleInputChange}
              />
            </div>
            {!isNewPage && (
              <>
                <div className={css.middleTitle}>
                  <Title size="middle">Галерея зображень</Title>
                </div>
                <ImgChoice
                  onChangeFile={(e) => {
                    handleAddImage(e.target.files[0]);
                  }}
                  onChangeUrl={handleAddImage}
                />
                <div className={css.imgList}>
                  {formValues.images.map((img, imgIndex) => (
                    <div className={css.imgCard} key={img._id}>
                      <img
                        src={imgPathNormalize(img.url)}
                        alt={img.description}
                      />
                      <button
                        className={css.deleteBtn}
                        onClick={() => removeImage(img.url, imgIndex)}
                        type="button"
                      >
                        <HiOutlineTrash size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
            {!isNewPage && (
              <>
                <div className={css.middleTitle}>
                  <Title size="middle">Секції</Title>
                </div>
                <div className={css.sectionList}>
                  {formValues.sections.map((section, index) => (
                    <div className={css.sectionCard} key={index}>
                      <div className={css.smallTitle}>
                        <Title size="small">
                          {section.title || `Секція ${index + 1} (Нова секція)`}
                        </Title>
                      </div>
                      <div className={css.inputGroup}>
                        <label className={css.label} htmlFor={`title-${index}`}>
                          Заголовок
                        </label>
                        <input
                          className={css.field}
                          id={`title-${index}`}
                          name="title"
                          value={section.title}
                          onChange={(e) => handleSectionChange(index, e)}
                        />
                      </div>
                      <div className={css.inputGroup}>
                        <label
                          className={css.label}
                          htmlFor={`content-${index}`}
                        >
                          Зміст
                        </label>
                        <textarea
                          className={css.field}
                          id={`content-${index}`}
                          name="content"
                          value={section.content}
                          onChange={(e) => handleSectionChange(index, e)}
                        />
                      </div>
                      <ImgChoice
                        onChangeFile={(e) => {
                          handleAddSectionImage(e.target.files[0], index);
                        }}
                        onChangeUrl={(value) => {
                          handleAddSectionImage(value, index);
                        }}
                      />
                      <div className={css.imgList}>
                        {section.images.map((img) => (
                          <div className={css.imgCard} key={img}>
                            <img src={imgPathNormalize(img)} alt={"???"} />
                            <button
                              className={css.deleteBtn}
                              onClick={() => removeSectionImage(index, img)}
                              type="button"
                            >
                              <HiOutlineTrash size={20} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => removeSection(index)}
                        type="button"
                        className={css.removeSectionBtn}
                      >
                        Видалити секцію
                      </button>
                    </div>
                  ))}
                  <button
                    className={css.createSectionBtn}
                    onClick={addNewSection}
                    type="button"
                  >
                    Додати нову секцію
                  </button>
                </div>
              </>
            )}

            <Button type="submit">Зберегти</Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default DetailPageModalForm;

// const handleAddImage = async (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     try {
//       const newImage = await addPageImg(file);
//       setFormValues((prevValues) => ({
//         ...prevValues,
//         images: [...prevValues.images, newImage],
//       }));
//       // updatePage(initialData._id, formValues);
//     } catch (error) {
//       console.error("Error adding image", error);
//     }
//   }
// };

// const handleAddSectionImage = async (e, sectionIndex) => {
//   const file = e.target.files[0];
//   if (file) {
//     try {
//       const newImage = await addPageImg(file);
//       const updatedSections = [...formValues.sections];
//       updatedSections[sectionIndex].images.push(newImage);
//       setFormValues((prevValues) => ({
//         ...prevValues,
//         sections: updatedSections,
//       }));
//     } catch (error) {
//       console.error("Error adding section image", error);
//     }
//   }
// };

// const handleSectionChange = (index, e) => {
//   const { name, value } = e.target;
//   const updatedSections = [...formValues.sections];
//   updatedSections[index] = {
//     ...updatedSections[index],
//     [name]: value,
//   };
//   setFormValues((prevValues) => ({
//     ...prevValues,
//     sections: updatedSections,
//   }));
// };

// const addNewSection = () => {
//   const newSection = {
//     title: "",
//     content: "",
//     images: [],
//   };
//   setFormValues((prevValues) => ({
//     ...prevValues,
//     sections: [...prevValues.sections, newSection],
//   }));
// };

// const removeSection = (index) => {
//   const updatedSections = formValues.sections.filter((_, i) => i !== index);
//   setFormValues((prevValues) => ({
//     ...prevValues,
//     sections: updatedSections,
//   }));
// };

// const removeImage = async (imageId) => {
//   const imageToRemove = formValues.images.find((img) => img._id === imageId);
//   if (imageToRemove) {
//     try {
//       await removePageImg(imageToRemove.url);
//       const updatedImages = formValues.images.filter(
//         (img) => img._id !== imageId
//       );
//       setFormValues((prevValues) => ({
//         ...prevValues,
//         images: updatedImages,
//       }));
//       updatePage(initialData._id, formValues);
//     } catch (error) {
//       console.error("Error removing image", error);
//     }
//   }
// };

// const removeSectionImage = async (sectionIndex, imageId) => {
//   const updatedSections = [...formValues.sections];
//   const imageToRemove = updatedSections[sectionIndex].images.find(
//     (img) => img === imageId
//   );
//   console.log(imageToRemove);

// if (imageToRemove) {
//   try {
//     await removePageImg(imageToRemove);
//     const updatedImages = updatedSections[sectionIndex].images.filter(
//       (img) => img !== imageId
//     );
//     updatedSections[sectionIndex] = {
//       ...updatedSections[sectionIndex],
//       images: updatedImages,
//     };

//     setFormValues((prevValues) => ({
//       ...prevValues,
//       sections: updatedSections,
//     }));
//   } catch (error) {
//     console.error("Error removing section image", error);
//   }
// }
// };
