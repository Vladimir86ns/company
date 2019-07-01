import {
    HANDLE_EMPLOYEES_SUCCESS,
    HANDLE_EMPLOYEE_SUCCESS,
    RESET_EMPLOYEE,
    RESET_EMPLOYEES,
    CREATE_UPDATE_EMPLOYEE_FAILURE,
    CREATE_UPDATE_EMPLOYEE_FAILURE_RESTART
} from '../actions/types';

// import { isEmpty, findIndex } from '../util/lodashFunctions';

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
            // TODO find better logic to update,updated employee.

            // if (!isEmpty(state.employees.data)) {
            //     let index = findIndex(state.employees.data, (e) => e.id === action.payload.id);
            //     (index >= 0) ? state.employees.data[index] = action.payload : state.employees.data.push(action.payload);
            // }
            return { ...state, employee: action.payload };

        case RESET_EMPLOYEE:
            return { ...state, employee: {} };

        case RESET_EMPLOYEES:
            return { ...state, employees: {} };

        case CREATE_UPDATE_EMPLOYEE_FAILURE:
            return { ...state, errorMessages: action.payload };

        case CREATE_UPDATE_EMPLOYEE_FAILURE_RESTART:
            return { ...state, errorMessages: {} };

        default: return { ...state };
    }
};
