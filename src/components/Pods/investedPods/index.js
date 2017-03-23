import React, { Component } from 'react';
import Box from './Box';
import BoxContainers from './BoxContainers';
import BoxConditions from './BoxConditions';
import { connect } from 'react-redux';
import axios from 'axios';

class Pods_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 4,
      data_pods: []
    }
  }
  componentDidMount() {
        axios.get('http://139.59.146.89/api/pods/x1')
        .then(response => {
          this.setState({data_pods: response.data})
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
  render() {
    const content = (
      <div>
        <Box item={this.state.data_pods}/>
        <div className='row rowcopod'>
          <div className='col-md-13'>
            <BoxContainers item={this.state.data_pods.containers}/>
            <BoxConditions item={this.state.data_pods.conditions} />
          </div>
        </div>
      </div>
    )
    const loader = (
      <p>Error with data receiving</p>
    )
        return (
            <div className='row rowpanel'>
              {this.state.data_pods == '' ? loader : content}
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
