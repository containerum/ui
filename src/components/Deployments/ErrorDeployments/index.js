import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorDeployments extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid pt-3 pb-5">
                    <h5>Deployments</h5>
                    <div className="row">
                        <div className="col-12">
                            <div className="card i-card-border mt-3">
                                <div className="card-block c-table-card-block">
                                    <div className="table table-hover c-table-card i-table-card">
                                        <div className="i-table-tbody">
                                            <div className="i-row-table">
                                                <div className="i-td-table">
                                                    ERROR {this.props.errorMessage}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ErrorDeployments.propTypes = {
    errorMessage: PropTypes.string
};

export default ErrorDeployments;
