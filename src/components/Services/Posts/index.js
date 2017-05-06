import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonCreateService from '../../CreateService/ButtonCreateService';
import PostsServicesContainer from '../../../containers/PostsServicesContainer';

class Posts extends Component {
    render() {
        console.log(this.props.servicesDataReducer);
        let isErrorContainer = <div>Loading...</div>;
        if (this.props.servicesErrorMessageReducer) {
            isErrorContainer = <ButtonCreateService />;
        } else {
            isErrorContainer = <PostsServicesContainer PostsServicesDataReducer={this.props.servicesDataReducer}/>;
        }
        return (
            <div>
                { isErrorContainer }
            </div>
        );
    }
}

Posts.propTypes = {
    servicesDataReducer: PropTypes.array,
    servicesErrorMessageReducer: PropTypes.string
};

export default Posts;
