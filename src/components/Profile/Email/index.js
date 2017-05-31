import React, { Component } from 'react';
import Switch from 'react-toggle-switch';

import '../../../../node_modules/react-toggle-switch/dist/css/switch.min.css';

export default class Email extends Component {
    constructor() {
        super();
        this.state = {
            on: true
        };
        this.toggleSwitch = this.toggleSwitch.bind(this);
    }
    toggleSwitch() {
        this.setState({
            on: !this.state.on
        });
    }
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
                                                receive updates about new feature releases,<br/> discounts and promotional codes,
                                                security updates and more
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                If you`re not interested in receiving this content, please uncheck the
                                                box below to unsubscribe.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Switch on={this.state.on} onClick={this.toggleSwitch}/> Subscribe to new letters
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
