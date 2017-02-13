import React, { Component } from 'react';
import PanelSecret from './PanelSecret';
import PanelToken  from './PanelToken';

export default class Config extends Component {
  render() {
    return (
      <div className='row'>
        <PanelSecret />
        <PanelToken />
      </div>
    );
  }
}
