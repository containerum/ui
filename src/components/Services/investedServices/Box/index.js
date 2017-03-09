import React, { Component } from 'react';
import Button from './Button';

export default class Box extends Component {
  render() {
    var dep = this.props.item.map(function(item){
    return (
      <div className='col-md-13'>
        <div className='box1-deploy'>
            <div className='col-md-5'>
              <h3>{item.name}</h3>
              <ul className='servul'>
              <li>Namespace:</li>
              <li>Labels: components: apiserver provider: {item.endpoints.host}</li>
              <li>Label selector: {item.labels}</li>
              <li>Creation time: {item.creation_time}</li>
              </ul>
            </div>
            <div className='col-md-4'>
            <ul>
              <li>Cluster {item.ip}</li>
            </ul>
          </div>
          <div className='col-md-3'>
            <Button data_id={item.id}/>
          </div>
        </div>
      </div>
    );
    })
    return (
      <div>
        {dep}
      </div>
    )
  }
}
