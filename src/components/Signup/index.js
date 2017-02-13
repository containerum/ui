import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Signup extends Component {
  render() {
    return (
      <div className='row rowform'>
        <img src='http://placehold.it/70x70' className='img-circle' alt='Responsive image'/>
        <h1>Containerum</h1>
        <div className='formcontainer'>
          <h2>Sign Up</h2>
          <form>
          <div className='form-group'>
            <input type='email' className='form-control forminput' id='exampleInputEmail1' placeholder='Email'/>
          </div>
          <div className='form-group'>
            <input type='password' className='form-control' id='exampleInputPassword1' placeholder='Password'/>
          </div>
          <button type='submit' className='btn btn-default'><Link to='/'><h4>Sign Up</h4></Link></button>
        </form>
        <div className='conh5'>
          <h5>By signing up, you agree to the</h5>
          <h5><a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a></h5>
        </div>
      </div>
      <h5>Dont have an account?<Link to='/Login'>Log In</Link></h5>
    </div>
  );
  }
}
