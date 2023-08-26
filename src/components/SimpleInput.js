import { useEffect, useState } from 'react';
import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const {
    value: nameInput,
    isValid: nameInputIsValid,
    hasError: nameInputError,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((nameInput) => nameInput.trim().length > 5);

  const {
    value: emailInput,
    isValid: emailInputIsValid,
    hasError: emailInputHasError,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((emailInput) => emailInput.trim().includes('@'));

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (nameInputIsValid && emailInputIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [nameInputIsValid, emailInputIsValid]);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(nameInput);
    console.log(emailInput);

    resetNameInput();
    resetEmailInput();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={`form-control ${nameInputError ? 'invalid' : ''}`}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={nameInput}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameInputError && <p className="error-text">Name Can't be empty</p>}
      </div>
      <div className={`form-control ${emailInputHasError ? 'invalid' : ''}`}>
        <label htmlFor="email">Your E-Mail</label>
        <input
          type="text"
          id="email"
          value={emailInput}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailInputHasError && (
          <p className="error-text">Enter a Valid Email</p>
        )}
      </div>
      <div className="form-actions">
        <button type="submit" disabled={!formIsValid}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;
