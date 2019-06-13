/**
 * Auth User Reducers
 */
import {
    GET_COMPANY,
    CREATE_COMPANY,
    UPDATE_CREATE_COMPANY_FAILURE,
    UPDATE_CREATE_COMPANY_FAILURE_RESTART,
    HANDLE_COMPANY_SUCCESS
} from '../actions/types';

/**
 * initial user
 */
const INIT_STATE = {
    company: {},
    errorMessages: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_COMPANY:
            return { ...state, company: action.company };

        case CREATE_COMPANY:
            return { ...state, company: action.payload.company };

        case UPDATE_CREATE_COMPANY_FAILURE:
            return { ...state, errorMessages: action.payload.messages };
            
        case UPDATE_CREATE_COMPANY_FAILURE_RESTART:
            return { ...state, errorMessages: {} };

        case HANDLE_COMPANY_SUCCESS:
            return { ...state, company: action.payload };

        default: return { ...state };
    }
}
