import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDeployments } from '../../actions/DeploymentsActions';
import Posts from './Posts';

class Deployments extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getDeployments('default'));
    }
    render() {
        let isFetchingComponent = "";
        if (this.props.DeploymentsReducer.isFetching === false) {
            isFetchingComponent =
                <Posts
                    deploymentsDataReducer={this.props.DeploymentsReducer.data}
                    deploymentsErrorMessageReducer={this.props.DeploymentsReducer.errorMessage}
                />
        }

        return (
            <div>
                { isFetchingComponent }
            </div>
        );
    }
}

Deployments.propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

function mapStateToProps (state) {
    const { DeploymentsReducer } = state;
    const { errorMessage } = DeploymentsReducer;

    return {
        errorMessage,
        DeploymentsReducer
    }
}

export default connect(mapStateToProps)(Deployments)
