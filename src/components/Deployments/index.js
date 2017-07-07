import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDeployments } from '../../actions/DeploymentsActions';
import Posts from './Posts';
import Spinner from '../Spinner';

class Deployments extends Component {
    componentWillMount() {
        this.props.onGetDeployments(this.props.idName);
    }
    // componentWillUpdate(nextProps) {
    //     if (nextProps.idName !== this.props.idName) {
    //         const { dispatch } = this.props;
    //         dispatch(getDeployments(this.props.idName));
    //     }
    // }
    render() {
        let isFetchingComponent = '';
        if (this.props.DeploymentsReducer.isFetching === false) {
            isFetchingComponent =
                <Posts
                    deploymentsDataReducer={this.props.DeploymentsReducer.data}
                    deploymentsErrorMessageReducer={this.props.DeploymentsReducer.errorMessage}
                    deploymentsStatusErrorReducer={this.props.DeploymentsReducer.statusError}
                    idName={this.props.idName}
                    linkedDep={this.props.linkedDep}
                />;
        } else {
            isFetchingComponent = <Spinner />;
        }

        return (
            <div>
                { isFetchingComponent }
            </div>
        );
    }
}

Deployments.propTypes = {
    onGetDeployments: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    statusError: PropTypes.number,
    DeploymentsReducer: PropTypes.object,
    idName: PropTypes.string,
    linkedDep: PropTypes.string
};

function mapStateToProps(state) {
    const { DeploymentsReducer } = state;
    const { errorMessage } = DeploymentsReducer;
    const { statusError } = DeploymentsReducer;

    return {
        DeploymentsReducer,
        errorMessage,
        statusError
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetDeployments: idName => {
            dispatch(getDeployments(idName));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Deployments);
