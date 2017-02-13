import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    return (
      <div className='dropdown'>
       <button className='btn btn-default dropdown-toggle' type='button' id='dropdownMenu1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>
        Action
        <span className='caret'></span>
       </button>
       <ul className='dropdown-menu dropServWork' aria-labelledby='dropdownMenu1'>
        <li><a href='#'><span className='glyphicon glyphicon-play' aria-hidden='true'></span>Play</a></li>
        <li><a href='#'><span className='glyphicon glyphicon-pause' aria-hidden='true'></span>Stop</a></li>
        <li><a href='#'><span className='glyphicon glyphicon-repeat' aria-hidden='true'></span>Redeploy</a></li>
        <li role='separator' className='divider'></li>
        <li><a href='#'>Edit</a></li>
        <li><a href='#'>Logs</a></li>
        <li role='separator' className='divider'></li>
        <li><a href='#'>Delete</a></li>
       </ul>
      </div>
    );
  }
}
