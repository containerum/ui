import React, { Component } from 'react';
import TR from './TR';

export default class PanelPods extends Component {
    render() {
        return (
            <div className='panel panel-default'>
                <div className='panel-heading'>
                    <h3 className='panel-title'>Pods</h3>
                </div>
                <div className='panel-body'>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Restarts</th>
                                <th>Age</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <TR item={this.props.item}/>
                    </table>
                </div>
            </div>
        );
    }
}
