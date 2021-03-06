import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

class CoursesPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.redirectToCoursePage = this.redirectToCoursePage.bind(this);
        this.onDeleteCourseClick = this.onDeleteCourseClick.bind(this);
    }

    redirectToCoursePage() {
        browserHistory.push('/course');
    }

    onDeleteCourseClick(event){
        this.props.actions.deleteCourse(event.target.dataset.courseId);
    }

    render() {
        const { courses } = this.props;
        return (
            <div>
                <h1>Courses</h1>
                <input type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                    onClick={this.redirectToCoursePage}></input>
                <CourseList courses={courses} onDeleteClick={this.onDeleteCourseClick}/>
            </div>
        );
    }
}

CoursesPage.propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);