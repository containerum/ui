import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDeployments } from '../../actions/DeploymentsActions';
import Posts from './Posts';
import Spinner from '../Spinner';

class Deployments extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getDeployments(this.props.idName));
    }
    componentWillUpdate(nextProps) {
        if(nextProps.idName !== this.props.idName) {
            const { dispatch } = this.props;
            dispatch(getDeployments(this.props.idName));
        }
    }
    render() {
        let isFetchingComponent = "";
        if (this.props.DeploymentsReducer.isFetching === false) {
            isFetchingComponent =
                <Posts
                    deploymentsDataReducer={this.props.DeploymentsReducer.data}
                    deploymentsErrorMessageReducer={this.props.DeploymentsReducer.errorMessage}
                    idName={this.props.idName}
                />
        } else {
            isFetchingComponent = <Spinner />
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
    errorMessage: PropTypes.string,
    idName: PropTypes.string
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
