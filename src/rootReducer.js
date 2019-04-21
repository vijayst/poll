import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import messageReducer from './common/messageReducer';
import { connectRouter } from 'connected-react-router';

export default history =>
    combineReducers({
        router: connectRouter(history),
        auth: authReducer,
        message: messageReducer
    });
