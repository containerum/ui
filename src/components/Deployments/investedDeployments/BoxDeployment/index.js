import React, { Component } from 'react';
import Button from './Button';

export default class Box extends Component {
  render() {
    return (
      <div className='col-md-13'>
        <div className='box1-deploy'>
          <div className='col-md-2'>
            <h3>{this.props.item.namespace}</h3>
            <img src='http://placehold.it/150x150' alt='...' className='img-rounded'/>
          </div>
          <div className='col-md-2 text'>
            <ul>
              <li>Status:</li>
              <li>{this.props.item.status.available} updated</li>
              <li>{this.props.item.status.total} total</li>
              <li>{this.props.item.status.unavailable} available</li>
              <li>{this.props.item.status.updated} unavailable</li>
            </ul>
          </div>
          <div className='col-md-3'>
            <ul>
              <li>Namespace: {this.props.item.namespace}</li>
              {this.props.item.labels.map(function(item){
                return (
                  <li>Labels: app: {item.x1}</li>
                  )
              })}
            </ul>
          </div>
          <div className='col-md-3'>
           <ul>
              <li>Strategy: {this.props.item.strategy}</li>
              <li>Min ready seconds: {this.props.item.min_ready_seconds}</li>
              <li>Rolling update strategy: Max surge: {this.props.item.rolling_update_stategy.max_surge} Max unavailable: {this.props.item.rolling_update_stategy.max_unavailable}</li>
            </ul>
          </div>
          <div className='col-md-2'>
            <Button data_id={this.props.item.id}/>
          </div>
        </div>
      </div>
)
}
}
