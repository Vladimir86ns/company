import React from 'react';

// helper function
import {
  formErrorMessage
} from '../../../src/util/index';

const FormErrorMessage = ({message, required = false}) => {
  if (message) {
    return (<p style={{color: 'red'}}>{formErrorMessage(message, required)}</p>);
  }
  return  (<p>{formErrorMessage(message, required)}</p>) 
}

export default FormErrorMessage;