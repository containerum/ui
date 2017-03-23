import React, { Component } from 'react';
import PanelDeployments from './PanelDeployments';
import Post from './Post';
import Documents from './Documents';

export default class Deployments extends Component {
  render() {
    return (
      <div className='row'>
        <PanelDeployments />
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
