import React, { Component } from 'react';
import TR from './TR';
import axios from 'axios';

export default class PanelVolume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 4,
      data_volume: []
    }
  }
  componentDidMount() {
    axios.get('/api/volume')
    .then(response => {
      this.setState({data_volume: response.data});
      console.log(this.state.data_volume)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h3 className='panel-title'>Volume</h3>
        </div>
        <div className='panel-body'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th></th>
              <th>Replica Sets</th>
              <th>Age</th>
              <th>Labels</th>
              <th></th>
            </tr>
          </thead>
          <TR data={this.state.data_volume} pageSize={this.state.pageSize}/>
        </table>
      </div>
    </div>
    );
  }
}
