import React, { Component } from 'react';

export default class BoxContainers extends Component {
  render() {
    var dep = this.props.item.map(function(item, index){
    return (
      <div className='col-md-5' key={index}>
        <div className='col-md-2'>
          <h3>Containers</h3>
          <ul>
            <li>{item.name}</li>
            <li>Image: {item.image}</li>
            <li>Enviroment variables: {item.environments}</li>
            <li>Commands: {item.commands}</li>
            <li>Args: {item.args}</li>
          </ul>
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
