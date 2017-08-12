import { combineReducers } from 'redux';

import login, { loginSaga } from './Login';
import { reducer as formReducer } from 'redux-form';

const reducers =  combineReducers({
    login,
    form: formReducer
});

export function* rootSaga() {
    yield [
        loginSaga(),
    ];
};

export default reducers;
