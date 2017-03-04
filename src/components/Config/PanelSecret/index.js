import React, { Component } from 'react';
import TR from './TR';
var table_data = [
  {id: '1', name: 'default-token-1kst', time: '29.01.2017'},
  {id: '2', name: 'default-token-2kst', time: '29.01.2017'},
  {id: '3', name: 'default-token-3kst', time: '29.01.2017'},
  {id: '4', name: 'default-token-4kst', time: '29.01.2017'},
  {id: '5', name: 'default-token-5kst', time: '29.01.2017'},
  {id: '6', name: 'default-token-6kst', time: '29.01.2017'}
];
export default class PanelSecret extends Component {
  render() {
    return (
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Secrets</h3>
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
              <TR data={table_data}/>
            </table>
          </div>
        </div>
    );
  }
}
