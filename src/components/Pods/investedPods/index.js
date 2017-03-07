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
        axios.get('/api/pods/', {
            params: {
              uid: this.props.data.id
            }
          })
        .then(response => {
          this.setState({data_pods: response.data})
          console.log(this.state.data_pods);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
  render() {
        return (
            <div className='row rowpanel'>
              <Box item={this.state.data_pods}/>
              <div className='row rowcopod'>
                <div className='col-md-13'>
                  <BoxContainers item={this.state.data_pods}/>
                  <BoxConditions item={this.state.data_pods} />
                </div>
              </div>
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
