import css from "./MiniModal.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/auth.slice";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useId } from "react";
import FormInput from "../FieldsFolder/FormInput/FormInput";
import Button from "../Button/Button";

const MiniModal = ({ name, label }) => {
  const fieldId = useId();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    [name]: yup.string().optional().required(`Поле ${label} є обов'язковим`),
    email: yup
      .string()
      .optional()
      .email("Неправильний формат електронної пошти")
      .required("Електронна пошта є обов'язковою"),
    password: yup
      .string()
      .optional()
      .min(6, "Пароль повинен містити щонайменше 6 символів")
      .required("Пароль є обов'язковим"),
  });

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log(values[name]);
    // dispatch(
    //   login({
    //     firstName: firstName,
    //     lastName: lastName,
    //     email: email,
    //     password: password,
    //   })
    // );
  };

  return (
    <>
      {/* <Header showNav={false} /> */}
      <div className={css.wrapper}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <FormInput label={label} id={fieldId} name={name} />
            <div className={css.btn}>
              <Button
                type={"submit"}
                onClick={() => {
                  dispatch(login());
                }}
              >
                Підтвердити
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default MiniModal;
