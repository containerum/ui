import React, { Component } from 'react';
import TR from './TR';
import axios from 'axios';

export default class PanelToken extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_token: []
        }
    }
    componentDidMount() {
        axios.get('http://web.api.containerum.io:5000/api/tokens')
        .then(response => {
            this.setState({data_token: response.data});
            console.log(this.state.data_token)
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
                <h3 className='panel-title'>Tokens</h3>
            </div>
            <div className='panel-body'>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Last Update</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data_token === '' ? loader : <TR data={this.state.data_token} pageSize={this.state.pageSize}/>}
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}
