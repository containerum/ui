import React, { Component } from 'react';
import Box from './Box';
import BoxContainers from './BoxContainers';
import BoxConditions from './BoxConditions';
import PanelCreated from './PanelCreated';

export default class Pods_1 extends Component {
  render() {
    return (
        <div className='row rowpanel'>
          <Box />
          <div className='row rowcopod'>
            <div className='col-md-13'>
              <BoxContainers />
              <BoxConditions />
            </div>
          </div>
          <PanelCreated />
        </div>
    );
  }
}
