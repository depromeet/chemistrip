import { createStore, applyMiddleware } from 'redux';
// saga
import createSagaMiddleware from 'redux-saga';

// etc
import {reducers, rootSaga } from './ducks';

const sagaMiddleware = createSagaMiddleware();
const middleware = sagaMiddleware;

const store = createStore(
    reducers,
    applyMiddleware(middleware),
);

sagaMiddleware.run(rootSaga);

export default store;
