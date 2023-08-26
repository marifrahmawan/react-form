import { useReducer, useState } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }

  if (action.type === 'BLUR') {
    return { value: state.value, isTouched: true };
  }

  if (action.type === 'RESET') {
    return { value: '', isTouched: false };
  }

  return inputStateReducer;
};

const useInput = (validateValueFn) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValueFn(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const enteredValueChangeHandler = (e) => {
    dispatch({ type: 'INPUT', value: e.target.value });
  };

  const enteredValueBlur = () => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    changeHandler: enteredValueChangeHandler,
    blurHandler: enteredValueBlur,
    reset,
  };
};

// const useInput = (validateValueFn) => {
//   const [enteredValue, setEnteredValue] = useState('');
//   const [isTouched, setIsTouched] = useState(false);

//   const valueIsValid = validateValueFn(enteredValue);
//   const hasError = !valueIsValid && isTouched;

//   const enteredValueChangeHandler = (e) => {
//     setEnteredValue(e.target.value);
//   };

//   const enteredValueBlur = () => {
//     setIsTouched(true);
//   };

//   const reset = () => {
//     setEnteredValue('');
//     setIsTouched(false);
//   };

//   return {
//     value: enteredValue,
//     isValid: valueIsValid,
//     hasError,
//     changeHandler: enteredValueChangeHandler,
//     blurHandler: enteredValueBlur,
//     reset,
//   };
// };

export default useInput;
