import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getService } from '../../actions/ServiceActions/getServiceAction';
import Post from './Post';
import Spinner from '../Spinner';

class Service extends Component {
    componentDidMount() {
        this.props.onGetService(this.props.params.idName, this.props.params.idService);
    }
    render() {
        let isFetchingComponent = '';
        if (this.props.getServiceReducer.isFetching === false) {
            isFetchingComponent =
                <div>
                    <Post
                        serviceReducer={this.props.getServiceReducer.data}
                        errorMessage={this.props.getServiceReducer.errorMessage}
                        idName={this.props.params.idName}
                        idService={this.props.params.idService}
                    />
                </div>;
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

Service.propTypes = {
    onGetService: PropTypes.func.isRequired,
    params: PropTypes.object,
    getServiceReducer: PropTypes.object,
    errorMessage: PropTypes.string
};

function mapStateToProps(state) {
    const { getServiceReducer } = state;
    const { errorMessage } = getServiceReducer;

    return {
        errorMessage,
        getServiceReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetService: (idName, idService) => {
            dispatch(getService(idName, idService));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Service);
