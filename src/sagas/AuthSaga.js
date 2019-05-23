/**
 * Auth Sagas
 */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
    LOGIN_USER
} from 'Actions/types';

import axios from 'axios';
import { responseCodes } from '../constants/ResponseCode';

/**
 * Sig In User With Email and Password Request
 */
const loginUserRequest = async (email, password) => {
    return axios.get('http://localhost:8000/api/user/login', {
        params: {
            email,
            password
        }
    })
    .then(res => res)
    .catch(err => err);
}

/**
 * Sign In User With Email & Password
 */
function* loginUserOnServer({ payload }) {
    const { email, password } = payload.user;
    const { history } = payload;
    try {
        const response = yield call(loginUserRequest, email, password);
        if (response.status === responseCodes.HTTP_OK) {
            let { id, account_id, token } = response.data;

            localStorage.setItem('account_id', account_id);
            localStorage.setItem('user_id', id);
            localStorage.setItem('token', token);
            history.push('/app/dashboard/ecommerce');
        }
    } catch (error) {

    }
}

/**
 * Login User
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