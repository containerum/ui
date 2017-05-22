import React, { Component } from 'react';

export default class Email extends Component {
    render() {
        return (
            <div>
                <div className='container-fluid pt-3'>
                    <div className='row'>
                        <div className="col-12">
                            <div className="card mt-3">
                                <div className="card-block c-table-card-block">
                                    <table className="table i-table-card">
                                        <tbody>
                                        <tr>
                                            <td>
                                                E-mail subscriptions
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                By subscribing to our email newsletter, you will be opting to
                                                receive updates about new feature releases....
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                bla bla bla...
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
