import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './rootReducer';
import history from './util/history';

const middlewares = [thunk, routerMiddleware(history)];
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
}

const store = createStore(
    createRootReducer(history),
    {},
    applyMiddleware(...middlewares)
);

export default store;
