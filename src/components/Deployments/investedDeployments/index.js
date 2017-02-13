import React, { Component } from 'react';
import Box from './BoxDeployment';
import PanelReplicaSets from './PanelReplicaSets';
import Events from './Events';

export default class Deployments_1 extends Component {
  render() {
    return (
      <div className='row rowpanel'>
        <Box />
        <PanelReplicaSets />
        <Events />
      </div>
    );
  }
}
