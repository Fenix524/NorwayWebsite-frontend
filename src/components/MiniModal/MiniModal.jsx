import css from "./MiniModal.module.css";
import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useId } from "react";
import FormInput from "../FieldsFolder/FormInput/FormInput";
import Button from "../Button/Button";
import { logIn } from "../../redux/auth/auth.operations";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

const MiniModal = ({ name, label, onClose, onSubmit }) => {
  const fieldId = useId();

  const initialValues = {
    [name]: "",
  };

  const validationSchema = yup.object().shape({
    [name]: yup.string().optional().required(`Поле ${label} є обов'язковим`),
  });

  return (
    <ModalWrapper onClose={onClose}>
      <div className={css.wrapper}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Form className={css.form} onSubmit={handleSubmit}>
              <FormInput label={label} id={fieldId} name={name} />
              <div className={css.btn}>
                <Button type="submit">Підтвердити</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalWrapper>
  );
};

export default MiniModal;
