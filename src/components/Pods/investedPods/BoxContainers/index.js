import React, { Component } from 'react';

export default class BoxContainers extends Component {
  render() {
    var dep = this.props.item.map(function(item){
    return (
      <div className='col-md-5'>
        <div className='col-md-2'>
          <h3>Containers</h3>
          <ul>
            <li>{item.containers.name}</li>
            <li>Image: {item.containers.image}</li>
            <li>Enviroment variables: {item.containers.environments}</li>
            <li>Commands: {item.containers.commands}</li>
            <li>Args: {item.containers.args}</li>
          </ul>
        </div>
        <div className='col-md-2'>
          <h3>Containers</h3>
        </div>
      </div>
    );
    })
    return (
      <div>
        {dep}
      </div>
    )
  }
}
