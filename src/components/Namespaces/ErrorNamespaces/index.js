import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorNamespaces extends Component {
    render() {
        return (
            <div className="row double">
                <div className="col-md-12 align-middle">
                    <div className="add-new-block content-block-content card-container hover-action ">
                        <div className="action">ERROR {this.props.errorMessage}</div>
                    </div>
                </div>

            </div>
        );
    }
}

ErrorNamespaces.propTypes = {
    errorMessage: PropTypes.string
};

export default ErrorNamespaces;
