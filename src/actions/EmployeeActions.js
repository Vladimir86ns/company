import { 
    GET_EMPLOYEES,
    CREATE_EMPLOYEE,
    RESET_EMPLOYEES,
    HANDLE_EMPLOYEES_SUCCESS,
    HANDLE_EMPLOYEE_SUCCESS,
    CREATE_UPDATE_EMPLOYEE_FAILURE,
    CREATE_UPDATE_EMPLOYEE_FAILURE_RESTART
 } from "./types";

/**
 * Get employees.
 */
export const getEmployees = () => ({
    type: GET_EMPLOYEES
});

/**
 * Create employee.
 */
export const createEmployee = (employee) => ({
    type: CREATE_EMPLOYEE,
    payload: { employee }
});

/**
 * Handle employees success.
 */
export const handleEmployeesSuccess = (employees) => ({
    type: HANDLE_EMPLOYEES_SUCCESS,
    payload: employees
});

/**
 * Reset employee.
 */
export const resetEmployee = () => ({
    type: RESET_EMPLOYEES
});

/**
 * Handle employee success.
 */
export const handleEmployeeSuccess = (employee) => ({
    type: HANDLE_EMPLOYEE_SUCCESS,
    payload: employee
});

/**
 * Handle create / update employee errors.
 */
export const createUpdateEmployeeFailure = (messages) => ({
    type: CREATE_UPDATE_EMPLOYEE_FAILURE,
    payload: messages
});

/**
 * Reset employee message from server.
 */
export const createUpdateEmployeeFailureRestart = () => ({
    type: CREATE_UPDATE_EMPLOYEE_FAILURE_RESTART
});