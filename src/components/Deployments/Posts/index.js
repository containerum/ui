import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonCreateDeployment from '../../CreateDeployment/ButtonCreateDeployment';
import PostsDeploymentsContainer from '../../../containers/PostsDeploymentsContainer';

class Posts extends Component {
    render() {
        console.log(this.props.deploymentsDataReducer);
        let isErrorContainer = <div>Loading...</div>;
        if (this.props.deploymentsErrorMessageReducer) {
            isErrorContainer = <ButtonCreateDeployment />;
        } else {
            isErrorContainer = <PostsDeploymentsContainer PostsDeploymentsDataReducer={this.props.deploymentsDataReducer}/>;
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
    deploymentsErrorMessageReducer: PropTypes.string
};

export default Posts;
