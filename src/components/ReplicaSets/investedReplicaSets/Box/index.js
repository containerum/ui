import React, { Component } from 'react';

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
              {this.props.item.labels.map(function(item){
                return (
                  <li>Labels: app: {item.x1}</li>
                )
              })}
              <li>Creation time: {this.props.item.creation_time}</li>
            </ul>
          </div>
          <div className='col-md-3'>
            <ul>
            {this.props.item.images.map(function(item){
              return (
                <li>Images: {item}</li>
              )
            })}
            {this.props.item.selectors.map(function(item){
              return (
                <li>Selectors: {item.x1}</li>
              )
            })}
            </ul>
          </div>
          <div className='col-md-2'>
            
          </div>
        </div>
      </div>
    );
  }
}
