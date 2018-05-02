import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import factionSaga from './factionSaga'


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    factionSaga()
    // watchIncrementAsync()
  ]);
}
