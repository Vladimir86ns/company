import {
	GENERAL_FORM_FAIL,
	GENERAL_FORM_FAIL_RESTART
} from '../actions/types';

const INIT_STATE = {
    errorMessages: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GENERAL_FORM_FAIL:
            return { ...state, errorMessages: action.payload };
            
        case GENERAL_FORM_FAIL_RESTART:
			return { ...state, errorMessages: {} };
			
		default: return { ...state };
    }
};
