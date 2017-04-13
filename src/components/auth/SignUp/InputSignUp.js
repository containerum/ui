import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';
import validator from 'validator';

export default class InputSignUp extends Component {
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
          <h2>Sign Up</h2>
          <div className='form-group'>
            <input type='text' ref='username' className='form-control' placeholder='Email'/>
          </div>
          <div className='form-group'>
            <input onKeyDown={(event) => this.ValidationGetValuePass(event)} type='password' ref='password' className='form-control' placeholder='Password'/>
          </div>
          <button ref='button' onClick={(event) => this.handleClick(event)} className='btn btn-default'>
            SignUp
          </button>
          <div className='conh5'>
            <h5>By signing up, you agree to the</h5>
            <h5><a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a></h5>
          </div>
            {errorMessage &&
              <p>{errorMessage}</p>
            }
        </div>
        <h5>Dont have an account?<Link to='/Login'>Log In</Link></h5>
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

  handleClick() {
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    const button = this.refs.button
    const valid = validator.isEmail(username.value);
    if(valid == true) {
      if (password.value.length >= 8) {
        this.props.SignUpUser(creds)
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

InputSignUp.propTypes = {
  SignUpUser: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}
