import React, { Component } from 'react';
import Button from './Button';

export default class Box extends Component {
  render() {

    return (
      <div className='col-md-13'>
        <div className='box1-deploy'>
          <div className='col-md-4'>
            <h3>{this.props.item.name}</h3>
            <img src='http://placehold.it/150x150' alt='...' className='img-rounded'/>
          </div>
          <div className='col-md-3'>
            <ul>
            <li>Namespace: {this.props.item.namespace}</li>
            {this.props.item.annotations.map(function(item){
              return (
                <li>Labels: app: {item.x2}</li>
              )
            })}
              {this.props.item.labels.map(function(item){
                return (
                  <li>Annotations: Created by: {item.x1}</li>
                )
              })}
              <li>Creation time: {this.props.item.creationTimestamp}</li>
            </ul>
          </div>
          <div className='col-md-3'>
          </div>
          <div className='col-md-2'>
            <Button data_id={this.props.item.id}/>
          </div>
        </div>
      </div>
    );

  }
}
