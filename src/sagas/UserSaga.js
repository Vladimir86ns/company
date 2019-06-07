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
    CREATE_USER,
    GET_USER,
    UPDATE_USER
} from '../actions/types';

import {
    handleUserSuccess,
    updateUserFailure,
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
        console.log('Get user error : ', error);
        // yield put(responseAccountFailure(APP_MESSAGES.requestFailed));
    }
};

/**
 * Create User
 */
function* createUserToServer({payload}) {
    let { name, email, password } = payload.user;
    let { history } = payload;

    try {
        let response = yield call(createUserRequest, name, email, password);
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
        console.log('Create user error : ', error);
        // yield put(responseAccountFailure(APP_MESSAGES.requestFailed));
    }
};

/**
 * Update User
 */
function* updateUserToServer({payload}) {
    let { user } = payload;
    try {
        let response = yield call(updateUserRequest, user);
        if (response.status === responseCodes.HTTP_OK) {
            NotificationManager.success(APP_MESSAGES.user.updateSuccess);
            yield put(handleUserSuccess(response.data));
        } else if (response.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
            NotificationManager.error(APP_MESSAGES.validationMessage);
            yield put(updateUserFailure(response.data));
        }
    } catch (error) {
        console.log('Update user error : ', error);
    }
};

/**
 * Get User
 */
const getUserRequest = async (id, accountId, token) => {
    return axios.get(`http://localhost:8000/api/user/${id}/${accountId}`,
        { headers: 
            { Authorization: `Bearer ${token}`}
        });
};

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
};

/**
 * Update User
 */
const updateUserRequest = async (user) => {
    var clonedUser = clone(user);
    clonedUser.user_id = localStorage.getItem('user_id');
    clonedUser.account_id = localStorage.getItem('account_id');

    return axios.post('http://localhost:8000/api/user/update', clonedUser,
            { headers: {'Authorization': "bearer " + localStorage.getItem('token')} }
        )
        .then(res => res)
        .catch(err => err.response);
};

/**
 * Get User by id and account id.
 */
export function* getUser() {
    yield takeEvery(GET_USER, getUserFromServer);
};

/**
 * Create User
 */
export function* createUser() {
    yield takeEvery(CREATE_USER, createUserToServer);
};

/**
 * Update User
 */
export function* updateUser() {
    yield takeEvery(UPDATE_USER, updateUserToServer);
};

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
    yield all([
        fork(createUser),
        fork(getUser),
        fork(updateUser)
    ]);
}