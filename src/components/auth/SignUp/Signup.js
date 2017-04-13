
import React, { Component, PropTypes } from 'react'
import InputSignUp from './InputSignUp'
import { SignUpUser } from '../../../actions'

export default class SignUp extends Component {

  render() {
    const { dispatch, errorMessage } = this.props

    return (
      <div>
          <InputSignUp
            errorMessage={errorMessage}
            SignUpUser={ creds => dispatch(SignUpUser(creds)) }
          />
      </div>
    )
  }
}

SignUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}
