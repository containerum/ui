import React, { Component } from 'react';

export default class BoxContainers extends Component {
  render() {
    return (
      <div className='col-md-5'>
        <div className='col-md-2'>
          <h3>Containers</h3>
          <ul>
            <li>{this.props.item.containers.name}</li>
            <li>Image: {this.props.item.containers.image}</li>
            <li>Enviroment variables: {this.props.item.containers.environments}</li>
            <li>Commands: {this.props.item.containers.commands}</li>
            <li>Args: {this.props.item.containers.args}</li>
          </ul>
        </div>
        <div className='col-md-2'>
          <h3>Containers</h3>
        </div>
      </div>
    );
  }
}
