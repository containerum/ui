import React, { Component } from 'react';
import TR from './TR';
import Post from './Post';
import Documents from './Documents';

export default class Services extends Component {
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
              <tbody>
                <TR />
                <TR />
                <TR />
                <TR />
                <TR />
                <TR />
                <TR />
                <TR />
                <TR />
                <TR />
              </tbody>
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
