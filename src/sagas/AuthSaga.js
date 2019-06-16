import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import laravelApi from '../../src/api/index';
import { responseCodes } from '../constants/ResponseCode';
import { NotificationManager } from 'react-notifications';
import APP_MESSAGES from '../../src/constants/AppMessages';

import {
    LOGIN_USER
} from 'Actions/types';

import {
    loginUserFailure,
    handleUserSuccess
} from 'Actions';

/**
 * Login to server.
 * 
 * @param {object} payload 
 */
function* loginUserOnServer({ payload }) {
    const { email, password } = payload.user;
    const { history } = payload;
    try {
        const response = yield call(loginUserRequest, email, password);
        if (response.status === responseCodes.HTTP_OK) {
            let { id, account_id, token, headquarter_company_id } = response.data;
            localStorage.setItem('account_id', account_id);
            localStorage.setItem('user_id', id);
            localStorage.setItem('token', token);
            localStorage.setItem('headquarter_company_id', headquarter_company_id);
            history.push('/app/dashboard/ecommerce');
            yield put(handleUserSuccess(response.data));
        } else if (response.status === responseCodes.HTTP_NOT_FOUND) {
            NotificationManager.error(APP_MESSAGES.auth.credentialsError);
        } else if (response.status === responseCodes.HTTP_NOT_ACCEPTABLE) {
            NotificationManager.error(APP_MESSAGES.error.validationMessage);
            yield put(loginUserFailure(response.data));
        }
    } catch (error) {
        console.log('AUTH SAGE ERROR : ', error , ' ', error.response);
    }
}

/**
 * Login to user request.
 * 
 * @param {string} email 
 * @param {string} password 
 */
const loginUserRequest = async (email, password) => {
    return laravelApi.get('/account/login', {
        params: {
            email,
            password
        }
    })
    .then(res => res)
    .catch(err => err.response);
};

/**
 * Login user.
 */
export function* loginUser() {
    yield takeEvery(LOGIN_USER, loginUserOnServer);
}

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
    yield all([
        fork(loginUser)
    ]);
}