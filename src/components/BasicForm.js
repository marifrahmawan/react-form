import { useEffect, useState } from 'react';
import useInput from '../hooks/use-input';

const BasicForm = (props) => {
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    changeHandler: firstNameHandler,
    blurHandler: firtsNameBlur,
    reset: resetFirstName,
  } = useInput((firstName) => firstName.trim().length > 5);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    changeHandler: lastNameHandler,
    blurHandler: lastNameBlur,
    reset: resetLastName,
  } = useInput((lastName) => lastName.trim().length > 5);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    changeHandler: emailHandler,
    blurHandler: emailBlur,
    reset: resetEmail,
  } = useInput((email) => email.trim().includes('@'));

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (firstNameIsValid && lastNameIsValid && emailIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [firstNameIsValid, lastNameIsValid, emailIsValid]);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(firstNameValue, lastNameValue, emailValue);

    resetFirstName();
    resetLastName();
    resetEmail();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={`form-control ${firstNameHasError ? 'invalid' : ''}`}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstNameValue}
            onChange={firstNameHandler}
            onBlur={firtsNameBlur}
          />
          {firstNameHasError && (
            <p className="error-text">First Name Cant be Empty</p>
          )}
        </div>
        <div className={`form-control ${lastNameHasError ? 'invalid' : ''}`}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastNameValue}
            onChange={lastNameHandler}
            onBlur={lastNameBlur}
          />
          {lastNameHasError && (
            <p className="error-text">Last Name Cant be Empty</p>
          )} 
        </div>
      </div>
      <div className={`form-control ${emailHasError ? 'invalid' : ''}`}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="email"
          value={emailValue}
          onChange={emailHandler}
          onBlur={emailBlur}
        />
        {emailHasError && <p className="error-text">Enter a Valid Email</p>}
      </div>
      <div className="form-actions">
        <button type="submit" disabled={!formIsValid}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default BasicForm;
