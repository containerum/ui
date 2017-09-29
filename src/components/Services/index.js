import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../Spinner';
import Notification from '../Notification';
import NotFoundServices from './NotFoundServices';
import ServicesContains from './ServicesContains';
import { getServices } from '../../actions/ServicesActions';
import { deleteService } from '../../actions/ServiceActions/deleteServiceAction';

class Services extends Component {
    componentDidMount() {
        // if (!this.props.ServicesReducer.data.length) {
            this.props.onGetServices(this.props.params.idName);
        // }
    }
    handleDeleteService(idServ) {
        this.props.onDeleteService(this.props.params.idName, idServ);
    }
    render() {
        // console.log(this.props.DeleteServiceReducer);
        let isFetchingServicesContains = '';
        if (this.props.ServicesReducer.isFetching === false) {
            if (this.props.ServicesReducer.data.length === 0 || this.props.ServicesReducer.statusError === 404) {
                isFetchingServicesContains = <NotFoundServices />;
            } else {
                isFetchingServicesContains =
                    <ServicesContains
                        idName={this.props.params.idName}
                        onDeleteService={this.handleDeleteService.bind(this)}
                    />;
            }
        } else {
            isFetchingServicesContains = <Spinner />;
        }
        return (
            <div>
                <Notification
                    status={this.props.DeleteServiceReducer.status}
                    name={this.props.DeleteServiceReducer.serviceName}
                    errorMessage={this.props.DeleteServiceReducer.errorMessage}
                />
                { isFetchingServicesContains }
            </div>
        );
    }
}

Services.propTypes = {
    params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        ServicesReducer: state.ServicesReducer,
        DeleteServiceReducer: state.DeleteServiceReducer
    };

}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetServices: (idName) => {
            dispatch(getServices(idName));
        },
        onDeleteService: (idName, idServ) => {
            dispatch(deleteService(idName, idServ));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
