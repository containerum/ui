import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';

export default class InputSignUp extends Component {
  render() {
    const { errorMessage } = this.props

    return (
      <div className='row rowform'>
        <img src='http://placehold.it/70x70' className='img-circle' alt='Responsive image'/>
        <h1>Containerum</h1>
        <div className='formcontainer'>
          <h2>Sign Up</h2>
          <div className='form-group'>
            <input type='text' ref='username' className='form-control' placeholder='Email'/>
          </div>
          <div className='form-group'>
            <input type='password' ref='password' className='form-control' placeholder='Password'/>
          </div>
          <button onClick={(event) => this.handleClick(event)} className='btn btn-default'>
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
    )
  }

  handleClick() {
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.props.onLoginClick(creds)
  }
}

InputSignUp.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}
