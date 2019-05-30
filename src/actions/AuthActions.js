/**
 * Auth Actions
 */
import {
    LOGIN_USER,
    LOGIN_USER_FAILURE,
    LOGIN_USER_FAILURE_RESTART
} from './types';

/**
 * Redux Action To Sig In User.
 */
export const loginUser = (user, history) => ({
    type: LOGIN_USER,
    payload: { history, user }
});

/**
 * Redux Action Login User Failure.
 */
export const loginUserFailure = (messages) => ({
    type: LOGIN_USER_FAILURE,
    payload: messages
});

/**
 * Redux Action Login User Failure Restart.
 */
export const loginUserFailureRestart = () => ({
    type: LOGIN_USER_FAILURE_RESTART
});
