import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchComments = () => dispatch => {
    return fetch(baseUrl+'comments')
        .then(response => {
            if (response.ok) {
                return response
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`)
                error.response = response;
                throw error;
            }
        }, 
        error => {
            const errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const postComment = (menuId, rating, author, comment) => dispatch => {

    const newComment = {
        menuId,
        rating,
        author,
        comment
    };
    newComment.date = new Date().toISOString();

    setTimeout(()=> {
        dispatch(addComment(newComment));
    }, 1000);
};

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const deleteFavorite = menuId => ({
    type: ActionTypes.DELETE_COMMENT,
    payload: menuId
})

export const fetchMenus = () => dispatch => {

    dispatch(menusLoading());

    return fetch(baseUrl + 'menu')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(menus => dispatch(addMenus(menus)))
        .catch(error => dispatch(menusFailed(error.message)));
};

export const menusLoading = () => ({
    type: ActionTypes.MENUS_LOADING
});

export const menusFailed = errMess => ({
    type: ActionTypes.MENUS_FAILED,
    payload: errMess
});

export const addMenus = menus => ({
    type: ActionTypes.ADD_MENUS,
    payload: menus
})

export const fetchServices = () => dispatch => {

    dispatch(servicesLoading());

    return fetch(baseUrl + 'services')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(services => dispatch(addServices(services)))
        .catch(error => dispatch(ServicessFailed(error.message)));
}

export const servicesLoading = () => ({
    type: ActionTypes.SERVICES_LOADING
});

export const servicesFailed = errMess => ({
    type: ActionTypes.SERVICES_FAILED,
    payload: errMess
});

export const addServices = services => ({
    type: ActionTypes.ADD_SERVICES,
    payload: services
});

export const fetchReviews = () => dispatch => {

    dispatch(reviewsLoading());

    return fetch(baseUrl + 'reviews')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(reviews => dispatch(addReviews(reviews)))
        .catch(error => dispatch(reviewsFailed(error.message)));
};

export const reviewsLoading = () => ({
    type: ActionTypes.REVIEWS_LOADING
});

export const reviewsFailed = errMess => ({
    type: ActionTypes.REVIEWS_FAILED,
    payload: errMess
});

export const addReviews = reviews => ({
    type: ActionTypes.ADD_REVIEWS,
    payload: reviews
});

export const postFavorite = menuId => dispatch => {
    setTimeout(() => {
        dispatch(addFavorite(menuId));
    }, 1000);
};

export const addFavorite = menuId => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: menuId
})

