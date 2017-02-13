import React, { Component } from 'react';
import TR from './TR';

export default class PanelSSH extends Component {
  render() {
    return (
          <div className='panel panel-default'>
            <div className='panel-heading'>
              <h3 className='panel-title'>SSH Keys</h3>
            </div>
          <div className='panel-body'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th>Name</th>
                <th></th>
                <th>Key</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
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
