import { 
    GET_EMPLOYEES,
    HANDLE_EMPLOYEES_SUCCESS
 } from "./types";

/**
 * Get employees.
 */
export const getEmployees = () => ({
    type: GET_EMPLOYEES
});

/**
 * Handle employees success.
 */
export const handleEmployeesSuccess = (employees) => ({
    type: HANDLE_EMPLOYEES_SUCCESS,
    payload: employees
});