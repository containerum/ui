import React, { Component } from 'react';
import TR from './TR';

export default class PanelDeployments extends Component {
  render() {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h3 className='panel-title'>Deployments</h3>
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
