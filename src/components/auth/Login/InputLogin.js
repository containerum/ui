import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';

export default class InputLogin extends Component {
  render() {
    const { errorMessage } = this.props

    return (
      <div className='row rowform'>
        <img src='http://placehold.it/70x70' className='img-circle' alt='Responsive image'/>
        <h1>Containerum</h1>
        <div className='formcontainer'>
          <h2>Log In</h2>
          <div className='form-group'>
            <input type='text' ref='username' className='form-control' placeholder='Username'/>
          </div>
          <div className='form-group'>
            <input type='password' ref='password' className='form-control' placeholder='Password'/>
          </div>
          <button onClick={(event) => this.handleClick(event)} className='btn btn-default'>
            Log In
          </button>
          <h5><Link to='/Forgot'>Forgot password</Link></h5>
            {errorMessage &&
              <p>{errorMessage}</p>
            }
        </div>
        <h5>Dont have an account?<Link to='/Signup'>Sign Up</Link></h5>
      </div>
    )
  }

  handleClick() {
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.props.onLoginClick(creds)
  }
}

InputLogin.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}
