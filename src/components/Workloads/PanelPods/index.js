import React, { Component } from 'react';
import TR from './TR';

var table_data = [
  {name: 'redis-django-123456789-7fns', age: '11h'},
  {name: 'redis-django-123456789-7fns', age: '11h'},
  {name: 'redis-django-123456789-7fns', age: '11h'},
  {name: 'redis-django-123456789-7fns', age: '11h'},
  {name: 'redis-django-123456789-7fns', age: '11h'},
  {name: 'redis-django-123456789-7fns', age: '11h'},
  {name: 'redis-django-123456789-7fns', age: '11h'},
  {name: 'redis-django-123456789-7fns', age: '11h'}
];

export default class PanelPods extends Component {
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
          <h3 className='panel-title'>Pods</h3>
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
              <th></th>
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
