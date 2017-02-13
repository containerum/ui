import React, { Component } from 'react';
import TR from './TR';

export default class PanelCreated extends Component {
  render() {
    return (
      <div className='panel panel-default PanelCreated'>
        <div className='panel-heading'>
          <h3 className='panel-title'>Created by</h3>
        </div>
        <div className='panel-body'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Type</th>
                <th>Pods</th>
                <th>Images</th>
                <th>Age</th>
                <th>Labels</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <TR />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
