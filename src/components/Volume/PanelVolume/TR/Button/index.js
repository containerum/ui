import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    return (
      <div className='dropdown'>
        <button className='btn btn-default dropdown-toggle' type='button' id='dropdownMenu1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>
          Action
          <span className='caret'></span>
        </button>
        <ul className='dropdown-menu' aria-labelledby='dropdownMenu1'>
          <li><a><p className='text-danger'>Delete</p></a></li>
        </ul>
      </div>
    );
  }
}
