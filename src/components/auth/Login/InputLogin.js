import React, { Component } from 'react'
import { Link } from 'react-router';
import validator from 'validator';
import PropTypes from 'prop-types';

export default class InputLogin extends Component {
  render() {
    const { errorMessage } = this.props

    return (
    <div>
      <div id='loginEmailAlert'><center><p>Email is not valid</p></center></div>
      <div id='loginPassAlert'><center><p>Password is not valid</p></center></div>
      <div className='row rowform'>
        <img src='http://placehold.it/70x70' className='img-circle' alt='Responsive image'/>
        <h1>Containerum</h1>
        <div className='formcontainer'>
          <h2>Log In</h2>
          <div className='form-group'>
            <input onBlur={(event) => this.ValidationGetValueMail(event)}  type='text' ref='username' className='form-control' placeholder='Email' required='required' pattern='[A-Za-z]{6,}' autoFocus />
          </div>
          <div className='form-group'>
            <input onKeyDown={(event) => this.ValidationGetValuePass(event)} type='password' ref='password' className='form-control' placeholder='Password'required='required' />
          </div>
          <button ref='button' onClick={(event) => this.handleClick(event)} className='btn btn-default btn-login_sign'>
            Log In
          </button>
          <h5><Link to='/Forgot'>Forgot password</Link></h5>
            {
              <p>{errorMessage}</p>
            }
        </div>
        <h5>Dont have an account?<Link to='/Signup'>Sign Up</Link></h5>
      </div>
    </div>
    )
  }

  ValidationGetValuePass() {
    const password = this.refs.password
    const pass = password.value.length
    const button = this.refs.button
    if (pass >= 7) {
      button.removeAttribute('disabled', 'disabled');
    }
    if (pass >= 64) {
      button.setAttribute('disabled', 'disabled');
    }
  }
    
  ValidationGetValueMail() {
      const username = this.refs.username;
      const button = this.refs.button;
      const isValidMail = validator.isEmail(username.value);
      if (isValidMail) {
          button.removeAttribute('disabled', 'disabled');
      } else {
          button.setAttribute('disabled', 'disabled');
          username.setAttribute('data-toggle', 'tooltip');
          username.setAttribute('title', 'Hooray Hooray');
      }
  }

  handleClick() {
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    const button = this.refs.button
    const valid = validator.isEmail(username.value);
    if(valid == true) {
      if (password.value.length >= 8) {
        this.props.onLoginClick(creds)
      }else {
        button.setAttribute('disabled', 'disabled');
        var get = document.getElementById('loginPassAlert')
        get.style.visibility = 'visible';
        setTimeout(function() { get.style.visibility = 'hidden'; }, 5000);
      }
    }else {
      var getAlert = document.getElementById('loginEmailAlert')
      getAlert.style.visibility = 'visible';
      setTimeout(function() { getAlert.style.visibility = 'hidden'; }, 5000);
    }
  }
}

InputLogin.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}
