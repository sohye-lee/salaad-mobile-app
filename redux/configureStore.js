import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { menu } from './menu';
import { comments } from './comments';
import { services } from './services';
import { reviews } from './reviews';
import { favorites } from './favorites';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            menu,
            comments,
            services,
            reviews,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}