import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Forgot extends Component {
  render() {
    return (
      <div className='row rowform'>
       <img src='http://placehold.it/70x70' className='img-circle' alt='Responsive image'/>
       <h1>Containerum</h1>
       <div className='formcontainer'>
        <h2 className='resh2'>Reset Password</h2>
        <form>
            <div className='form-group'>
            <input type='email' className='form-control forminput' id='exampleInputEmail1' placeholder='E-mail Adress'/>
            </div>
            <Link type='submit' className='btn btn-default btn-reset' to='/'><h4>Reset</h4></Link>
            <h5><Link to='/Login'>Go to Login</Link></h5>
        </form>
    </div>
  </div>
  );
}
}
