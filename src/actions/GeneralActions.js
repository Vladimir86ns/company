import {
	GENERAL_FORM_FAIL,
	GENERAL_FORM_FAIL_RESTART
} from './types';

/**
 * Redux Action form fail.
 */
export const generalFormFailure = (messages) => ({
    type: GENERAL_FORM_FAIL,
    payload: messages
});

/**
 * Redux Action form fail message restart.
 */
export const generalFormFailureRestart = () => ({
    type: GENERAL_FORM_FAIL_RESTART
});