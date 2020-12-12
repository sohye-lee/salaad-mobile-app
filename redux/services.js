import * as ActionTypes from './ActionTypes';

export const services = (state = {  isLoading: true,
                                    errMess: null,
                                    menu: []}, action) => {

        switch (action.type) {
        case ActionTypes.ADD_SERVICES:
            return {...state, isLoading: false, errMess: null, services: action.payload};
        case ActionTypes.SERVICES_LOADING:
            return {...state, isLoading: true, errMess: null, services: []};
        case ActionTypes.SERVICES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
};