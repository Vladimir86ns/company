import {
    CREATE_USER
} from './types';

/**
 * Create New User.
 */
export const createUser = (user, history) => ({
    type: CREATE_USER,
    payload: { user, history }
});