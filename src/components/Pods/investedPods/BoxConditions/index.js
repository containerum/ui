import React, { Component } from 'react';

export default class BoxConditions extends Component {
  render() {
    var dep = this.props.item.map(function(item, index){
    return (
      <div className='col-md-6' key={index}>
        <h3>Conditions</h3>
        <ul>
          <li>{item.type}</li>
          <li>{item.status}</li>
          <li>{item.lastTransitionTime}</li>
          <li>{item.lastHeartbeatTime}</li>
        </ul>
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
