import React, { Component } from 'react';

export default class BoxContainers extends Component {
  render() {
    return (
      <div className='col-md-5'>
        <div className='col-md-2'>
          <h3>Containers</h3>
          <ul>
            <li>key-value-store</li>
            <li>Image: redis</li>
            <li>Enviroment variables:</li>
            <li>Commands:</li>
            <li>Args: -</li>
          </ul>
        </div>
        <div className='col-md-2'>
          <h3>Containers</h3>
          <ul>
            <li>key-value-store</li>
            <li>Image: redis</li>
            <li>Enviroment variables:</li>
            <li>Commands:</li>
            <li>Args: -</li>
          </ul>
        </div>
      </div>
    );
  }
}
