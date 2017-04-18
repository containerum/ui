import React, { Component } from 'react';
import TR from './TR';
import axios from 'axios';

export default class PanelSecret extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_secret: []
        }
    }
    componentDidMount() {
        axios.get('')
            .then(response => {
                this.setState({data_secret: response.data});
                console.log(this.state.data_secret)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div className='panel panel-default'>
                <div className='panel-heading'>
                    <h3 className='panel-title'>Secrets</h3>
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
                        <TR data={this.state.data_secret}/>
                    </table>
                </div>
            </div>
        );
    }
}
