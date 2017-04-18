import React, { Component } from 'react';
import TR from './TR';

export default class PanelEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 2
        }
    }
    render() {
        return (
            <div className='panel panel-default'>
                <div className='panel-heading'>
                    <h3 className='panel-title'>Events</h3>
                </div>
                <div className='panel-body'>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th>Message</th>
                                <th>Source</th>
                                <th>Sub-object</th>
                                <th>Count</th>
                                <th>Last update</th>
                            </tr>
                        </thead>
                        <TR data={this.props.item} pageSize={this.state.pageSize}/>
                    </table>
                </div>
            </div>
        );
    }
}
