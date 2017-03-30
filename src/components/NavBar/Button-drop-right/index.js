import React, { Component } from 'react';
import { Link } from 'react-router';
import { logoutUser } from '../../../actions'
import { connect } from 'react-redux'

class ButtonDropRight extends Component {
  render() {
    const { dispatch } = this.props
    return (
      <div className = 'dropdown'>
        <button className = 'btn btn-default dropdown-toggle' type = 'button' id = 'dropdownMenu1' data-toggle = 'dropdown' aria-haspopup = 'true' aria-expanded = 'true'>
          <span className = 'caret'></span>
        </button>
        <ul className = 'dropdown-menu' aria-labelledby = 'dropdownMenu1'>
          <li>
            <a href = '#'>
              <img src = 'http://www.esek.org.gr/images/ESET/eset_user.png' alt = '...' className = 'img-circle' />
              kfeofantov
            </a>
          </li>
          <li>
            <a href = '#'>kfeofantov @gmail.com</a>
          </li >
          <li role = 'separator' className = 'divider'></li>
          <li>
            <Link to = '/Profile'>Profile</Link>
          </li>
          <li>
            <Link to = '/Billing'>Billing</Link>
          </li>
          <li>
            <Link to = '/Referrals'>Referrals</Link>
          </li>
          <li>
            <Link onClick={dispatch(logoutUser())} to = '/Login'>Log Out</Link>
          </li>
        </ul>
      </div>
    );
  }
}
function mapStateToProps(state) {

  const { auth } = state
  const { errorMessage } = auth

  return {
    errorMessage
  }
}

export default connect(mapStateToProps)(ButtonDropRight)
