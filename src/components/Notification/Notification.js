import React, { Component } from 'react';
import toastr from 'toastr';

class Notification extends Component {
    render() {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
        if(this.props.status === 202 && this.props.name) {
            toastr["success"](this.props.name + " was deleted", "Success");
        } else if (this.props.errorMessage) {
            toastr["error"](this.props.errorMessage, "Error");
        }

        return (
            <div></div>
        );
    }
}

export default Notification;
