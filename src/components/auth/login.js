import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { loginUser } from '../../actions';
import { Link } from 'react-router';

const form = reduxForm({
  form: 'login'
});

class Login extends Component {
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className='row rowform'>
        <img src='http://placehold.it/70x70' className='img-circle' alt='Responsive image'/>
        <h1>Containerum</h1>
        <div className='formcontainer'>
          <h2>Log In</h2>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          {this.renderAlert()}
          <div className='form-group'>
            <Field name='email' className='form-control' component='input' type='text' placeholder='Email'/>
          </div>
          <div className='form-group'>
            <Field name='password' className='form-control' component='input' type='password' placeholder='Password'/>
          </div>
          <button type='submit' className='btn btn-default'>Login</button>
        </form>
        <h5><Link to='/Forgot'>Forgot password</Link></h5>
      </div>
      <h5>Dont have an account?<Link to='/Signup'>Sign Up</Link></h5>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, { loginUser })(form(Login));
