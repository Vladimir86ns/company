/**
 * Auth Sagas
 */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { responseCodes } from '../constants/ResponseCode';
import { NotificationManager } from 'react-notifications';
import APP_MESSAGES from '../../src/constants/AppMessages';
import { clone } from '../../src/util/lodashFunctions';
import {
    GET_COMPANY,
    CREATE_COMPANY
} from '../actions/types';

import {
    handleCompanySuccess,
} from 'Actions';

/**
 * Get Company
 */
function* getCompanyFromServer() {
    try {
        let response = yield call(getCompanyRequest);

        if (response.status === responseCodes.HTTP_OK) {
            yield put(handleCompanySuccess(response.data));
        } else if (response.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
            NotificationManager.error(APP_MESSAGES.validationMessage);
        // yield put(responseAccountNotAcceptable(newAccount.data));
        } 
        // else {
        // // yield put(responseAccountFailure(APP_MESSAGES.requestFailed));
        // }
    } catch (error) {
        console.log('Create company error : ', error , ' ', error.response);
        // yield put(responseAccountFailure(APP_MESSAGES.requestFailed));
    }
};

/**
 * Create User
 */
function* createCompanyToServer({payload}) {
    let { company } = payload;

    try {
        let response = yield call(createCompanyRequest, company);

        if (response.status === responseCodes.HTTP_OK) {
            let { id } = response.data;
            localStorage.setItem('headquarter_company_id', id);
            NotificationManager.success(APP_MESSAGES.company.createSuccess);
        } else if (response.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
            NotificationManager.error(APP_MESSAGES.validationMessage);
        // yield put(responseAccountNotAcceptable(newAccount.data));
        } 
        // else {
        // // yield put(responseAccountFailure(APP_MESSAGES.requestFailed));
        // }
    } catch (error) {
        console.log('Create company error : ', error.response);
        // yield put(responseAccountFailure(APP_MESSAGES.requestFailed));
    }
};

/**
 * Create company.
 */
const createCompanyRequest = (company) => {
    var clonedCompany = clone(company);
    clonedCompany.user_id = localStorage.getItem('user_id');
    clonedCompany.account_id = localStorage.getItem('account_id');

    return axios.post('http://localhost:8000/api/company/create', clonedCompany , { 
            headers: 
                { Authorization: `Bearer ${localStorage.getItem('token')}`}
            }
        ).then(res => res)
        .catch(err => err.response);
};

/**
 * Get company.
 */
const getCompanyRequest = () => {
    let companyId = localStorage.getItem('headquarter_company_id');
    let accountId = localStorage.getItem('account_id');

    return axios.get(`http://localhost:8000/api/company/${companyId}/${accountId}`, { 
            headers: 
                { Authorization: `Bearer ${localStorage.getItem('token')}`}
            }
        ).then(res => res)
        .catch(err => err.response);
};

/**
 * Create User
 */
export function* createCompany() {
    yield takeEvery(CREATE_COMPANY, createCompanyToServer);
};

/**
 * Get company.
 */
export function* getCompany() {
    yield takeEvery(GET_COMPANY, getCompanyFromServer);
};

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
    yield all([
        fork(createCompany),
        fork(getCompany)
    ]);
}