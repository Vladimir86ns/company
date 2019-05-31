/**
 * Auth User Reducers
 */
import {
    CREATE_USER,
    LOGIN_USER,
    HANDLE_USER_SUCCESS
} from '../actions/types';

/**
 * initial user
 */
const INIT_STATE = {
    user: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case CREATE_USER:
            return { ...state, 
                user: action.user
            };
        case LOGIN_USER:
            return { ...state, 
                user: action.user
            };
        case HANDLE_USER_SUCCESS:
            return { ...state, 
                user: action.payload
            };

        default: return { ...state };
    }
}
