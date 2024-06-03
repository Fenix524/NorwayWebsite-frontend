import css from "./UserModalForm.module.css";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import Button from "../Button/Button";
import FormInput from "../FieldsFolder/FormInput/FormInput";
import { Form, Formik } from "formik";
import { useId, useState } from "react";
import * as yup from "yup";

const userRoles = {
  ADMIN: "admin",
  MODERATOR: "moderator",
  USER: "user",
};

const roleOptions = [
  { label: "Адміністратор", value: userRoles.ADMIN },
  { label: "Користувач", value: userRoles.USER },
];

const validationSchema = yup.object().shape({
  name: yup.string().required("Ім'я є обов'язковим"),
  email: yup
    .string()
    .email("Введіть правильну адресу електронної пошти")
    .required("Електронна пошта є обов'язковою"),
  role: yup.string().required("Роль є обов'язковою"),
});

const UserModalForm = ({ initialValue, isVisible, onClose, onSubmit }) => {
  const nameId = useId();
  const emailId = useId();
  const roleId = useId();

  const { _id: id, role } = initialValue;

  return (
    <div className={css.UserModalForm}>
      <ModalWrapper onClose={onClose} isVisible={isVisible}>
        <Formik
          onSubmit={onSubmit}
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
              initialValue={{
                label: role !== "admin" ? "Користувач" : "Адміністратор",
                value: role,
              }}
              options={roleOptions}
            />
            <div className={css.btn}>
              <Button type={"submit"}>Підтвердити</Button>
            </div>
          </Form>
        </Formik>
      </ModalWrapper>
    </div>
  );
};

export default UserModalForm;
