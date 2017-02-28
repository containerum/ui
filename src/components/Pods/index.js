import React, { Component } from 'react';
import TR from './TR';
import Post from './Post';
import Documents from './Documents';

var table_data = [
  {name: 'redis-django-123456781-7fns', age: '11h'},
  {name: 'redis-django-123456782-7fns', age: '11h'},
  {name: 'redis-django-123456783-7fns', age: '11h'},
  {name: 'redis-django-123456784-7fns', age: '11h'},
  {name: 'redis-django-123456785-7fns', age: '11h'},
  {name: 'redis-django-123456786-7fns', age: '11h'},
  {name: 'redis-django-123456787-7fns', age: '11h'},
  {name: 'redis-django-123456788-7fns', age: '11h'}
];

export default class Pods extends Component {
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
