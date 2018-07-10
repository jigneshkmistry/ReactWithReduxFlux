import * as types from '../actions/actionTypes';
import courseApi from '../api/mockCourseApi';
import { beginAjaxCall,ajaxCallError } from './ajaxStatusActions';

export function loadCoursesSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
    return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
    return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function deleteCourseSuccess(id) {
    return { type: types.DELETE_COURSE_SUCCESS, id: id };
}

export function loadCourses() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return courseApi.getAllCourses().then(function (courses) {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            throw (error);
        });
    };
}

export function saveCourse(course) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return courseApi.saveCourse(course).then(function (savedCourses) {
            course.id ? dispatch(updateCourseSuccess(savedCourses)) :
                dispatch(createCourseSuccess(savedCourses));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw (error);
        });
    };
}


export function deleteCourse(courseID) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return courseApi.deleteCourse(courseID).then(function (data) {
            dispatch(deleteCourseSuccess(courseID));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw (error);
        });
    };
}