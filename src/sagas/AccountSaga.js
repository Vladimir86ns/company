import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import laravelApi from '../../src/api/index';
import { responseCodes } from '../constants/ResponseCode';
import { NotificationManager } from 'react-notifications';
import APP_MESSAGES from '../../src/constants/AppMessages';
import {
    CREATE_ACCOUNT_AND_USER
} from '../actions/types';

import {
	handleUserSuccess,
	generalFormFailure
} from 'Actions';

/**
 * Create account and user to server.
 * 
 * @param {object} payload
 */
function* createAccountUserToServer({payload}) {
    let { name, email, password } = payload.account;
    let { history } = payload;

    try {
        let response = yield call(createAccountAndUserRequest, name, email, password);
        if (response.status === responseCodes.HTTP_OK) {
            let { id, account_id, token } = response.data;

            localStorage.setItem('account_id', account_id);
            localStorage.setItem('user_id', id);
            localStorage.setItem('token', token);
            NotificationManager.success(APP_MESSAGES.account.createSuccess);
            history.push('/app/dashboard/ecommerce');
            yield put(handleUserSuccess(response.data));
        } else if (response.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
            NotificationManager.error(APP_MESSAGES.error.validationMessage);
        	yield put(generalFormFailure(response.data));
        }
    } catch (error) {
        console.log('Create account and user error : ', error, ' ', error.response);
    }
};

/**
 * Create account and user request made.
 * 
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 */
const createAccountAndUserRequest = async (name, email, password) => {
    return laravelApi.post('/account/create', {
            name,
            email,
            password
        })
        .then(res => res)
        .catch(err => err.response);
};

/**
 * Create account and user.
 */
export function* createAccountUser() {
    yield takeEvery(CREATE_ACCOUNT_AND_USER, createAccountUserToServer);
};

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
    yield all([
        fork(createAccountUser)
    ]);
}