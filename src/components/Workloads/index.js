import React, { Component } from 'react';
import PanelDeployments from './PanelDeployments';
import PanelReplicaSets from './PanelReplicaSets';
import PanelPods from './PanelPods';
import PanelServices from './PanelServices';

export default class Workloads extends Component {
  render() {
    return (
      <div className='row'>
        <PanelDeployments />
        <PanelReplicaSets />
        <PanelPods />
        <PanelServices />
      </div>
    )
  }
}
