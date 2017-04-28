import React, { Component } from 'react';
import TR from './TR';
import axios from 'axios';

export default class PanelReplicaSets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 4,
            data_replica: []
        }
    }
    componentDidMount() {
        axios.get('http://139.59.146.89/api/replicasets')
        .then(response => {
            this.setState({data_replica: response.data});
            console.log(this.state.data_replica)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    render() {
        const loader = (
            <tr><th>Error with data receiving</th></tr>
        );
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
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data_replica === '' ? loader : <TR data={this.state.data_replica} pageSize={this.state.pageSize}/>}
                    </tbody>
                </table>
            </div>
            </div>
        );
    }
}
