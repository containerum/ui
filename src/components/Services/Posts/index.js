import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonCreateService from '../../CreateService/ButtonCreateService';
import PostsServicesContainer from '../../../containers/PostsServicesContainer';
import ErrorServices from '../ErrorServices';

class Posts extends Component {
    render() {
        let isErrorContainer = "";
        if (this.props.servicesDataReducer.length === 0 || this.props.servicesStatusErrorReducer === 404) {
            isErrorContainer = <ButtonCreateService />;
        } else if (this.props.servicesErrorMessageReducer) {
            isErrorContainer = <ErrorServices errorMessage={this.props.servicesErrorMessageReducer} />;
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
    servicesStatusErrorReducer: PropTypes.number,
    idName: PropTypes.string
};

export default Posts;
