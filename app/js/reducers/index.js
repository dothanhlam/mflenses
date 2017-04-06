import {combineReducers} from 'redux';
import app from 'reducers/app';
import { IntlReducer as Intl } from 'react-redux-multilingual'


export default combineReducers({
    app,
    Intl,
});
