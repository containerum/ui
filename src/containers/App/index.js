import React, { Component } from 'react';
import NavLink from '../../components/NavLink';
import './style.scss';
import './titatoggle-dist.scss';
import NavBar from '../../components/NavBar';

export default class App extends Component {
  render() {
    return (
      <div className='container'>
        <NavBar />
        <ul className='nav nav-pills nav-stacked'>
          <li><NavLink onlyActiveOnIndex={true} to='/'>Workloads</NavLink></li>
          <li><NavLink to='/Deployments'>Deployments</NavLink></li>
          <li><NavLink to='/ReplicaSets'>Replica Sets</NavLink></li>
          <li><NavLink to='/Pods'>Pods</NavLink></li>
          <li><NavLink to='/Services'>Services</NavLink></li>
          <li><NavLink to='/Storage'>Storage</NavLink></li>
          <li><NavLink to='/Volume'>Volume</NavLink></li>
          <li><NavLink to='/Config'>Config</NavLink></li>
          <li><NavLink to='/Secrets'>Secrets</NavLink></li>
          <li><NavLink to='/Tokens'>Tokens</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}
