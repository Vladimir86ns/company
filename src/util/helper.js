import IntlMessages from './IntlMessages'; 
 
/**
 * Return error message, or required. 
 * 
 * @param {string} message message to display.
 * @param {boolean} required is field required or not.
 * 
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

/**
 * Compare values, and return only changed values.
 * 
 * @param {object} origin 
 * @param {object} comparing 
 * 
 * @return {object}
 */
export function getOnlyUpdatedValues(origin, comparing) {
    var updatedValues = {};

     Object.keys(comparing).forEach((key) => {
        if (trim(comparing[key]) !== trim(origin[key])) {
            updatedValues[key] = trim(comparing[key]);
        }
    });

    return updatedValues;
};

/**
 * Trim the value.
 * 
 * @param {string} val;
 */
function trim (val) {
    return val.trim();
};

