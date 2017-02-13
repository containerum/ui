import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Login extends Component {
  render() {
    return (
      <div className='row rowform'>
        <img src='http://placehold.it/70x70' className='img-circle' alt='Responsive image'/>
        <h1>Containerum</h1>
        <div className='formcontainer'>
          <h2>Log In</h2>
          <form>
            <div className='form-group'>
              <input type='email' className='form-control forminput' id='exampleInputEmail1' placeholder='Email'/>
            </div>
            <div className='form-group'>
              <input type='password' className='form-control' id='exampleInputPassword1' placeholder='Password'/>
            </div>
            <button type='submit' className='btn btn-default'><Link to='/'><h4>Log In</h4></Link></button>
          </form>
          <h5><Link to='/Forgot'>Forgot password</Link></h5>
        </div>
        <h5>Dont have an account?<Link to='/Signup'>Sign Up</Link></h5>
      </div>
    );
  }
}
