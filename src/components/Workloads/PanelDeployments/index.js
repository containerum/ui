import React, { Component } from 'react';
import TR from './TR';
import axios from 'axios';

export default class PanelDeployments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 2,
      data_dep: []
    }
  }
  componentDidMount() {
    axios.get('http://139.59.146.89/api/deployments')
    .then(response => {
      this.setState({data_dep: response.data});
      console.log(this.state.data_dep)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h3 className='panel-title'>Deployments</h3>
        </div>
        <div className='panel-body'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Pods</th>
              <th>Images</th>
              <th>Age</th>
              <th>Labels</th>
              <th></th>
            </tr>
          </thead>
          <TR data={this.state.data_dep} pageSize={this.state.pageSize}/>
        </table>
      </div>
    </div>
    );
  }
}
