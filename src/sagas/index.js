/**
 * Root Sagas
 */
import { all } from 'redux-saga/effects';

// sagas
import authSagas from './AuthSaga';
import userSaga from './UserSaga';
import companySaga from './CompanySaga';
import accountSaga from './AccountSaga';
import employeeSaga from './EmployeeSage';

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        userSaga(),
        companySaga(),
        accountSaga(),
        employeeSaga()
    ]);
}