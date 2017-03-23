import React, { Component } from 'react';

export default class Data extends Component {
  render() {
    return (
      <div className='col-md-13'>
        <div className='box1-secret'>
          <h3>Data</h3>
          <ul>
            <li><span className='glyphicon glyphicon-eye-open' aria-hidden='true'></span> ca.crt: 1025 bytes</li>
            <li><span className='glyphicon glyphicon-eye-open' aria-hidden='true'></span> namespace: 7 bytes</li>
            <li><span className='glyphicon glyphicon-eye-open' aria-hidden='true'></span> token: 846 bytes</li>
          </ul>
        </div>
      </div>
    );
  }
}
