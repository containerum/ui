import React, { Component } from 'react';
import NavLink from '../../../components/NavLink';

class ButtonCreateService extends Component {
    render() {
        return (
            <div className="container-fluid pt-3">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-block c-table-card-block">
                                <NavLink
                                    className="btn btn-block"
                                    to="/CreateNewService"
                                >
                                    CREATE BUTTON NEW SERVICE
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ButtonCreateService;
