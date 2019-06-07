import {
    CREATE_USER,
    GET_USER,
    UPDATE_USER,
    UPDATE_USER_FAILURE,
    UPDATE_USER_FAILURE_RESTART
} from './types';

/**
 * Create New User.
 */
export const createUser = (user, history) => ({
    type: CREATE_USER,
    payload: { user, history }
});

/**
 * Get User.
 */
export const getUserByIdAndAccountId = () => ({
    type: GET_USER
});

/**
 * Update New User.
 */
export const updateUser = (user) => ({
    type: UPDATE_USER,
    payload: { user }
});

/**
 * Redux Action Update User Failure.
 */
export const updateUserFailure = (messages) => ({
    type: UPDATE_USER_FAILURE,
    payload: messages
});

/**
 * Redux Action Update User Failure Restart.
 */
export const updateUserFailureRestart = () => ({
    type: UPDATE_USER_FAILURE_RESTART
});
