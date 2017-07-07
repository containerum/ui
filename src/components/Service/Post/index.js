import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostServiceContainer from '../../../containers/PostServiceContainer';
import ErrorService from '../ErrorService';
import NamespacesDropDown from '../../NamespacesDropDown';
// import CreateInstance from '../../CreateInstance';

class Post extends Component {
    render() {
        let isErrorContainer = '';
        if (this.props.errorMessage) {
            isErrorContainer = <ErrorService errorMessage={this.props.errorMessage} />;
        } else {
            isErrorContainer =
                <div>
                    <div className="navbar navbar-toggleable-md navbar-light bg-faded">
                        <NamespacesDropDown
                            idService={this.props.idService}
                            idName={this.props.idName}
                        />
                        {/*<CreateInstance idName={this.props.idName} />*/}
                    </div>
                    <PostServiceContainer
                        serviceReducer={this.props.serviceReducer}
                        idName={this.props.idName}
                    />
                </div>;
        }
        return (
            <div>
                { isErrorContainer }
            </div>
        );
    }
}

Post.propTypes = {
    serviceReducer: PropTypes.object,
    errorMessage: PropTypes.string,
    idName: PropTypes.string,
    idService: PropTypes.string
};

export default Post;
