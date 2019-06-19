import React from 'react';
import IntlMessages from './IntlMessages';
import { validationLanguages } from '../constants/ValidationLanguages';
import SimpleReactValidator from 'simple-react-validator';

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
        if (origin[key] === null) {
            updatedValues[key] = trim(comparing[key]);
            return;
        } 
        if (trim(comparing[key]) !== trim(origin[key])) {
            updatedValues[key] = trim(comparing[key]);
        }
    });

    return updatedValues;
};

/**
 * Get locale validation message.
 * 
 * @param {string} localeKey
 */
export function setUpValidationMessageLanguage(localeKey) {
    if (typeof validationLanguages[localeKey] !== 'undefined') {
        SimpleReactValidator.addLocale(localeKey, validationLanguages[localeKey]);
        return new SimpleReactValidator({ locale: localeKey });
    }
    return new SimpleReactValidator();
};

/**
 * Return validation message for field.
 * 
 * @param {string} field 
 * @param {string} validationRule 
 * @param {string} stateField 
 * @param {object} validator 
 */
export function getValidationMessage(field, validationRule, stateField, validator) {
    return (
        <div style={{color: 'red', fontSize: '15px'}}>
            {validator.message(field, stateField, validationRule)}
        </div>
    );
};

/**
 * Trim the value.
 * 
 * @param {string} val
 */
function trim (val) {
    return val.trim();
};