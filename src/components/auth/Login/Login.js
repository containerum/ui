import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { LOGINUser } from '../../../actions/LoginActions';
import { getUserHashConfirm } from '../../../actions/UserHashConfirmActions';
import InputEmail from '../InputEmail';
import InputPassword from '../InputPassword';
import Logo from '../../Logo';
import MiniSpinner from '../../MiniSpinner';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            errorMsg: '',
            successMsg: '',
            email: '',
            isValidEmail: false,
            password: '',
            isValidPassword: false
        };
        this.handleCheckValidateEmailInput = this.handleCheckValidateEmailInput.bind(this);
        this.handleCheckValidatePasswordInput = this.handleCheckValidatePasswordInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        document.body.classList.add('c-body-bg');
        localStorage.removeItem('id_token');
        if (this.props.location.query.hashParam) {
            const { dispatch } = this.props;
            dispatch(getUserHashConfirm(this.props.location.query.hashParam));
        }
    }
    componentDidMount() {
        if (this.props.location.query.hashConf && this.props.RecoveryPasswordReducer.status === 202) {
            this.setState({
                ...this.state,
                successMsg: 'Your password has been changed successfully. Please Log In.'
            });
            const getSuccessAlert = document.getElementById('successfulAlert');
            getSuccessAlert.style.display = 'block';
        } else if (!!this.props.location.query.hashConf && this.props.RecoveryPasswordReducer.status !== 0) {
            this.setState({
                ...this.state,
                errorMsg: 'Error! Your password was not changed.'
            });
            const getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UserHashConfirmReducer.data === 200) {
            this.setState({
                ...this.state,
                successMsg: 'Your email has been confirmed. Please Log In.'
            });
            const getSuccessAlert = document.getElementById('successfulAlert');
            getSuccessAlert.style.display = 'block';
        } else if (this.props.location.query.hashParam && nextProps.UserHashConfirmReducer.errorMessage && !nextProps.errorMessage) {
            this.setState({
                ...this.state,
                errorMsg: 'Hash is not valid'
            });
            const getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        }
        if (nextProps.errorMessage) {
            this.setState({
                ...this.state,
                errorMsg: nextProps.errorMessage
            });
            const getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        }
    }
    handleCheckValidateEmailInput(email, isValidEmail) {
        this.setState({
            ...this.state,
            email: email,
            isValidEmail: isValidEmail
        });
    }
    handleCheckValidatePasswordInput(password, isValidPassword) {
        this.setState({
            ...this.state,
            password: password,
            isValidPassword: isValidPassword
        });
    }
    handleClick(event) {
        event.preventDefault();
        const { dispatch } = this.props;

        if (this.state.password.length <= 7) {
            this.setState({
                ...this.state,
                errorMsg: 'Password must be at least 8 characters long'
            });
            const getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        } else if (this.state.isValidEmail && this.state.isValidPassword) {
            const creds = { username: this.state.email.trim(), password: this.state.password.trim() };
            dispatch(LOGINUser(creds));
        } else {
            this.setState({
                ...this.state,
                errorMsg: 'Email or Password is not valid'
            });
            const getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        }
    }
    render() {
        const loginButtonText = this.props.loginReducer.isFetching ? <MiniSpinner /> : 'Log In';
        const isActiveLoginButton = this.props.loginReducer.isFetching ?
            'btn btn-block c-btn-green i-btn-login-strong disabled' :
            'btn btn-block c-btn-green i-btn-login-strong';
        return (
            <div className="container">
                <Logo />
                <form className="form-signin" onSubmit={(event) => this.handleClick(event)}>
                    <div className="card c-card">
                        <div className="card-block p-5">
                            <div className="card-label">
                                Log In
                            </div>
                            <div id="loginAlert" className="alert alert-danger mb-4 c-alert-danger">
                                { this.state.errorMsg }
                            </div>
                            <div id="successfulAlert" className="alert alert-success mb-4 c-alert-success">
                                { this.state.successMsg }
                            </div>
                            <InputEmail
                                handleEmail={
                                    (email, isValidEmail) =>
                                        this.handleCheckValidateEmailInput(email, isValidEmail)
                                }
                            />
                            <InputPassword
                                handlePassword={
                                    (password, isValidPassword) =>
                                        this.handleCheckValidatePasswordInput(password, isValidPassword)
                                }
                            />
                            <button ref="button" type="submit" className={isActiveLoginButton}>{ loginButtonText }</button>
                        </div>
                        <div className="card-footer p-3 text-center">
                            Don`t have an account? <Link to="/SignUp">Sing up</Link>
                        </div>
                    </div>
                    <p className="text-center pt-3">
                        <Link to="/Forgot" className="c-link-wt">Forgot your password?</Link>
                    </p>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    quote: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    errorMessage: PropTypes.string,
    loginReducer: PropTypes.object,
    RecoveryPasswordReducer: PropTypes.object,
    location: PropTypes.object,
    isSecretQuote: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        loginReducer: state.loginReducer,
        errorMessage: state.loginReducer.errorMessage,
        UserHashConfirmReducer: state.UserHashConfirmReducer,
        RecoveryPasswordReducer: state.RecoveryPasswordReducer
    };
}


export default connect(mapStateToProps)(Login);
