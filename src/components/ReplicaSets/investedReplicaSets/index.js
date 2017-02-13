import React, { Component } from 'react';
import Box from './Box';
import PanelPods from './PanelPods';
import PanelServices from './PanelServices';
import PanelEvents from './PanelEvents';

export default class ReplicaSet extends Component {
  render() {
    return (
      <div className='row rowpanel'>
        <Box />
        <PanelPods />
        <PanelServices />
        <PanelEvents />
      </div>
    );
  }
}
