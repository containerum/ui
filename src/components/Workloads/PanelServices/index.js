import React, { Component } from 'react';
import TR from './TR';
import axios from 'axios';

export default class PanelServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 2,
      data_services: []
    }
  }
  componentDidMount() {
    axios.get('http://139.59.146.89/api/services')
    .then(response => {
      this.setState({data_services: response.data});
      console.log(this.state.data_services)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    const loader = (
      <p>Error 403</p>
    )
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h3 className='panel-title'>Services</h3>
        </div>
        <div className='panel-body'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th></th>
                <th></th>
                <th>Age</th>
                <th>Labels</th>
                <th></th>
              </tr>
            </thead>
            {this.state.data_services == '' ? loader : <TR data={this.state.data_services} pageSize={this.state.pageSize}/>}
          </table>
        </div>
      </div>
    );
  }
}
