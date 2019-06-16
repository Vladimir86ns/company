import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import laravelApi from '../../src/api/index';
import { responseCodes } from '../constants/ResponseCode';
import { NotificationManager } from 'react-notifications';
import APP_MESSAGES from '../../src/constants/AppMessages';
import { clone } from '../../src/util/lodashFunctions';
import {
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

        if (response.status === responseCodes.HTTP_OK) {
            yield put(handleUserSuccess(response.data));
        }
    } catch (error) {
        console.log('Get user error : ', error, ' ', error.response);
    }
};

/**
 * Update user.
 * 
 * @param {object} payload 
 */
function* updateUserToServer({payload}) {
    let { user } = payload;
    try {
        let response = yield call(updateUserRequest, user);
        if (response.status === responseCodes.HTTP_OK) {
            NotificationManager.success(APP_MESSAGES.success.updateSuccess);
            yield put(handleUserSuccess(response.data));
        } else if (response.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
            NotificationManager.error(APP_MESSAGES.error.validationMessage);
            yield put(updateUserFailure(response.data));
        }
    } catch (error) {
        console.log('Update user error : ', error, ' ', error.response);
    }
};

/**
 * Get user from server.
 * 
 * @param {string} id 
 * @param {string} accountId 
 */
const getUserRequest = (id, accountId) => {
    return laravelApi.get(`/user/${id}/${accountId}`)
        .then(res => res)
        .catch(err => err.response);;
};

/**
 * Update user made request.
 * 
 * @param {object} user 
 */
const updateUserRequest = (user) => {
    var clonedUser = clone(user);
    clonedUser.user_id = localStorage.getItem('user_id');
    clonedUser.account_id = localStorage.getItem('account_id');

    return laravelApi.post('/user/update', clonedUser)
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
        fork(getUser),
        fork(updateUser)
    ]);
}