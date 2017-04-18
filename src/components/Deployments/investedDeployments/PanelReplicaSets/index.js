import React, { Component } from 'react';
import TR from './TR';

export default class PanelReplicaSets extends Component {
    render() {
        return (
            <div className='panel panel-default'>
                <div className='panel-heading'>
                    <h3 className='panel-title'>Replica Sets</h3>
                </div>
                <div className='panel-body'>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Pods</th>
                                <th>Images</th>
                                <th>Age</th>
                                <th>Labels</th>
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
