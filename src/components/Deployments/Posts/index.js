import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonCreateDeployment from '../../CreateDeployment/ButtonCreateDeployment';
import PostsDeploymentsContainer from '../../../containers/PostsDeploymentsContainer';
import ErrorDeployments from '../ErrorDeployments';

class Posts extends Component {
    render() {
        let isErrorContainer = "";
        if (this.props.deploymentsErrorMessageReducer) {
            isErrorContainer = <ErrorDeployments errorMessage={this.props.deploymentsErrorMessageReducer} />;
        } else if (this.props.deploymentsDataReducer.length === 0) {
            isErrorContainer = <ButtonCreateDeployment />;
        } else {
            isErrorContainer = <PostsDeploymentsContainer
                PostsDeploymentsDataReducer={this.props.deploymentsDataReducer}
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

Posts.propTypes = {
    deploymentsDataReducer: PropTypes.array,
    deploymentsErrorMessageReducer: PropTypes.string,
    idName: PropTypes.string
};

export default Posts;
