/**
 * Auth Actions
 */
import {
    LOGIN_USER
} from './types';

/**
 * Redux Action To Sig In User.
 */
export const loginUser = (user, history) => ({
    type: LOGIN_USER,
    payload: { history, user }
});
