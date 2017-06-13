import React, { Component } from 'react';
// import NavLink from '../../../components/NavLink';

class ButtonCreateDeployment extends Component {
    render() {
        return (
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
                                                Let's Start <br />
                                                Follow the <a href="https://bitbucket.org/exonch/ch-sdk" target="_blank">Documentation</a> to create your first Deployment
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

export default ButtonCreateDeployment;
