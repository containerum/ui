import React, { Component } from 'react';
import TR from './TR';

export default class Events extends Component {
  render() {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h3 className='panel-title'>Events</h3>
        </div>
        <div className='panel-body'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th>Message</th>
                <th>Source</th>
                <th>Sub-object</th>
                <th>Count</th>
                <th>Last update</th>
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
    );
  }
}
