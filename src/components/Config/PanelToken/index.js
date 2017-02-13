import React, { Component } from 'react';
import TR from './TR';

export default class PanelToken extends Component {
  render() {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h3 className='panel-title'>Tokens</h3>
        </div>
        <div className='panel-body'>
        <table className='table table-hover'>
         <thead>
          <tr>
           <th></th>
           <th>Name</th>
           <th></th>
           <th></th>
           <th></th>
           <th>Last Update</th>
           <th></th>
          </tr>
         </thead>
         <tbody>
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
