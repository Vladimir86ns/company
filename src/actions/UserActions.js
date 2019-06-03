import {
    CREATE_USER,
    GET_USER
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