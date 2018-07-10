import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CourseListRow = ({ course,onDeleteClick }) => {
    return (
        <tr>
            <td><a href={course.watchHref} target="_blank">Watch</a></td>
            <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
            <td>{course.authorId}</td>
            <td>{course.category}</td>
            <td>{course.length}</td>
            <td> <input style={style}
                    type="submit"
                    value="Delete" 
                    data-course-id={course.id}
                    className="btn btn-danger"
                    onClick={onDeleteClick}></input></td>
        </tr>
    );
};

CourseListRow.propTypes = {
    course: PropTypes.object.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

let style = {
    width:80
};

export default CourseListRow;