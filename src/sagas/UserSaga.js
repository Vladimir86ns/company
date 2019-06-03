/**
 * Auth Sagas
 */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { responseCodes } from '../constants/ResponseCode';

import {
    CREATE_USER,
    GET_USER
} from '../actions/types';

import {
    handleUserSuccess
} from 'Actions';

/**
 * Create User
 */
function* getUserFromServer() {
    try {
        let accountId = localStorage.getItem('account_id');
        let userId = localStorage.getItem('user_id');
        let token = localStorage.getItem('token');
        let response = yield call(getUserRequest, accountId, userId, token);
        // TODO remove status 201 later on when is fixed from API side
        if (response.status === responseCodes.HTTP_OK) {
            yield put(handleUserSuccess(response.data));
        } else if (response.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
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
function* createUserToServer({payload}) {

    let { name, email, password } = payload.user;
    let { history } = payload;


    try {
        let response = yield call(createUserRequest, name, email, password);
        // TODO remove status 201 later on when is fixed from API side
        if (response.status === responseCodes.HTTP_OK) {
        
            let { id, account_id, token } = response.data;
            localStorage.setItem('account_id', account_id);
            localStorage.setItem('user_id', id);
            localStorage.setItem('token', token);
            history.push('/app/dashboard/ecommerce');
            yield put(handleUserSuccess(response.data));
        } else if (response.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
        // yield put(responseAccountNotAcceptable(newAccount.data));
        } else {
        // yield put(responseAccountFailure(APP_MESSAGES.requestFailed));
        }
    } catch (error) {
        // yield put(responseAccountFailure(APP_MESSAGES.requestFailed));
    }
}

/**
 * Get User
 */
const getUserRequest = async (id, accountId, token) => {
    return axios.get(`http://localhost:8000/api/user/${id}/${accountId}`,
        { headers: 
            { Authorization: `Bearer ${token}`}
        });
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
 * Get User by id and account id.
 */
export function* getUser() {
    yield takeEvery(GET_USER, getUserFromServer);
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
        fork(createUser),
        fork(getUser)
    ]);
}