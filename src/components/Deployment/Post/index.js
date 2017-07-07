import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PostDeploymentContainer from '../../../containers/PostDeploymentContainer';
import ErrorDeployment from '../ErrorDeployment';
import NamespacesDropDown from '../../NamespacesDropDown';
import { getPods } from '../../../actions/PodsActions';
// import CreateInstance from '../../CreateInstance';

class Post extends Component {
    componentDidMount() {
        this.props.onGetPods(this.props.idName, this.props.idDep);
    }
    render() {
        let isErrorContainer = '';
        if (this.props.deploymentErrorMessage) {
            isErrorContainer = <ErrorDeployment errorMessage={this.props.deploymentErrorMessage} />;
        } else {
            isErrorContainer =
                <div>
                    <div className="navbar navbar-toggleable-md navbar-light bg-faded">
                        <NamespacesDropDown
                            idDep={this.props.idDep}
                            idName={this.props.idName}
                        />
                        {/*<CreateInstance idName={this.props.idName} />*/}
                    </div>
                    <PostDeploymentContainer
                        deploymentReducer={this.props.deploymentReducer}
                        PodsReducer={this.props.PodsReducer}
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
    onGetPods: PropTypes.func,
    deploymentReducer: PropTypes.object,
    PodsReducer: PropTypes.object,
    deploymentErrorMessage: PropTypes.string,
    idName: PropTypes.string,
    idDep: PropTypes.string
};

function mapStateToProps(state) {
    const { PodsReducer } = state;
    const { errorMessage } = PodsReducer;

    return {
        errorMessage,
        PodsReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetPods: (idName, idDep) => {
            dispatch(getPods(idName, idDep));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
