import React, { Component } from 'react';

export default class BoxConditions extends Component {
  render() {
    var dep = this.props.item.map(function(item){
    return (
      <div className='col-md-6'>
        <h3>Conditions</h3>
        <ul>
          <li>{item.conditions.type}</li>
          <li>{item.conditions.status}</li>
          <li>{item.conditions.lastTransitionTime}</li>
          <li>{item.conditions.lastHeartbeatTime}</li>
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
