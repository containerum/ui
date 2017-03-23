import React, { Component } from 'react';

export default class ButtonInfo extends Component {
  render() {
    return (
      <div className = 'dropdown'>
        <button className = 'btn btn-default dropdown-toggle' type = 'button' id = 'dropdownMenu1' data-toggle = 'dropdown' aria-haspopup = 'true' aria-expanded = 'true'>
          INFO
          <span className = 'caret'></span>
        </button >
        <ul className = 'dropdown-menu' aria-labelledby = 'dropdownMenu1'>
          <li><a href = '#' >Documentation</a></li>
          <li><a href = '#'>Tutorials</a></li>
          <li><a href = '#' >Forums</a></li>
          <li role = 'separator' className = 'divider' ></li>
          <li><a href = '#' >Support< /a></li>
        </ul>
      </div>
    );
  }
}
