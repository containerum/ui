import React, { Component } from 'react'
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InputEmail from '../InputEmail/InputEmail';

class InputLogin extends Component {
    render() {
        const { errorMessage } = this.props;

        return (
            <div>
                <div id='loginAlert'><center><p>Email or Password is not valid</p></center></div>
                <form className='row rowform' onSubmit={(event) => this.handleClick(event)}>
                    <img src='http://placehold.it/70x70' className='img-circle' alt='Responsive image'/>
                    <h1>Containerum</h1>
                    <div className='formcontainer'>
                        <h2>Log In</h2>
                        <div className='form-group'>
                            <InputEmail />
                        </div>
                        <div className='form-group'>
                            <input
                                onKeyDown={(event) => this.ValidationGetValuePass(event)}
                                type='password'
                                ref='password'
                                className='form-control'
                                placeholder='Password'
                                required='required'
                            />
                        </div>
                        <button ref='button' className='btn btn-default btn-login_sign'>Log In</button>
                        <h5><Link to='/Forgot'>Forgot password</Link></h5>
                        {
                            <p>{errorMessage}</p>
                        }
                    </div>
                    <h5>Dont have an account?<Link to='/Signup'>Sign Up</Link></h5>
                </form>
            </div>
        )
    }

    ValidationGetValuePass() {
        const password = this.refs.password;
        const pass = password.value.length;
        const button = this.refs.button;
        if (pass >= 7) {
            button.removeAttribute('disabled', 'disabled');
        }
        if (pass >= 64) {
            button.setAttribute('disabled', 'disabled');
        }
    }

    handleClick(event) {
        event.preventDefault();
        const { isValidEmail, emailUser } = this.props.validate;

        const password = this.refs.password.value;
        const creds = { username: emailUser.trim(), password: password.trim() };
        if(isValidEmail && (password.length >= 7 && password.length <= 64)) {
            this.props.onLoginClick(creds)
        } else {
            let getAlert = document.getElementById('loginAlert');
            getAlert.style.visibility = 'visible';
            setTimeout(function() { getAlert.style.visibility = 'hidden'; }, 5000);
        }
    }
}

InputLogin.propTypes = {
    onLoginClick: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

function mapStateToProps (state) {
    return {
        validate: state.validate
    }
}

export default connect(mapStateToProps)(InputLogin)
