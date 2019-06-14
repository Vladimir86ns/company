import {
    CREATE_COMPANY,
    GET_COMPANY,
    UPDATE_COMPANY,
    UPDATE_CREATE_COMPANY_FAILURE,
    UPDATE_CREATE_COMPANY_FAILURE_RESTART,
    HANDLE_COMPANY_SUCCESS
} from './types';

/**
 * Create new company.
 */
export const createCompany = (company) => ({
    type: CREATE_COMPANY,
    payload: { company }
});

/**
 * Update company.
 */
export const updateCompany = (company) => ({
    type: UPDATE_COMPANY,
    payload: { company }
});

/**
 * Get company.
 */
export const getCompanyByIdAndAccountId = () => ({
    type: GET_COMPANY
});

/**
 * Redux action update or create company failure.
 */
export const updateCreateCompanyFailure = (messages) => ({
    type: UPDATE_CREATE_COMPANY_FAILURE,
    payload: { messages }
});

/**
 * Redux action update or create company failure restart.
 */
export const updateCreateCompanyFailureRestart = () => ({
    type: UPDATE_CREATE_COMPANY_FAILURE_RESTART
});

/**
 * Redux action company success.
 */
export const handleCompanySuccess = (company) => ({
    type: HANDLE_COMPANY_SUCCESS,
    payload: company
});