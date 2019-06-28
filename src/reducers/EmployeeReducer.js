import {
    HANDLE_EMPLOYEES_SUCCESS,
    HANDLE_EMPLOYEE_SUCCESS,
    RESET_EMPLOYEES,
    CREATE_UPDATE_EMPLOYEE_FAILURE,
    CREATE_UPDATE_EMPLOYEE_FAILURE_RESTART
} from '../actions/types';

const INIT_STATE = {
    employees: {},
    employee: {},
    errorMessages: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case HANDLE_EMPLOYEES_SUCCESS:
            return { ...state, employees: action.payload };
        case HANDLE_EMPLOYEE_SUCCESS:
            return { ...state, employee: action.payload };
        case RESET_EMPLOYEES:
            return { ...state, employee: {} };
        case CREATE_UPDATE_EMPLOYEE_FAILURE:
            return { ...state, errorMessages: action.payload };
        case CREATE_UPDATE_EMPLOYEE_FAILURE_RESTART:
            return { ...state, errorMessages: {} };

        default: return { ...state };
    }
};
