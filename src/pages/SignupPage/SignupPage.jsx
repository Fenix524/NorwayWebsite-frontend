import css from "./SignupPage.module.css";
import { useDispatch } from "react-redux";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import FormInput from "../../components/FieldsFolder/FormInput/FormInput";
import Title from "../../components/Title/Title";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useId } from "react";
import { register } from "../../redux/auth/auth.operations";

const SignupPage = () => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Неправильний формат електронної пошти")
      .required("Електронна пошта є обов'язковою"),
    password: yup
      .string()
      .min(6, "Пароль повинен містити щонайменше 6 символів")
      .required("Пароль є обов'язковим"),
    name: yup
      .string()
      .trim("Будь ласка, видаліть пробіли на початку та в кінці")
      .required("Ім'я є обов'язковим"),
  });

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    // Отримання даних з форми
    console.log("Значення=====", values);
    console.log("Name:", values.name);
    console.log("Email:", values.email);
    console.log("Password:", values.password);
    const { name, email, password } = values;

    dispatch(
      register({
        name: name,
        email: email,
        password: password,
      })
    );
  };

  return (
    <>
      {/* <Header showNav={false} /> */}
      <div className={css.mainWrapper}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <div className={css.title}>
              <Title>Реєстрація</Title>
            </div>
            <FormInput label="імя" id={nameFieldId} name="name" />
            <FormInput label="Пошта" id={emailFieldId} name="email" />
            <FormInput
              label="Пароль"
              id={passwordFieldId}
              name="password"
              fieldContentType="password"
            />
            <div className={css.btn}>
              <Button type={"submit"}>Підтвердити</Button>
            </div>
            <div className={css.helpBar}>
              <Link to={"/authorization"}>Увійти до профілю?</Link>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};
export default SignupPage;
