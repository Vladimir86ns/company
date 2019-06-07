/**
 * Auth User Reducers
 */
import {
    CREATE_USER,
    LOGIN_USER,
    HANDLE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_FAILURE_RESTART
} from '../actions/types';

/**
 * initial user
 */
const INIT_STATE = {
    user: {},
    errorMessages: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CREATE_USER:
            return { ...state, user: action.user };

        case LOGIN_USER:
            return { ...state, user: action.user };

        case HANDLE_USER_SUCCESS:
            return { ...state, user: action.payload };

        case UPDATE_USER_FAILURE:
            return { ...state, errorMessages: action.payload };
            
        case UPDATE_USER_FAILURE_RESTART:
            return { ...state, errorMessages: {} };

        default: return { ...state };
    }
}
