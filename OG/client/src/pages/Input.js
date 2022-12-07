import React, { useReducer, useEffect } from "react";
import styles from './Input.module.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: action.val !== "",
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const {
    id,
    onInput,
    errorMessage,
    type,
    label,
  } = props;
  const { value, isValid, isTouched } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({ type: "CHANGE", val: event.target.value });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  return (
    <div className={styles.input}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={id}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={value}
      />
      {!isValid && isTouched && <p>{errorMessage}</p>}
    </div>
  );
};

export default Input;
