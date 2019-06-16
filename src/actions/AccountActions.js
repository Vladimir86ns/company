import {
    CREATE_ACCOUNT_AND_USER
} from './types';

/**
 * Create account and user.
 */
export const createAccountAndUser = (account, history) => ({
    type: CREATE_ACCOUNT_AND_USER,
    payload: { account, history }
});