import { all, take } from 'redux-saga/effects';

import loadRefreshToken from './getRefreshToken';

function* loadRefreshToSequenced() {
  yield take('GET_INVALID_TOKEN');
  yield loadRefreshToken();
}

function* rootSaga() {
  yield all([loadRefreshToSequenced()]);
}

export default rootSaga;
