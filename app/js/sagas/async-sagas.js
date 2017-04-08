import {put, call} from 'redux-saga/effects';
import {testAsync, getLenses, getAssets } from 'api';

import {
    TEST_ASYNC_ACTION_START,
    TEST_ASYNC_ACTION_ERROR,
    TEST_ASYNC_ACTION_SUCCESS,
    UPDATE_WINDOW_SIZE,
} from 'actions/app';

import {
    GET_LENSES_SUCCESS,
    GET_LENSES_ERROR,
} from 'actions/lens';

export function *asyncSaga() {
    const data = yield call(testAsync);
    yield put(data ? testAsyncSuccess(data) : testAsyncError(data));
}

function testAsyncSuccess(data) {
    return {
        type: TEST_ASYNC_ACTION_SUCCESS,
        data,
    };
}

function testAsyncError(error) {
    return {
        type: TEST_ASYNC_ACTION_ERROR,
        error,
    };
}

// app
export function *updateWindow({size}) {
    yield put({type: UPDATE_WINDOW_SIZE, size});
}
// LENSES

export function *getLensesSaga({params}) {
    try {
        const data = yield call(getLenses, params);
        yield put({type: GET_LENSES_SUCCESS, data}); // data ?
    }
    catch (error) {
        yield put({type: GET_LENSES_ERROR, error});
    }
}