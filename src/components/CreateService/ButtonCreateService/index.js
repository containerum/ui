import React, { Component } from 'react';
// import NavLink from '../../../components/NavLink';

class ButtonCreateService extends Component {
    render() {
        return (
            <div className="container-fluid pt-3 pb-5">
                <h5>Services</h5>
                <div className="row">
                    <div className="col-12">
                        <div className="card i-card-border mt-3">
                            <div className="card-block c-table-card-block">
                                <div className="table table-hover c-table-card i-table-card">
                                    <div className="i-table-tbody">
                                        <div className="i-row-table">
                                            <div className="i-td-table">
                                                Let's Start <br />
                                                Follow the <a href="https://containerum.com/documentation/Start-Guide" target="_blank">Documentation</a> to create your 1st Service
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

export default ButtonCreateService;
