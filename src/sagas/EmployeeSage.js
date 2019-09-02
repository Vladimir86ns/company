import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import laravelApi from '../api/index';
import { responseCodes } from '../constants/ResponseCode';
import APP_MESSAGES from '../constants/AppMessages';
import { NotificationManager } from 'react-notifications';
import {
    GET_EMPLOYEES,
    CREATE_EMPLOYEE,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE
} from '../actions/types';

import {
    getEmployees as getEmployeesFromAPI,
    resetEmployees,
    handleEmployeesSuccess,
    handleEmployeeSuccess,
    createUpdateEmployeeFailure,
    resetStateAndFetchID,
} from 'Actions';

/**
 * Get employee from server.
 */
function* getEmployeesFromServer() {
    try {
        let accountId = localStorage.getItem('account_id');
        let companyId = localStorage.getItem('headquarter_company_id');
        let response = yield call(getEmployeeRequest, accountId, companyId);

        if (response.status === responseCodes.HTTP_OK) {
            yield put(handleEmployeesSuccess(response.data));
        }
    } catch (error) {
        console.log('Get employees error : ', error, ' ', error.response);
    }
};

/**
 * Create employee, then reset employees, and reset state and fetch new recommended ID.
 * 
 * @param {object} action 
 */
function* createEmployeeToServer({payload}) {
    let { employee } = payload;

    try {
        let response = yield call(createEmployeeRequest, employee);
        if (response.status === responseCodes.HTTP_OK) {
            NotificationManager.success(APP_MESSAGES.employee.createSuccess);
            yield put(handleEmployeeSuccess(response.data.data));
            yield put(resetEmployees());
            yield put(resetStateAndFetchID());
        } else if (response.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
            NotificationManager.error(APP_MESSAGES.error.validationMessage);
            yield put(createUpdateEmployeeFailure(response.data));
        }
    } catch (error) {
        console.log('Create employee error : ', error, ' ', error.response);
    }
};

/**
 * Update employee.
 * 
 * @param {object} action 
 */
function* updateEmployeeToServer({payload}) {
    let { employee } = payload;

    try {
        let response = yield call(updateEmployeeRequest, employee);
        if (response.status === responseCodes.HTTP_OK) {
            NotificationManager.success(APP_MESSAGES.employee.updateSuccess);
            yield put(handleEmployeeSuccess(response.data.data));
            yield put(getEmployeesFromAPI());
        } else if (response.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
            NotificationManager.error(APP_MESSAGES.error.validationMessage);
            yield put(createUpdateEmployeeFailure(response.data));
        }
    } catch (error) {
        console.log('Update employee error : ', error, ' ', error.response);
    }
};

/**
 * Delete employee from server.
 */
function* deleteEmployeeToServer({payload}) {
    try {
        let accountId = localStorage.getItem('account_id');
        let companyId = localStorage.getItem('headquarter_company_id');
        let employeeId = payload.employeeId;
        let response = yield call(deleteEmployeeRequest, accountId, companyId, employeeId);

        if (response.status === responseCodes.HTTP_OK) {
            yield put(getEmployeesFromAPI());
            NotificationManager.success(APP_MESSAGES.employee.deleteSuccess);
        }
    } catch (error) {
        console.log('Get employees error : ', error, ' ', error.response);
    }
};

/**
 * Get employees request.
 * 
 * @param {string} accountId
 * @param {string} companyId 
 */
const getEmployeeRequest = (accountId, companyId) => {
    return laravelApi.get(`account/${accountId}/company/${companyId}/employees`)
        .then(res => res)
        .catch(err => err.response);
};

/**
 * Delete employees request.
 * 
 * @param {string} accountId
 * @param {string} companyId 
 * @param {string} employeeId 
 */
const deleteEmployeeRequest = (accountId, companyId, employeeId) => {
    return laravelApi.delete(`account/${accountId}/company/${companyId}/employee/${employeeId}/delete`)
        .then(res => res)
        .catch(err => err.response);
};

/**
 * Create employee made request.
 * 
 * @param {object} user 
 */
const createEmployeeRequest = (employee) => {
    employee.company_id = localStorage.getItem('headquarter_company_id');
    employee.account_id = localStorage.getItem('account_id');

    return laravelApi.post('/account/company/employee/create', employee)
        .then(res => res)
        .catch(err => err.response);
};

/**
 * Update employee made request.
 * 
 * @param {object} user 
 */
const updateEmployeeRequest = (employee) => {
    employee.company_id = localStorage.getItem('headquarter_company_id');
    employee.account_id = localStorage.getItem('account_id');

    return laravelApi.patch('/account/company/employee/update', employee)
        .then(res => res)
        .catch(err => err.response);
};

/**
 * Get employees from company.
 */
export function* getEmployees() {
    yield takeEvery(GET_EMPLOYEES, getEmployeesFromServer);
};

/**
 * Create employee.
 */
export function* createEmployees() {
    yield takeEvery(CREATE_EMPLOYEE, createEmployeeToServer);
};

/**
 * Update employee.
 */
export function* updateEmployees() {
    yield takeEvery(UPDATE_EMPLOYEE, updateEmployeeToServer);
};

/**
 * Delete employee.
 */
export function* deleteEmployees() {
    yield takeEvery(DELETE_EMPLOYEE, deleteEmployeeToServer);
};

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
    yield all([
        fork(getEmployees),
        fork(createEmployees),
        fork(updateEmployees),
        fork(deleteEmployees)
    ]);
}