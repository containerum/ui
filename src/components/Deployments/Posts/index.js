import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonCreateDeployment from '../../CreateDeployment/ButtonCreateDeployment';
import PostsDeploymentsContainer from '../../../containers/PostsDeploymentsContainer';
import ErrorDeployments from '../ErrorDeployments';

class Posts extends Component {
    componentDidMount() {
        console.log(this.props.deploymentsDataReducer);
    }
    componentWillReceiveProps(nextProps, nextState) {
        console.log(nextProps, nextState);
    }
    componentWillUpdate(nextProps, nextState) {
        console.log(nextProps, nextState);
    }
    render() {
        let isErrorContainer = "";
        if (this.props.deploymentsErrorMessageReducer) {
            isErrorContainer = <ErrorDeployments errorMessage={this.props.deploymentsErrorMessageReducer} />;
        } else if (this.props.deploymentsDataReducer.length === 0) {
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
