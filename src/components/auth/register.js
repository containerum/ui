import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../../actions';
import { Link } from 'react-router';

const form = reduxForm({
  form: 'register',
  validate
});

const renderField = field => (
    <div>
      <input className='form-control' {...field.input}/>
      {field.touched && field.error && <div className='error'>{field.error}</div>}
    </div>
);

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  return errors;
}

class Register extends Component {
  handleFormSubmit(formProps) {
    this.props.registerUser(formProps);
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
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.renderAlert()}
            <div className='form-group'>
              <Field name='email' className='form-control' component={renderField} type='text' placeholder='Email'/>
            </div>
            <div className='form-group'>
              <Field name='password' className='form-control' component={renderField} type='password' placeholder='Password'/>
            </div>
          <button type='submit' className='btn btn-default'>Sign Up</button>
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

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, { registerUser })(form(Register));
