import React, { Component } from 'react';
import Box from './Box';
import PanelPods from './PanelPods';
import PanelServices from './PanelServices';
import PanelEvents from './PanelEvents';
import { connect } from 'react-redux';

var table_data = [
  {id: '1', name: 'Test 1', pods: '1 / 1', images: 'redis', age: '1h', labels: 'ngnix'},
  {id: '2', name: 'Test 2', pods: '1 / 1', images: 'redis', age: '1h', labels: 'ngnix'},
  {id: '3', name: 'Test 3', pods: '1 / 1', images: 'redis', age: '1h', labels: 'ngnix'},
  {id: '4', name: 'Test 4', pods: '1 / 1', images: 'redis', age: '1h', labels: 'ngnix'},
  {id: '5', name: 'Test 5', pods: '1 / 1', images: 'redis', age: '1h', labels: 'ngnix'},
  {id: '6', name: 'Test 6', pods: '1 / 1', images: 'redis', age: '1h', labels: 'ngnix'},
  {id: '7', name: 'Test 7', pods: '1 / 1', images: 'redis', age: '1h', labels: 'ngnix'},
  {id: '8', name: 'Test 8', pods: '1 / 1', images: 'redis', age: '1h', labels: 'ngnix'}
];

class ReplicaSet extends Component {
  render() {
    var { data } = this.props;
    var renderReplicaSet = table_data.map(function(item){
      if (item.id == data.id) {
        return (
          <div className='row rowpanel'>
            <Box item={item}/>
            <PanelPods />
            <PanelServices />
            <PanelEvents />
          </div>
        );
      }
    })
    return (
      <div>
        {renderReplicaSet}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    data: state.dataDeployment
  }
}

export default connect(mapStateToProps)(ReplicaSet);
