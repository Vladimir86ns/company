import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import laravelApi from '../api/index';
import { responseCodes } from '../constants/ResponseCode';
import {
    GET_EMPLOYEES
} from '../actions/types';

import {
    handleEmployeesSuccess
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
            yield put(handleEmployeesSuccess(response.data.data));
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
        .catch(err => err.response);;
};

/**
 * Get employees from company.
 */
export function* getEmployees() {
    yield takeEvery(GET_EMPLOYEES, getEmployeesFromServer);
};

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
    yield all([
        fork(getEmployees),
    ]);
}