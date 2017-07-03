import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostDeploymentContainer from '../../../containers/PostDeploymentContainer';
import ErrorDeployment from '../ErrorDeployment';
import Namespaces from '../../Namespaces';
// import CreateInstance from '../../CreateInstance';

class Post extends Component {
    render() {
        let isErrorContainer = "";
        if (this.props.errorMessage) {
            isErrorContainer = <ErrorDeployment errorMessage={this.props.errorMessage} />;
        } else {
            isErrorContainer =
                <div>
                    <div className="navbar navbar-toggleable-md navbar-light bg-faded">
                        <Namespaces
                            idDep={this.props.idDep}
                            idName={this.props.idName}
                        />
                        {/*<CreateInstance />*/}
                    </div>
                    <PostDeploymentContainer
                        deploymentReducer={this.props.deploymentReducer}
                        idDep={this.props.idDep}
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
    deploymentReducer: PropTypes.object,
    errorMessage: PropTypes.string,
    idName: PropTypes.string,
    idDep: PropTypes.string
};

export default Post;
