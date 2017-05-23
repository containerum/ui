import React, { Component } from 'react';

export default class CliToken extends Component {
    render() {
        return (
            <div className='container-fluid pt-3'>
                <div className='row'>
                    <div className="col-12">
                        <div className="card mt-3">
                            <div className="card-block c-table-card-block">
                                <table className="table i-table-card">
                                    <tbody>
                                    <tr>
                                        <td>
                                            CLI
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Download CLI Tool
                                        </td>
                                        <td>
                                            Set token
                                        </td>
                                        <td>
                                            Use ful opportunities with CLI Help
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button className='btn btn-default clitool'>Download CLI</button>
                                        </td>
                                        <td>
                                            bla bla bla
                                        </td>
                                        <td>
                                            <button className='btn btn-default clitool'>CLI Help</button>
                                        </td>
                                    </tr>
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
