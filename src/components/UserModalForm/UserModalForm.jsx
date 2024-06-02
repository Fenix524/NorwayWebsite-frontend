import css from "./UserModalForm.module.css";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import Button from "../Button/Button";
import FormInput from "../FieldsFolder/FormInput/FormInput";
import { Form, Formik } from "formik";
import { useId } from "react";
import * as yup from "yup";

const userRoleOptions = {
  ADMIN: "admin",
  MODERATOR: "moderator",
  USER: "user",
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Ім'я є обов'язковим"),
  email: yup
    .string()
    .email("Введіть правильну адресу електронної пошти")
    .required("Електронна пошта є обов'язковою"),
  role: yup.string().required("Роль є обов'язковою"),
});

const UserModalForm = ({ initialValue, isVisible, onClose }) => {
  const nameId = useId();
  const emailId = useId();
  const roleId = useId();

  return (
    <div className={css.UserModalForm}>
      {isVisible && (
        <ModalWrapper setIsVisible={onClose} isVisible={isVisible}>
          <Formik
            onSubmit={(value) => {
              console.log(value);
            }}
            initialValues={initialValue}
            validationSchema={validationSchema}
          >
            <Form
              className={css.form}
              enctype="multipart/form-data"
              method="post"
            >
              <FormInput id={nameId} label={"Імя"} name={"name"} />
              <FormInput
                id={emailId}
                label={"Пошта"}
                name={"email"}
                type={"email"}
              />
              <FormInput
                id={roleId}
                label={"Роль"}
                name={"role"}
                type={"select"}
                options={userRoleOptions}
              />
              <div className={css.btn}>
                <Button type={"submit"}>Підтвердити</Button>
              </div>
            </Form>
          </Formik>
        </ModalWrapper>
      )}
    </div>
  );
};

export default UserModalForm;
