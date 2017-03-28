import { takeLatest, takeEvery } from 'redux-saga';
import { asyncSaga, getLensesSaga, updateWindow } from './async-sagas';

import { TEST_ASYNC_ACTION, WINDOW_SIZE_CHANGED } from 'actions/app';

import { GET_LENSES } from 'actions/lens';

export function* watchAsync() {
    yield* takeLatest(TEST_ASYNC_ACTION, asyncSaga);
}

export function* watchLenses() {
    yield* takeEvery(GET_LENSES, getLensesSaga);
}

export function* watchWindowSizeChanged() {
    yield* takeEvery(WINDOW_SIZE_CHANGED, updateWindow);
}