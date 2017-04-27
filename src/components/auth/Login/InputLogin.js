import React, { Component } from 'react'
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InputEmail from '../InputEmail/InputEmail';
import InputPassword from '../InputPassword/InputPassword';

class InputLogin extends Component {
    constructor() {
        super();
        this.state = {
            errorMsg: ''
        };
    }
    render() {
        return (
            <div className='container'>
                <div className='text-center p-4'>
                    <img src='https://www.prodpad.com/wp-content/uploads/trello-logo-white.png' className='c-logo-login' alt='Responsive image'/>
                </div>
                <form className='form-signin' onSubmit={(event) => this.handleClick(event)}>
                    <div className='card c-card'>
                        <div className='card-block p-5'>
                            <div id='loginAlert' className='alert alert-danger mb-2'>{ this.state.errorMsg }</div>
                            <InputEmail />
                            <InputPassword />
                            <button ref='button' type='submit' className='btn btn-block c-btn-blue'>Log In</button>
                        </div>
                        <div className='card-footer text-center'>Don't have an account?<Link to='/Signup'>Sing up</Link></div>
                    </div>
                    <p className='text-center pt-2'><Link to='/Forgot' className='c-link-wt'>Forgot your password?</Link></p>
                </form>
            </div>
        )
    }

    componentWillReceiveProps(nextProps, currProps) {
        if(nextProps.errorMessage !== undefined && nextProps !== currProps) {
            this.setState({
                errorMsg: nextProps.errorMessage
            });
            let getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        }
    }

    handleClick(event) {
        event.preventDefault();
        const {
            isValidEmail,
            emailUser,
            isValidPassword,
            passUser
        } = this.props.validate;

        const creds = { username: emailUser.trim(), password: passUser.trim() };
        if(isValidEmail && isValidPassword) {
            this.props.onLoginClick(creds);
        } else {
            this.setState({
                errorMsg: 'Email or Password is not valid'
            });
            let getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
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
