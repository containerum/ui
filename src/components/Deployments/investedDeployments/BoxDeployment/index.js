import React, { Component } from 'react';
import Button from './Button';

export default class Box extends Component {
  render() {
    var dep = this.props.item.map(function(item){
    return (
      <div className='col-md-13'>
        <div className='box1-deploy'>
          <div className='col-md-2'>
            <h3>{item.name}</h3>
            <img src='http://placehold.it/150x150' alt='...' className='img-rounded'/>
          </div>
          <div className='col-md-2'>
            <ul>
              <li>Status:</li>
              <li>{item.status.updated} updated</li>
              <li>{item.status.total} total</li>
              <li>{item.status.available} available</li>
              <li>{item.status.unavailable} unavailable</li>
            </ul>
          </div>
          <div className='col-md-3'>
            <ul>
              <li>Namespace: {item.namespace}</li>
              <li>Labels: app: {item.labels}</li>
            </ul>
          </div>
          <div className='col-md-3'>
           <ul>
              <li>Strategy: {item.strategy}</li>
              <li>Min ready seconds: {item.min_ready_seconds}</li>
              <li>Rolling update strategy: Max surge: {item.rolling_update_stategy.max_surge} Max unavailable: {item.rolling_update_stategy.max_unavailable}</li>
            </ul>
          </div>
          <div className='col-md-2'>
            <Button data_id={item.id}/>
          </div>
        </div>
      </div>
)
})
return (
  <div>
  {dep}
  </div>
)
}
}
