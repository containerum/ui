import React, { Component } from 'react';
import Box from './BoxDeployment';
import PanelReplicaSets from './PanelReplicaSets';
import { connect } from 'react-redux';
import axios from 'axios';

class Deployments_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 4,
      data_dep: []
    }
  }
  componentDidMount() {
      axios.get(`http://139.59.146.89/api/deployments/${this.props.data.id}`)
      .then(response => {
        this.setState({data_dep: response.data})
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
      }
  render() {
    const content = (
      <div>
        <Box item={this.state.data_dep}/>
        <PanelReplicaSets item={this.state.data_dep}/>
      </div>
    )
    const loader = (
      <p>Error with data receiving</p>
    )
    return (
      <div className='row rowpanel'>
        {this.state.data_dep == '' ? loader : content}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    data: state.dataDeployment
  }
}
export default connect(mapStateToProps)(Deployments_1);
