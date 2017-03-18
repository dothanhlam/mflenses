import { takeLatest, takeEvery } from 'redux-saga';
import { asyncSaga, getLensesSaga } from './async-sagas';

import { TEST_ASYNC_ACTION } from 'actions/app';

import { GET_LENSES } from 'actions/lens';

export function* watchAsync() {
    yield* takeLatest(TEST_ASYNC_ACTION, asyncSaga);
}

export function* watchLenses() {
    yield* takeEvery(GET_LENSES, getLensesSaga);
}
