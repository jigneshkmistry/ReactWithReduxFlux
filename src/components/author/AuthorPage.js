import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AuthorList from './authorList';
import * as authorActions from '../../actions/authorActions';
import {browserHistory} from 'react-router';


class AuthorsPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            deleting: false
        };
        this.redirectToAuthorPage = this.redirectToAuthorPage.bind(this);
        this.onDeleteCourseClick = this.onDeleteCourseClick.bind(this);
    }

    redirectToAuthorPage() {
        browserHistory.push('/author');
    }

    onDeleteCourseClick(event) {
        this.setState({ deleting: true });
        this.props.actions.deleteAuthor(event.target.dataset.authorId)
            .then((result) => {
                if (result == 0) {
                    alert('there are courses associated with this course.');
                }
                this.setState({ deleting: false });
            });
    }

    render() {
        const { authors } = this.props;
        return (
            <div>
                <h1>Authors</h1>
                <input type="submit"
                    value="Add Author"
                    className="btn btn-primary"
                    onClick={this.redirectToAuthorPage}></input>
                    <AuthorList authors={authors}
                    deleting={this.state.deleting}
                    onDeleteClick={this.onDeleteCourseClick} />
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