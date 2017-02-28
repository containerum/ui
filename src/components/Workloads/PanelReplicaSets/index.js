import React, { Component } from 'react';
import TR from './TR';

var table_data = [
  {name: 'Test 1', pods: '1 / 1', images: 'redis', age: '1h', labels: 'ngnix'},
  {name: 'Test 2', pods: '1 / 1', images: 'redis', age: '1h', labels: 'ngnix'},
  {name: 'Test 3', pods: '1 / 1', images: 'redis', age: '1h', labels: 'ngnix'},
  {name: 'Test 4', pods: '1 / 1', images: 'redis', age: '1h', labels: 'ngnix'},
  {name: 'Test 5', pods: '1 / 1', images: 'redis', age: '1h', labels: 'ngnix'},
  {name: 'Test 6', pods: '1 / 1', images: 'redis', age: '1h', labels: 'ngnix'},
  {name: 'Test 7', pods: '1 / 1', images: 'redis', age: '1h', labels: 'ngnix'},
  {name: 'Test 8', pods: '1 / 1', images: 'redis', age: '1h', labels: 'ngnix'}
];

export default class PanelReplicaSets extends Component {
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
          <TR data={table_data} pageSize={this.state.pageSize}/>
        </table>
      </div>
    </div>
    );
  }
}
