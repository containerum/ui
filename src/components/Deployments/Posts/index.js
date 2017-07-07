import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonCreateDeployment from '../../CreateDeployment/ButtonCreateDeployment';
import PostsDeploymentsContainer from '../../../containers/PostsDeploymentsContainer';
import ErrorDeployments from '../ErrorDeployments';

class Posts extends Component {
    render() {
        let isErrorContainer = '';
        if (this.props.deploymentsStatusErrorReducer === 404) {
            isErrorContainer = <ButtonCreateDeployment />;
        } else if (this.props.deploymentsErrorMessageReducer) {
            isErrorContainer = <ErrorDeployments errorMessage={this.props.deploymentsErrorMessageReducer} />;
        } else {
            isErrorContainer = <PostsDeploymentsContainer
                PostsDeploymentsDataReducer={this.props.deploymentsDataReducer}
                idName={this.props.idName}
                linkedDep={this.props.linkedDep}
            />;
        }
        return (
            <div>
                { isErrorContainer }
            </div>
        );
    }
}

Posts.propTypes = {
    deploymentsDataReducer: PropTypes.array,
    deploymentsErrorMessageReducer: PropTypes.string,
    deploymentsStatusErrorReducer: PropTypes.number,
    idName: PropTypes.string,
    linkedDep: PropTypes.string
};

export default Posts;
