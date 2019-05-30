/**
 * Auth User Reducers
 */
import { NotificationManager } from 'react-notifications';
import {
    CREATE_USER,
    LOGIN_USER
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

        default: return { ...state };
    }
}
