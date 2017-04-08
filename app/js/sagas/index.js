import { fork } from 'redux-saga/effects';
import { watchAsync, watchLenses, watchWindowSizeChanged, authenticationStatusChanged } from './watchers';

export default function* rootSaga() {
    yield fork(watchAsync);
    yield fork(watchLenses);
    yield fork(watchWindowSizeChanged);
    yield  fork(authenticationStatusChanged);
}
