import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';

class Notification extends Component {
    componentWillReceiveProps(nextProps) {
        toastr.options = {
            'closeButton': true,
            'debug': false,
            'newestOnTop': false,
            'progressBar': true,
            'positionClass': 'toast-top-right',
            'preventDuplicates': false,
            'onclick': null,
            'showDuration': '300',
            'hideDuration': '1000',
            'timeOut': '5000',
            'extendedTimeOut': '1000',
            'showEasing': 'swing',
            'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        };
        if (nextProps.status === 202 && nextProps.name &&
            nextProps.name !== this.props.name) {
            toastr.success(nextProps.name + ' was deleted', 'Success');
        } else if (nextProps.errorMessage && nextProps.errorMessage !== this.props.errorMessage) {
            toastr.error(nextProps.errorMessage, 'Error');
        }
    }
    render() {
        return (
            <div></div>
        );
    }
}

Notification.propTypes = {
    name: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired
};

export default Notification;
