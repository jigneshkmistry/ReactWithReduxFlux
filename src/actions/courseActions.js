import * as types from '../actions/actionTypes';
import courseApi from '../api/mockCourseApi';

export function loadCoursesSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
    return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
    return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
    return function (dispatch) {
        return courseApi.getAllCourses().then(function (courses) {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            throw (error);
        });
    };
}

export function saveCourse(course) {
    return function (dispatch,getState) {
        return courseApi.saveCourse(course).then(function (savedCourses) {
            course.id ? dispatch(updateCourseSuccess(savedCourses)) :
            dispatch(createCourseSuccess(savedCourses));
        }).catch(error => {
            throw (error);
        });
    };
}
