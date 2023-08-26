import { useState } from 'react';

const useInput = (validateValueFn) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValueFn(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const enteredValueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const enteredValueBlur = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    changeHandler: enteredValueChangeHandler,
    blurHandler: enteredValueBlur,
    reset,
  };
};

export default useInput;
