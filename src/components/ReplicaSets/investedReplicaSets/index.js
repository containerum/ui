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
        axios.get('http://139.59.146.89/api/replicasets/', {
            params: {
              id: this.props.data.id
            }
          })
        .then(response => {
          this.setState({data_replica: response.data})
          console.log(this.state.data_replica);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
  render() {
        return (
          <div className='row rowpanel'>
            <Box item={this.state.data_replica}/>
            <PanelPods item={this.state.data_replica}/>
            <PanelEvents item={this.state.data_replica}/>
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
