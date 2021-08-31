import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsvalid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsvalid,
        city: enteredCityIsValid,
        postalCode: enteredPostalCodeIsValid
      });  

    const formIsValid = enteredNameIsValid &&
          enteredStreetIsvalid &&
          enteredCityIsValid &&
          enteredPostalCodeIsValid;


          if(!formIsValid){
            return;
          }
      
      props.onConfirm ({
        name: enteredName,
        street: enteredStreet,
        city: enteredCity,
        postalCode: enteredPostalCode,
      });

  };

const nameControlclasses = `${classes.control} 
    ${formInputValidity.name ? '' : classes.invalid}`;

    const streetControlclasses = `${classes.control} 
    ${formInputValidity.street ? '' : classes.invalid}`;

    const postalCodeControlclasses = `${classes.control} 
    ${formInputValidity.postalCode ? '' : classes.invalid}`;

    const cityControlclasses = `${classes.control} 
    ${formInputValidity.city ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlclasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValidity.name && <p> plz enter vaild name </p>}
      </div>
      <div className={streetControlclasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputValidity.street && <p> plz enter vaild street! </p>}
      </div>
      <div className={postalCodeControlclasses} >
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && <p> plz enter vaild code(5 char) </p>}
      </div>
      <div className={cityControlclasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputValidity.city && <p> plz enter vaild city </p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}> Confirm </button>
      </div>
    </form>
  );
};

export default Checkout;