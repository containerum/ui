import React, { Component } from 'react';
import TR from './TR';

var table_data = [
  {name: 'kubernetes', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {name: 'kubernetes', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {name: 'kubernetes', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {name: 'kubernetes', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {name: 'kubernetes', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {name: 'kubernetes', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {name: 'kubernetes', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {name: 'kubernetes', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'}
];

export default class PanelServices extends Component {
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
          <h3 className='panel-title'>Services</h3>
        </div>
        <div className='panel-body'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th></th>
                <th>Cluster</th>
                <th>Last Update</th>
                <th>Labels</th>
                <th></th>
              </tr>
            </thead>
            <TR data={table_data} pageSize={this.state.pageSize}/>
          </table>
        </div>
      </div>
    );
  }
}
