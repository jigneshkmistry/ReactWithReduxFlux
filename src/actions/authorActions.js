import * as types from '../actions/actionTypes';
import authorApi from '../api/mockAuthorApi';
import courseApi from '../api/mockCourseApi';
import { beginAjaxCall,ajaxCallError } from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
    return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function createAuthorSuccess(author) {
    return { type: types.CREATE_AUTHOR_SUCCESS, author };
}

export function updateAuthorSuccess(author) {
    return { type: types.UPDATE_AUTHOR_SUCCESS, author };
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

export function saveAuthor(author) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return authorApi.saveAuthor(author).then(function (savedAuthor) {
            author.id ? dispatch(updateAuthorSuccess(savedAuthor)) :
                dispatch(createAuthorSuccess(savedAuthor));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw (error);
        });
    };
}


export function deleteAuthor(authorID) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());

        let courses = getState().courses
            .filter(course => course.authorId == authorID);

        if(courses.length > 0){
            dispatch(ajaxCallError());
            return Promise.resolve(0);
        }
        else{
            return authorApi.deleteAuthor(authorID).then(function (data) {
                dispatch(deleteAuthorSuccess(authorID));
                return 1;
            }).catch(error => {
                dispatch(ajaxCallError());
                throw (error);
            });
        }
    };
}