import { createStore, combineReducers, applyMiddleWare } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { menu } from './menu';
import { comments } from './comments';
import { services } from './services';
import { reviews } from './reviews';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            menu,
            comments,
            services,
            reviews
        }),
        applyMiddleWare(thunk, logger)
    );

    return store;
}