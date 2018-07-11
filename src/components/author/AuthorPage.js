import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AuthorList from './authorList';
import * as authorActions from '../../actions/authorActions';

// import {browserHistory} from 'react-router';

class AuthorsPage extends React.Component 
{
    constructor(props, context) {
        super(props, context);
        this.onDeleteCourseClick = this.onDeleteCourseClick.bind(this);
    }

    onDeleteCourseClick(event){
        // alert('delete author ' +  event.target.dataset.authorId);
        this.props.actions.deleteAuthor(event.target.dataset.authorId);
    }

    render() {
        const { authors } = this.props;
        return (
            <div>
                <h1>Authors</h1>
                <input type="submit"
                    value="Add Author"
                    className="btn btn-primary"></input>
                <AuthorList authors={authors} onDeleteClick={this.onDeleteCourseClick}/>
            </div>
        );
    }

}

AuthorsPage.propTypes = {
    actions: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        authors: state.authors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authorActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);