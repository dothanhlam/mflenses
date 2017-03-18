import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import logger from '../dev/logger';
import rootSaga from '../sagas';

const configureStore = (isProduction, instrument) => {
    let saga = createSagaMiddleware();

    if (isProduction) {
        return {
            ...createStore( rootReducer,
                applyMiddleware(saga)),
            runSaga: saga.run(rootSaga),
        };
    }
    return {
        ...createStore( rootReducer,
            compose(applyMiddleware(saga, logger), instrument())),
        runSaga: saga.run(rootSaga),
    };
};

export default configureStore;