import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import { connectRouter } from 'connected-react-router';

export default history =>
    combineReducers({
        router: connectRouter(history),
        auth: authReducer
    });
