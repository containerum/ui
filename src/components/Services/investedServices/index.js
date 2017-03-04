import React, { Component } from 'react';
import Box from './Box';
import PanelPods from './PanelPods';
import { connect } from 'react-redux';

var table_data = [
  {id: '1', name: 'kubernetes1', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {id: '2', name: 'kubernetes2', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {id: '3', name: 'kubernetes3', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {id: '4', name: 'kubernetes4', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {id: '5', name: 'kubernetes5', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {id: '6', name: 'kubernetes6', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {id: '7', name: 'kubernetes7', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'},
  {id: '8', name: 'kubernetes8', cluster: '10.96.01', provider: 'provider: kubernetes', lastupdate: '29.01.2017', labels: 'component: apiserver'}
];

class Services_1 extends Component {
  render() {
    var { data } = this.props;
    var renderServices = table_data.map(function(item){
      if (item.id == data.id) {
        return (
          <div className='row'>
            <Box item={item}/>
            <PanelPods />
          </div>
        );
      }
    })
    return (
      <div>
        {renderServices}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    data: state.dataDeployment
  }
}

export default connect(mapStateToProps)(Services_1);
