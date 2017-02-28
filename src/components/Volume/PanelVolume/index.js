import React, { Component } from 'react';
import TR from './TR';

var table_data = [
  {name: 'Test 1', replicasets: '6', age: '1h', labels: 'app: ngnix'},
  {name: 'Test 1', replicasets: '6', age: '1h', labels: 'app: ngnix'},
  {name: 'Test 1', replicasets: '6', age: '1h', labels: 'app: ngnix'},
  {name: 'Test 1', replicasets: '6', age: '1h', labels: 'app: ngnix'},
  {name: 'Test 1', replicasets: '6', age: '1h', labels: 'app: ngnix'},
  {name: 'Test 1', replicasets: '6', age: '1h', labels: 'app: ngnix'},
  {name: 'Test 1', replicasets: '6', age: '1h', labels: 'app: ngnix'},
  {name: 'Test 1', replicasets: '6', age: '1h', labels: 'app: ngnix'}
];

export default class PanelVolume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 4
    }
  }
  render() {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h3 className='panel-title'>Volume</h3>
        </div>
        <div className='panel-body'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th></th>
              <th>Replica Sets</th>
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
