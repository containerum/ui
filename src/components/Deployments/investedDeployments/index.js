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
        axios.get('/api/deployments/', {
            params: {
              uid: this.props.data.id
            }
          })
        .then(response => {
          this.setState({data_dep: response.data})
          console.log(this.state.data_dep);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
  render() {
    return (
      <div className='row rowpanel'>
        <Box item={this.state.data_dep}/>
        <PanelReplicaSets item={this.state.data_dep}/>
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
