import React, { PropTypes } from 'react';
import AuthorListRow from './authorListRow';

const AuthorList = ({ authors,onDeleteClick }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {authors.map(author =>
                    <AuthorListRow key={author.id} 
                        author={author} 
                        onDeleteClick={onDeleteClick}/>
                )}
            </tbody>
        </table>
    );
};

AuthorList.propTypes = {
    authors: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default AuthorList;