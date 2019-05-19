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

    console.log('usao u createToServer');
    const { name, email, password } = payload.user;
    const { history } = payload;


    try {
        const newUser = yield call(createUserRequest, name, email, password);
        // TODO remove status 201 later on when is fixed from API side
        if (newUser.status === responseCodes.HTTP_OK || newUser.status === 201) {

        // TODO add account id, instead of user ID 
        localStorage.setItem('account_id', newUser.data.id);
        localStorage.setItem('user_id', newUser.data.id);
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