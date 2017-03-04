import React, { Component } from 'react';
import TR from './TR';
import Post from './Post';
import Documents from './Documents';

var table_data = [
  {id: '1', name: 'kubernetes1', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {id: '2', name: 'kubernetes2', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {id: '3', name: 'kubernetes3', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {id: '4', name: 'kubernetes4', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {id: '5', name: 'kubernetes5', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {id: '6', name: 'kubernetes6', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {id: '7', name: 'kubernetes7', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {id: '8', name: 'kubernetes8', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'}
];

export default class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 4
    }
  }
  render() {
    return (
      <div className='row'>
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
        <div className='col-md-9'>
          <h4>Related Post</h4>
          <Post />
          <Post />
          <Post />
        </div>
        <Documents />
      </div>
  );
  }
}
