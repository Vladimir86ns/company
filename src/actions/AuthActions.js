/**
 * Auth Actions
 */
import {
    LOGIN_USER,
    HANDLE_USER_SUCCESS,
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
 * Redux Action Handle User Success.
 */
export const handleUserSuccess = (user) => ({
    type: HANDLE_USER_SUCCESS,
    payload: user
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
