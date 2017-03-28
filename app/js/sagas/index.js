import { fork } from 'redux-saga/effects';
import { watchAsync, watchLenses, watchWindowSizeChanged } from './watchers';

export default function* rootSaga() {
    yield fork(watchAsync);
    yield fork(watchLenses);
    yield fork(watchWindowSizeChanged);
}
