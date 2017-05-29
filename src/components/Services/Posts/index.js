import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonCreateService from '../../CreateService/ButtonCreateService';
import PostsServicesContainer from '../../../containers/PostsServicesContainer';
import ErrorServices from '../ErrorServices';

class Posts extends Component {
    render() {
        let isErrorContainer = "";
        if (this.props.servicesErrorMessageReducer) {
            isErrorContainer = <ErrorServices errorMessage={this.props.servicesErrorMessageReducer} />;
        } else if (this.props.servicesDataReducer.length === 0) {
            isErrorContainer = <ButtonCreateService />;
        } else {
            isErrorContainer = <PostsServicesContainer
                PostsServicesDataReducer={this.props.servicesDataReducer}
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
    servicesDataReducer: PropTypes.array,
    servicesErrorMessageReducer: PropTypes.string,
    idName: PropTypes.string
};

export default Posts;
