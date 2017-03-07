import React, { Component } from 'react';

export default class BoxConditions extends Component {
  render() {
    return (
      <div className='col-md-6'>
        <h3>Conditions</h3>
        <ul>
          <li>{this.props.item.conditions.type}</li>
          <li>{this.props.item.conditions.status}</li>
          <li>{this.props.item.conditions.lastTransitionTime}</li>
          <li>{this.props.item.conditions.lastHeartbeatTime}</li>
        </ul>
      </div>
    );
  }
}
