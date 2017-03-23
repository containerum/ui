import React, { Component } from 'react';
import PanelVolume from './PanelVolume';
import Post from './Post';
import Documents from './Documents';

export default class Volume extends Component {
  render() {
    return (
      <div className='row'>
        <PanelVolume />
        <div className='col-md-9'>
          <h4>Related Post</h4>
          <Post />
          <Post />
          <Post />
        </div>
        <Documents />
      </div>
    );
  }
}
