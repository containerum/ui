import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import NotFoundNamespaces from '../NotFoundNamespaces';
import PostsNamespacesContainer from '../NamespacesContainer';
import ErrorNamespaces from '../ErrorNamespaces';

class NamespacesRoute extends Component {
    render() {
        let isErrorContainer = '';
        if (this.props.namespacesErrorMessageReducer) {
            isErrorContainer = <ErrorNamespaces errorMessage={this.props.namespacesErrorMessageReducer} />;
        } else {
            isErrorContainer = <PostsNamespacesContainer
                PostsNamespacesDataReducer={this.props.namespacesDataReducer}
                idName={this.props.idName}
            />;
        }
        return (
            <div>
                { isErrorContainer }
            </div>
        );
    }
}

NamespacesRoute.propTypes = {
    namespacesDataReducer: PropTypes.array,
    namespacesErrorMessageReducer: PropTypes.string,
    namespacesStatusErrorReducer: PropTypes.number,
    idName: PropTypes.string
};

export default NamespacesRoute;
