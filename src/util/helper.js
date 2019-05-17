import IntlMessages from './IntlMessages'; 
 
 /**
   * Return error message, or required. 
   * 
   * @param {string} message message to display.
   * @param {boolean} required is field required or not.
   * @return {string} message.
  */
export const formErrorMessage = (message, required = false) => {
    if (message) {
        return message;
    }
        
    if (required) {
        return <IntlMessages id="form.formErrorMessage.required"/>;
    }
        
    return '';
};

