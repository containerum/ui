import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getService } from '../../actions/ServiceActions/getServiceAction';
import Post from './Post';
import Spinner from '../Spinner';

class Service extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getService(this.props.params.idName, this.props.params.idService));
    }
    render() {
        let isFetchingComponent = "";
        if (this.props.getServiceReducer.isFetching === false) {
            isFetchingComponent =
                <Post
                    serviceReducer={this.props.getServiceReducer.data}
                    errorMessage={this.props.getServiceReducer.errorMessage}
                    idName={this.props.params.idName}
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

Service.propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

function mapStateToProps (state) {
    const { getServiceReducer } = state;
    const { errorMessage } = getServiceReducer;

    return {
        errorMessage,
        getServiceReducer
    }
}

export default connect(mapStateToProps)(Service)
