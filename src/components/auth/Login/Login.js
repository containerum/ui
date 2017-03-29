
import React, { Component, PropTypes } from 'react'
import InputLogin from './InputLogin'
import { LOGINUser } from '../../../actions'

export default class Login extends Component {

  render() {
    const { dispatch, errorMessage } = this.props

    return (
      <div>
          <InputLogin
            errorMessage={errorMessage}
            onLoginClick={ creds => dispatch(LOGINUser(creds)) }
          />
      </div>
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}
