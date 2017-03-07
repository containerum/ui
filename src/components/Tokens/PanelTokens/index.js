import React, { Component } from 'react';
import TR from './TR';
import axios from 'axios';

export default class PanelTokens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_token: []
    }
  }
  componentDidMount() {
    axios.get('/api/tokens')
    .then(response => {
      this.setState({data_token: response.data});
      console.log(this.state.data_token)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h3 className='panel-title'>Tokens</h3>
        </div>
        <div className='panel-body'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th></th>
              <th></th>
              <th></th>
              <th>Last Update</th>
              <th></th>
            </tr>
          </thead>
          <TR data={this.state.data_token}/>
        </table>
      </div>
    </div>
    );
  }
}
