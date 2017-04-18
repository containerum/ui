import React, { Component } from 'react';
import PanelReplicaSets from './PanelReplicaSets';
import Post from './Post';
import Documents from './Documents';

export default class ReplicaSets extends Component {
    render() {
        return (
            <div className='row'>
                <PanelReplicaSets />
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
