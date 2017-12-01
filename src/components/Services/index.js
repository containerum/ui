import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import Spinner from '../Spinner';
import Notification from '../Notification';
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
        return (
            <div>
                <Notification
                    status={this.props.DeleteServiceReducer.status}
                    name={this.props.DeleteServiceReducer.serviceName}
                    errorMessage={this.props.DeleteServiceReducer.errorMessage}
                />
                <ServicesContains
                    idName={this.props.params.idName}
                    onDeleteService={this.handleDeleteService.bind(this)}
                />
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
