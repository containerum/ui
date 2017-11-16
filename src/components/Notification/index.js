import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import toastr from 'toastr';

class Notification extends Component {
    componentWillReceiveProps(nextProps) {
        // console.log('Notification', nextProps);
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
            if (nextProps.method === 'put') {
                toastr.success(nextProps.name + ' was updated', 'Updated Success');
            } else {
                toastr.success(nextProps.name + ' was deleted', 'Deleted Success');
            }
        } else if (nextProps.status === 201 && nextProps.name &&
            nextProps.name !== this.props.name) {
            toastr.success(nextProps.name + ' was created', 'Created Success');
        } else if ((nextProps.errorMessage === 'Not enough money to buy a namespace' ||
                nextProps.errorMessage === 'Not enough money to buy volume' ||
                nextProps.errorMessage === 'Not enough money to resize volume') &&
            nextProps.name !== this.props.name) {
            toastr.error(`${nextProps.errorMessage}<br />Please, follow to <a href="/Billing">billing page</a>`, 'Error');
        } else if (nextProps.errorMessage && nextProps.errorMessage !== this.props.errorMessage) {
            toastr.error(nextProps.errorMessage, 'Error');
        }
    }
    render() {
        return (
            <div> </div>
        );
    }
}

Notification.propTypes = {
    name: PropTypes.string,
    status: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    method: PropTypes.string,
    errorMessage: PropTypes.string
};

export default Notification;
