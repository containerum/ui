import React, { Component } from 'react';
import Box from './Box';
import PanelPods from './PanelPods';
import PanelEvents from './PanelEvents';
import { connect } from 'react-redux';
import axios from 'axios';

class ReplicaSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 4,
      data_replica: []
    }
  }
  componentDidMount() {
        axios.get(`http://139.59.146.89/api/replicasets/${this.props.data.id}`)
        .then(response => {
          this.setState({data_replica: response.data})
          console.log(this.state.data_replica);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
  render() {
    const content = (
      <div>
        <Box item={this.state.data_replica}/>
        <PanelPods item={this.state.data_replica.pods}/>
        <PanelEvents item={this.state.data_replica.events}/>
      </div>
    )
    const loader = (
      <p>Error with data receiving</p>
    )
        return (
          <div className='row rowpanel'>
            {this.state.data_replica == '' ? loader : content}
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
