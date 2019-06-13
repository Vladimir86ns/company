/**
 * Root Sagas
 */
import { all } from 'redux-saga/effects';

// sagas
import authSagas from './AuthSaga';
import userSaga from './UserSaga';
import companySaga from './CompanySaga';

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        userSaga(),
        companySaga()
    ]);
}