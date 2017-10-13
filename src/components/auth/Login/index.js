import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
// import GoogleLogin from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
// import GitHubLogin from 'react-github-login';

import { loginUser } from '../../../actions/LoginActions';
import { getUserHashConfirm } from '../../../actions/UserHashConfirmActions';
import { checkRelationWithGitHubAccount } from '../../../actions/CheckRelationWithGitHubAccountActions';
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
            this.props.onGetUserHashConfirm(this.props.location.query.hashParam);
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
        if (this.state.password.length <= 7) {
            this.setState({
                ...this.state,
                errorMsg: 'Password must be at least 8 characters long'
            });
            const getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        } else if (this.state.isValidEmail && this.state.isValidPassword) {
            const creds = { username: this.state.email.trim(), password: this.state.password.trim() };
            this.props.onLoginUser(creds);
        } else {
            this.setState({
                ...this.state,
                errorMsg: 'Email or Password is not valid'
            });
            const getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        }
    }
    // responseGitHubSuccess(response) {
    //     console.log(response.code);
    //     this.props.onCheckRelationWithGitHubAccount(response.code);
    // }
    // responseGitHubFail(response) {
    //     console.log(response);
    // }
    // responseFacebook(response) {
    //     console.log(response);
    // }
    // responseGoogle(response) {
    //     console.log(response);
    // }
    render() {
        // console.log(this.props.CheckRelationWithGitHubAccountReducer);
        const loginButtonText = this.props.LoginReducer.isFetching ? <MiniSpinner /> : 'Log In';
        const isActiveLoginButton = this.props.LoginReducer.isFetching ?
            'btn btn-block c-btn-green i-btn-login-strong disabled' :
            'btn btn-block c-btn-green i-btn-login-strong';
        const isActiveLoginState = !!this.props.LoginReducer.isFetching;
        return (
            <div className="main_container">
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
                            <button
                                ref="button"
                                type="submit"
                                className={isActiveLoginButton}
                                disabled={isActiveLoginState}
                            >
                                { loginButtonText }
                            </button>

                            {/*<div className="mt-4">*/}
                            {/*<GoogleLogin*/}
                            {/*clientId="294905409413-taejsg1tkosfdek82d7ir0jfdq5leaum.apps.googleusercontent.com"*/}
                            {/*buttonText=""*/}
                            {/*redirectUri="http://web.containerum.io/Login/callback"*/}
                            {/*onSuccess={this.responseGoogle.bind(this)}*/}
                            {/*onFailure={this.responseGoogle.bind(this)}*/}
                            {/*className="fa fa-google-plus-official google-auth"*/}
                            {/*/>*/}
                            {/*<FacebookLogin*/}
                            {/*appId="258990084596781"*/}
                            {/*autoLoad={false}*/}
                            {/*fields="name,email,picture"*/}
                            {/*callback={this.responseFacebook.bind(this)}*/}
                            {/*cssClass="facebook-auth"*/}
                            {/*icon="fa fa-facebook-official"*/}
                            {/*textButton=""*/}
                            {/*/>*/}
                            {/*<GitHubLogin*/}
                            {/*clientId="862f80ac6b993a4561b2"*/}
                            {/*redirectUri="http://localhost:3000/login/callback"*/}
                            {/*onSuccess={this.responseGitHubSuccess.bind(this)}*/}
                            {/*onFailure={this.responseGitHubFail.bind(this)}*/}
                            {/*className="github-auth fa fa-github"*/}
                            {/*buttonText=""*/}
                            {/*/>*/}
                            {/*</div>*/}
                        </div>
                        <div className="card-footer p-3 text-center">
                            Don`t have an account? <Link to="/SignUp">Sign up</Link>
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
    onGetUserHashConfirm: PropTypes.func.isRequired,
    onCheckRelationWithGitHubAccount: PropTypes.func,
    onLoginUser: PropTypes.func.isRequired,
    quote: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    errorMessage: PropTypes.string,
    LoginReducer: PropTypes.object,
    RecoveryPasswordReducer: PropTypes.object,
    CheckRelationWithGitHubAccountReducer: PropTypes.object,
    location: PropTypes.object,
    isSecretQuote: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        LoginReducer: state.LoginReducer,
        errorMessage: state.LoginReducer.errorMessage,
        UserHashConfirmReducer: state.UserHashConfirmReducer,
        RecoveryPasswordReducer: state.RecoveryPasswordReducer,
        CheckRelationWithGitHubAccountReducer: state.CheckRelationWithGitHubAccountReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetUserHashConfirm: hashParam => {
            dispatch(getUserHashConfirm(hashParam));
        },
        onLoginUser: creds => {
            dispatch(loginUser(creds));
        },
        onCheckRelationWithGitHubAccount: code => {
            dispatch(checkRelationWithGitHubAccount(code));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
