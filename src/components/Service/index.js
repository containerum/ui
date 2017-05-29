import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getService } from '../../actions/ServiceActions';
import Post from './Post';
import Spinner from '../Spinner';

class Service extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getService(this.props.params.idName, this.props.params.idService));
    }
    render() {
        let isFetchingComponent = "";
        if (this.props.ServiceReducer.isFetching === false) {
            isFetchingComponent =
                <Post
                    serviceReducer={this.props.ServiceReducer.data}
                    errorMessage={this.props.ServiceReducer.errorMessage}
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
    const { ServiceReducer } = state;
    const { errorMessage } = ServiceReducer;

    return {
        errorMessage,
        ServiceReducer
    }
}

export default connect(mapStateToProps)(Service)
