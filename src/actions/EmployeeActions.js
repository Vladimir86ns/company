import { 
    GET_EMPLOYEES,
    CREATE_EMPLOYEE,
    UPDATE_EMPLOYEE,
    RESET_EMPLOYEES,
    DELETE_EMPLOYEE,
    RESET_EMPLOYEE,
    HANDLE_EMPLOYEES_SUCCESS,
    HANDLE_EMPLOYEE_SUCCESS,
    CREATE_UPDATE_EMPLOYEE_FAILURE,
    CREATE_UPDATE_EMPLOYEE_FAILURE_RESTART,
    RESET_STATE_EMPLOYEE_AND_FETCH_RECOMMENDED_ID,
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
 * Update employee.
 */
export const updateEmployee = (employee) => ({
    type: UPDATE_EMPLOYEE,
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
    type: RESET_EMPLOYEE
});

/**
 * Reset employees.
 */
export const resetEmployees = () => ({
    type: RESET_EMPLOYEES
});

/**
 * Delete employee.
 */
export const deleteEmployee = (employeeId) => ({
    type: DELETE_EMPLOYEE,
    payload: { employeeId }
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

/**
 * Reset employee state, and fetch recommended id.
 */
export const resetStateAndFetchID = () => ({
    type: RESET_STATE_EMPLOYEE_AND_FETCH_RECOMMENDED_ID
});