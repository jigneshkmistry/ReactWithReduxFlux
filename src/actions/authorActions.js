import * as types from '../actions/actionTypes';
import authorApi from '../api/mockAuthorApi';
import { beginAjaxCall,ajaxCallError } from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
    return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function deleteAuthorSuccess(id) {
    return { type: types.DELETE_AUTHOR_SUCCESS, id: id };
}

export function loadAuthors() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return authorApi.getAllAuthors().then(function (authors) {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw (error);
        });
    };
}

export function deleteAuthor(authorID) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return authorApi.deleteAuthor(authorID).then(function (data) {
            dispatch(deleteAuthorSuccess(authorID));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw (error);
        });
    };
}