import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const AuthorListRow = ({ author,deleting,onDeleteClick }) => {
    return (
        <tr>
            <td><Link to={'/author/' + author.id}>{author.id}</Link></td>
            <td>{author.firstName}</td>
            <td>{author.lastName}</td>
            <td> <input style={style}
                    disabled = {deleting}
                    type="submit"
                    value="Delete" 
                    data-author-id={author.id}
                    className="btn btn-danger"
                    onClick={onDeleteClick}></input></td>
        </tr>
    );
};

AuthorListRow.propTypes = {
    author: PropTypes.object.isRequired,
    deleting: PropTypes.bool.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

let style = {
    width:80
};

export default AuthorListRow;