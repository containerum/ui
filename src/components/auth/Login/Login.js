import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { LOGINUser } from '../../../actions/LoginActions';
import { checkHashParamActions } from '../../../actions/checkHashParamActions';
import InputEmail from '../InputEmail';
import InputPassword from '../InputPassword';
import Logo from '../../Logo';
import MiniSpinner from '../../MiniSpinner';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            errorMsg: '',
            email: '',
            isValidEmail: false,
            password: '',
            isValidPassword: false
        };
        this.checkValidateEmailInput = this.checkValidateEmailInput.bind(this);
        this.checkValidatePasswordInput = this.checkValidatePasswordInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    checkValidateEmailInput(email, isValidEmail) {
        this.setState({
            ...this.state,
            email: email,
            isValidEmail: isValidEmail
        });
    }
    checkValidatePasswordInput(password, isValidPassword) {
        this.setState({
            ...this.state,
            password: password,
            isValidPassword: isValidPassword
        });
    }
    componentDidMount() {
        document.body.classList.add('c-body-bg');
        if (this.props.params.hashParam) {
            const { dispatch } = this.props;
            dispatch(checkHashParamActions(this.props.params.hashParam));
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errorMessage) {
            this.setState({
                ...this.state,
                errorMsg: nextProps.errorMessage
            });
            let getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        }
    }
    handleClick(event) {
        event.preventDefault();
        const { dispatch } = this.props;

        if (this.state.isValidEmail && this.state.isValidPassword) {
            const creds = { username: this.state.email.trim(), password: this.state.password.trim() };
            dispatch(LOGINUser(creds));
        } else {
            this.setState({
                ...this.state,
                errorMsg: 'Email or Password is not valid'
            });
            let getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        }
    }
    render() {
        const loginButtonText = this.props.loginReducer.isFetching ? <MiniSpinner /> : 'Log In';
        const isActiveLoginButton = this.props.loginReducer.isFetching ?
            'btn btn-block c-btn-green i-btn-login-strong disabled' :
            'btn btn-block c-btn-green i-btn-login-strong';
        
        return (
            <div className='container'>
                <Logo />
                <form className='form-signin' onSubmit={(event) => this.handleClick(event)}>
                    <div className='card c-card'>
                        <div className='card-block p-5'>
                            <div className='card-label'>
                                Log In
                            </div>
                            <div id='loginAlert' className='alert alert-danger mb-4 c-alert-danger'>
                                { this.state.errorMsg }
                            </div>
                            <InputEmail
                                handleEmail={
                                    (email, isValidEmail) =>
                                        this.checkValidateEmailInput(email, isValidEmail)
                                }
                            />
                            <InputPassword
                                handlePassword={
                                    (password, isValidPassword) =>
                                        this.checkValidatePasswordInput(password, isValidPassword)
                                }
                            />
                            <button ref='button' type='submit' className={isActiveLoginButton}>{ loginButtonText }</button>
                        </div>
                        <div className='card-footer p-3 text-center'>
                            Don't have an account? <Link to='/SignUp'>Sing up</Link>
                        </div>
                    </div>
                    <p className='text-center pt-3'>
                        <Link to='/Forgot' className='c-link-wt'>Forgot your password?</Link>
                    </p>
                </form>
            </div>
        )
    }
}

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    quote: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    errorMessage: PropTypes.string,
    isSecretQuote: PropTypes.bool,
    hashParam: PropTypes.string
};

function mapStateToProps(state) {
    const { loginReducer } = state;
    const { errorMessage } = loginReducer;

    return {
        errorMessage,
        loginReducer
    }
}

export default connect(mapStateToProps)(Login)
