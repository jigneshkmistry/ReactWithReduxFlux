import * as types from '../actions/actionTypes';
import authorApi from '../api/mockAuthorApi';

export function loadAuthorsSuccess(authors) {
    return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
    return function (dispatch) {
        return authorApi.getAllAuthors().then(function (authors) {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            throw (error);
        });
    };
}