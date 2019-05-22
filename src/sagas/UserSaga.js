/**
 * Auth Sagas
 */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { responseCodes } from '../constants/ResponseCode';

import {
    CREATE_USER
} from '../actions/types';

import {
    //
} from 'Actions';


/**
 * Create User
 */
function* createUserToServer({payload}) {

    let { name, email, password } = payload.user;
    let { history } = payload;


    try {
        let newUser = yield call(createUserRequest, name, email, password);
        // TODO remove status 201 later on when is fixed from API side
        if (newUser.status === responseCodes.HTTP_OK) {
        
        let { id, account_id, token } = newUser.data;
        localStorage.setItem('account_id', account_id);
        localStorage.setItem('user_id', id);
        localStorage.setItem('token', token);
        history.push('/app/dashboard/ecommerce');

        // yield put(responseAccountSuccess(newAccount.data, APP_MESSAGES.account.createSuccess));
        } else if (newUser.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
        // yield put(responseAccountNotAcceptable(newAccount.data));
        } else {
        // yield put(responseAccountFailure(APP_MESSAGES.requestFailed));
        }
    } catch (error) {
        // yield put(responseAccountFailure(APP_MESSAGES.requestFailed));
    }
}

/**
 * Create User
 */
const createUserRequest = async (name, email, password) => {
    return axios.post('http://localhost:8000/api/user/create', {
            name,
            email,
            password
        })
        .then(res => res)
        .catch(err => err);
  }


/**
 * Create User
 */
export function* createUser() {
    yield takeEvery(CREATE_USER, createUserToServer);
}

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
    yield all([
        fork(createUser)
    ]);
}