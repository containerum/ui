import React, { Component } from 'react';
import NavLink from '../../../components/NavLink';

class ButtonCreateDeployment extends Component {
    render() {
        return (
            <div className="container-fluid pt-3">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-block c-table-card-block">
                                {/*<NavLink*/}
                                    {/*className="btn btn-block"*/}
                                    {/*to="/CreateNewDeployment"*/}
                                {/*>*/}
                                    {/*CREATE BUTTON NEW DEPLOYMENT*/}
                                {/*</NavLink>*/}
                                <a href="https://bitbucket.org/exonch/ch-sdk" target="_blank" className="btn btn-block">
                                    CREATE NEW DEPLOYMENT
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ButtonCreateDeployment;
