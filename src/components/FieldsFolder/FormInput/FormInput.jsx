import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ErrorMessage, Field, useField } from "formik";
import Select from "react-select";
import clsx from "clsx";
import css from "./FormInput.module.css";

const FormInput = ({
  label,
  id,
  name,
  type = "text",
  options = [],
  initialValue = {},
  onChange = () => {},
}) => {
  const [field, meta, helpers] = useField(name);
  const { touched, error } = meta;

  const [selectValue, setSelectValue] = useState(
    initialValue || { value: "", label: "" }
  );

  useEffect(() => {
    if (type === "select") {
      setSelectValue(initialValue);
    }
  }, [initialValue, type]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: 50,
      width: "100%",
      borderRadius: 11,
      border: state.isFocused
        ? "2px dashed #0fc6ee"
        : "1px solid rgba(0, 0, 0, 0.162)",
      "&:hover": {
        borderColor: state.isFocused ? null : "1px solid rgba(0, 0, 0, 0.162)",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#0fc6ee" : null,
      color: state.isSelected ? "#ffffff" : "#000000",
      "&:hover": {
        backgroundColor: "#f0f0f0",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000000",
    }),
  };

  const fieldClasses = clsx(css.fieldIndicator, {
    [css.error]: touched && error,
    [css.success]: touched && !error,
  });

  const handleChange = (selectedOption) => {
    setSelectValue(selectedOption);
    helpers.setValue(selectedOption.value);
  };

  return (
    <div className={css.wrapper}>
      <label className={css.label} htmlFor={id}>
        {label}
      </label>
      <div className={css.fieldWrapper}>
        {type === "select" ? (
          <Select
            className={css.selectField}
            options={options}
            name={name}
            id={id}
            value={selectValue}
            onChange={handleChange}
            styles={customStyles}
          />
        ) : type === "textarea" ? (
          <Field
            className={`${css.textareaField} ${css.inputField}`}
            name={name}
            as="textarea"
            id={id}
            onChange={onChange}
          />
        ) : type === "file" ? (
          <Field
            className={`${css.fileField} ${css.inputField}`}
            name={name}
            type="file"
            id={id}
            onChange={onChange}
          />
        ) : (
          <Field className={css.inputField} name={name} type={type} id={id} />
        )}
        <span className={fieldClasses}></span>
      </div>
      <ErrorMessage className={css.fieldError} name={name} component="span" />
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "textarea", "select", "file"]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  initialValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ]),
};

FormInput.defaultProps = {
  type: "text",
  options: [],
  initialValue: "",
};

export default FormInput;
