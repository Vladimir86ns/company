import {
    CREATE_ACCOUNT_AND_USER
} from '../actions/types';

const INIT_STATE = {
    account: {},
    errorMessages: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CREATE_ACCOUNT_AND_USER:
			return { ...state, account: action.account };
			
        default: return { ...state };
    }
};
