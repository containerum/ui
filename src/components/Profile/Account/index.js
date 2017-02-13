import React, { Component } from 'react'

export default class Account extends Component {
  render() {
    return (
      <div className='col-md-13'>
      <div className='col-md-2'>
        <h4>Account</h4>
        <img src='http://placehold.it/150x150' alt='...' className='img-rounded'/>
      </div>
      <div className='col-md-2'>
        <ul>
          <li><h4>kfeofanov</h4></li>
          <li>kfeofanov@gmail.com</li>
        </ul>
      </div>
      <div className='col-md-2'>
        <ul>
          <li>Plan: ULTRA</li>
          <li>Limits</li>
          <li>RAM: 8 GB</li>
          <li>STORAGE: 40 GB</li>
        </ul>
      </div>
      <div className='col-md-2 editprofile'>
        <button className='btn btn-default' type='submit'>Edit Profile</button>
      </div>
    </div>
    );
  }
}
