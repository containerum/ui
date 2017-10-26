import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getService } from '../../actions/ServiceActions/getServiceAction';
import { deleteService } from '../../actions/ServiceActions/deleteServiceAction';

import Spinner from '../Spinner';
import HeaderDropDown from '../HeaderDropDown';
import ServiceInfo from './ServiceInfo';
import ServiceContains from './ServiceContains';
import Notification from '../Notification';

class Service extends Component {
    componentDidMount() {
        // if (!this.props.GetServiceReducer.data.length) {
        this.props.onGetService(this.props.params.idName, this.props.params.idService);
        // }
    }
    handleDeleteService(idService) {
        // console.log(this.props.params.idName, idService);
        this.props.onDeleteService(this.props.params.idName, idService);
    }
    render() {
        let isFetchingServiceInfo = '';
        if (this.props.GetServiceReducer.isFetching === false) {
            isFetchingServiceInfo =
                <ServiceInfo
                    idName={this.props.params.idName}
                    onDeleteService={this.handleDeleteService.bind(this)}
                />;
        } else {
            isFetchingServiceInfo = <Spinner />;
        }
        return (
            <div>
                <HeaderDropDown
                    idName={this.props.params.idName}
                    idService={this.props.params.idService}
                />
                <Notification
                    status={this.props.DeleteServiceReducer.status}
                    name={this.props.DeleteServiceReducer.serviceName}
                    errorMessage={this.props.DeleteServiceReducer.errorMessage}
                />
                { isFetchingServiceInfo }
                <ServiceContains
                    idName={this.props.params.idName}
                    idService={this.props.params.idService}
                    children={this.props.children}
                />
            </div>
        );
    }
}

Service.propTypes = {
    onGetService: PropTypes.func.isRequired,
    params: PropTypes.object,
    GetServiceReducer: PropTypes.object,
    errorMessage: PropTypes.string
};

function mapStateToProps(state) {
    const { GetServiceReducer } = state;
    const { errorMessage } = GetServiceReducer;

    return {
        errorMessage,
        GetServiceReducer,
        DeleteServiceReducer: state.DeleteServiceReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetService: (idName, idService) => {
            dispatch(getService(idName, idService));
        },
        onDeleteService: (idName, idService) => {
            dispatch(deleteService(idName, idService));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Service);
