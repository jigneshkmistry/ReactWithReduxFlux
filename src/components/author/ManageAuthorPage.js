import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm';
import toastr from 'toastr';

export class ManageAuthorPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            author: Object.assign({}, props.author),
            errors: {},
            saving: false
        };

        this.updateAuthorState = this.updateAuthorState.bind(this);
        this.saveAuthor = this.saveAuthor.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.author.id != nextProps.author.id) {
            // Necessary to populate form when existing course is loaded directly.
            this.setState({ author: Object.assign({}, nextProps.author) });
        }
    }

    updateAuthorState(event) {
        let field = event.target.name;
        let author = Object.assign({}, this.state.author);
        author[field] = event.target.value;
        return this.setState({author: author});
    }

    authorFormIsValid(){
        let formIsValid = true;
        let errors = {};

        if(this.state.author.firstName.length < 3){
            errors.firstName = 'FirstName must be at least 5 characters.';
            formIsValid = false;
        }

        if(this.state.author.lastName.length < 3){
            errors.lastName = 'LastName must be at least 5 characters.';
            formIsValid = false;
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    redirect() {
        this.setState({ saving: false });
        toastr.success('Author success');
        this.context.router.push('/authors');
    }

    saveAuthor(event) {
        event.preventDefault();

        if (!this.authorFormIsValid()) {
            return;
        }

        this.setState({ saving: true });
        this.props.actions.saveAuthor(this.state.author).then(() => {
            this.redirect();
        }).catch(error => {
            this.setState({ saving: false });
            toastr.error(error);
        });
    }

    render() {
        return (
            <AuthorForm
                onChange={this.updateAuthorState}
                saving={this.state.saving}
                onSave={this.saveAuthor}
                author={this.state.author}
                errors={this.state.errors} />
        );
    }
}

ManageAuthorPage.propTypes = {
    actions: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired
};

ManageAuthorPage.contextTypes = {
    router: PropTypes.object
};

function getCourseByID(authors, id) {

    const author = authors.filter(author => author.id == id);
    if (author.length) return author[0]; //since filter returns an array, have to grab the first.
    return null;
}

function mapStateToProps(state, ownProps) {
    const authorID = ownProps.params.id;
    let author = { id: '', firstName: '', lastName: '' };

    if (authorID && state.authors.length > 0) {
        author = getCourseByID(state.authors, authorID);
    }

    return {
        author: author
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authorActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);