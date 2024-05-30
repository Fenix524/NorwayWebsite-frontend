import { useDispatch } from "react-redux";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import FormInput from "../../components/FieldsFolder/FormInput/FormInput";
import Title from "../../components/Title/Title";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useId } from "react";
import css from "./DetailPageModalForm.module.css";

const DetailPageModalForm = ({ handleClose, initialData, handleSave }) => {
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const initialValues = {
    name: "",
    shortDesc: "",
    pageType: "",
    images: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Обов'язкове поле"),
    shortDesc: yup.string().required("Обов'язкове поле"),
    pageType: yup.string().required("Обов'язкове поле"),
    images: yup.array().of(
      yup.object().shape({
        url: yup.string().url("Невірний URL").required("Обов'язкове поле"),
        description: yup.string().required("Обов'язкове поле"),
      })
    ),
    sections: yup.array().of(
      yup.object().shape({
        title: yup.string().required("Обов'язкове поле"),
        content: yup.string().required("Обов'язкове поле"),
        images: yup.array().of(yup.string().url("Невірний URL")),
      })
    ),
  });

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log("12333333333333333331111111111111222222222222222");
    // Отримання даних з форми
    console.log(values);
  };

  return (
    <>
      {/* <Header showNav={false} /> */}
      <div className={css.modalWrapper}>
        <div className={css.formWrapper}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className={css.form}>
              <div className={css.title}>
                <Title>Авторизація</Title>
              </div>
              <FormInput label="Назва" id={emailFieldId} name="name" />
              <FormInput
                label="Короткий опис"
                id={emailFieldId}
                type="textarea"
                name="shortDesc"
              />
              <FormInput
                label="Тип"
                id={emailFieldId}
                type="select"
                name="pageType"
                options={[
                  { label: "Місто", value: "City" },
                  { label: "Памятка", value: "Landmark" },
                ]}
              />
              <div className={css.imgList}></div>
              <FormInput
                label="Загальна галерея зображень"
                type="file"
                id="files"
                onChange={(values) => {
                  console.log(values);
                }}
                name="images"
                multiple
              ></FormInput>

              <Button type="submit">Відправити</Button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default DetailPageModalForm;
