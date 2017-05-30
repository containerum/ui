import React, { Component } from 'react';
import TR from './TR';

export default class PanelSSH extends Component {
    render() {
        return (
            <div className='container-fluid pt-3'>
                <div className="row">
                    <div className="col-12">
                        <h5>SSH Keys</h5>
                        <div className="card mt-3">
                            <div className="card-block c-table-card-block">
                                <table className="table i-table-card">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th></th>
                                        <th>Key</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <TR />
                                    <TR />
                                    <TR />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
