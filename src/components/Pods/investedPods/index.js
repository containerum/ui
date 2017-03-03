import React, { Component } from 'react';
import Box from './Box';
import BoxContainers from './BoxContainers';
import BoxConditions from './BoxConditions';
import PanelCreated from './PanelCreated';
import { connect } from 'react-redux';

var table_data = [
  {id: '1', name: 'redis-django-123456781-7fns', age: '11h'},
  {id: '2', name: 'redis-django-123456782-7fns', age: '11h'},
  {id: '3', name: 'redis-django-123456783-7fns', age: '11h'},
  {id: '4', name: 'redis-django-123456784-7fns', age: '11h'},
  {id: '5', name: 'redis-django-123456785-7fns', age: '11h'},
  {id: '6', name: 'redis-django-123456786-7fns', age: '11h'},
  {id: '7', name: 'redis-django-123456787-7fns', age: '11h'},
  {id: '8', name: 'redis-django-123456788-7fns', age: '11h'}
];

class Pods_1 extends Component {
  render() {
    var { data } = this.props;
    var renderPods = table_data.map(function(item){
      if (item.id == data.id) {
        return (
            <div className='row rowpanel'>
              <Box item={item}/>
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
    })
    return (
      <div>
        {renderPods}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    data: state.dataDeployment
  }
}

export default connect(mapStateToProps)(Pods_1);
