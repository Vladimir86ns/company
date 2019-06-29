import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import laravelApi from '../api/index';
import { responseCodes } from '../constants/ResponseCode';
import APP_MESSAGES from '../constants/AppMessages';
import { NotificationManager } from 'react-notifications';
import {
    GET_EMPLOYEES,
    CREATE_EMPLOYEE
} from '../actions/types';

import {
    handleEmployeesSuccess,
    handleEmployeeSuccess,
    createUpdateEmployeeFailure
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
 * Create employee.
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
        } else if (response.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
            NotificationManager.error(APP_MESSAGES.error.validationMessage);
            yield put(createUpdateEmployeeFailure(response.data));
        }
    } catch (error) {
        console.log('Create / update employee error : ', error, ' ', error.response);
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
        .catch(err => err.response);;
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
 * Auth Root Saga
 */
export default function* rootSaga() {
    yield all([
        fork(getEmployees),
        fork(createEmployees)
    ]);
}