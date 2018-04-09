/* @flow */

import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import type { Connector } from 'react-redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import cookie from 'react-cookies';
import isEmail from 'validator/lib/isEmail';
import queryString from 'query-string';

import { routerLinks } from '../../config';
import * as actionLogin from '../../actions/login';
import * as actionConfirmSignUp from '../../actions/confirmSignUp';
import {
  CONFIRM_SIGNUP_SUCCESS,
  CONFIRM_SIGNUP_FAILURE
} from '../../constants/confirmSignUpConstants';
import './Login.css';
import InputEmail from '../../components/InputEmail';
import InputPassword from '../../components/InputPassword';
import LoadButton from '../../components/LoadButton';
import { LOGIN_FAILURE, LOGIN_SUCCESS } from '../../constants/loginConstants';
import { RECOVERY_PASSWORD_SUCCESS } from '../../constants/recoveryPasswordConstants';

type Props = {
  loginReducer: Object,
  confirmSignUpReducer: Object,
  recoveryPasswordReducer: Object,
  location: Object,
  fetchLoginIfNeeded: (email: string, password: string) => void,
  fetchConfirmSignUpIfNeeded: (hashParam: string) => void
};

class Login extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = this.initialState();
  }
  componentWillMount() {
    const { hashParam } = queryString.parse(this.props.location.search);
    if (hashParam) {
      // console.log(hashParam);
      this.props.fetchConfirmSignUpIfNeeded(hashParam);
    }
    if (
      this.props.recoveryPasswordReducer.readyStatus ===
      RECOVERY_PASSWORD_SUCCESS
    ) {
      this.setState({
        ...this.state,
        successMessage:
          'Your password has been changed successfully. Please Log In.'
      });
    }
    if (this.props.loginReducer.readyStatus === LOGIN_SUCCESS) {
      this.setState(this.initialState());
    }
  }
  componentDidMount() {
    cookie.remove('token', { path: '/' });
    cookie.remove('accessToken', { path: '/' });
    cookie.remove('refreshToken', { path: '/' });
    cookie.remove('lastTimeToRefresh', { path: '/' });
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.confirmSignUpReducer.readyStatus !==
        nextProps.confirmSignUpReducer.readyStatus &&
      nextProps.confirmSignUpReducer.readyStatus === CONFIRM_SIGNUP_SUCCESS
    ) {
      // console.log(
      //   this.props.confirmSignUpReducer,
      //   nextProps.confirmSignUpReducer
      // );
      // this.setState({
      //   ...this.state,
      //   successMessage: 'Your email has been confirmed. Please Log In',
      //   isValidEmail: true,
      //   isValidPassword: true,
      //   errorMessage: null
      // });
    } else if (
      this.props.confirmSignUpReducer.readyStatus !==
        nextProps.confirmSignUpReducer.readyStatus &&
      nextProps.confirmSignUpReducer.readyStatus === CONFIRM_SIGNUP_FAILURE
    ) {
      this.setState({
        ...this.state,
        successMessage: null,
        isValidEmail: false,
        isValidPassword: false,
        errorMessage: nextProps.confirmSignUpReducer.err
      });
    }
    if (
      this.props.loginReducer.readyStatus !==
        nextProps.loginReducer.readyStatus &&
      nextProps.loginReducer.readyStatus === LOGIN_FAILURE
    ) {
      this.setState({
        ...this.state,
        successMessage: null,
        isValidEmail: false,
        isValidPassword: false,
        errorMessage: 'Email or Password is not valid'
      });
    }
  }
  initialState = () => ({
    email: '',
    isValidEmail: true,
    password: '',
    isValidPassword: true,
    errorMessage: 'Email or Password is not valid',
    successMessage: null
  });
  handleChangeEmail(email) {
    // console.log(email);
    this.setState({
      ...this.state,
      email
    });
  }
  handleChangePassword(password) {
    // console.log(password);
    this.setState({
      ...this.state,
      password
    });
  }
  handleSubmitLoginAction(e) {
    e.preventDefault();
    if (isEmail(this.state.email) && this.state.password.length > 7) {
      const { email, password } = this.state;
      // console.log(email, password, this.state);
      this.props.fetchLoginIfNeeded(email, password);
    } else {
      this.setState({
        ...this.state,
        isValidEmail: false,
        isValidPassword: false,
        errorMessage: 'Email or Password is not valid'
      });
    }
  }
  render() {
    // console.log(this.state);
    const {
      email,
      isValidEmail,
      password,
      isValidPassword,
      errorMessage,
      successMessage
    } = this.state;
    return (
      <div>
        <Helmet title="Login" />
        <div className="window">
          <div className="form">
            <div className="login-block">
              <NavLink activeClassName="active" to={routerLinks.signUp}>
                Sign Up
              </NavLink>
              <span className="login-divider">or</span>
              <NavLink activeClassName="active" to={routerLinks.login}>
                Log In
              </NavLink>
            </div>
            <div className="main-form">
              <div className="form-header form-header-login">Log In</div>
              {(!isValidEmail || !isValidPassword) && (
                <div className="error-message">
                  <span className="error-message-text">{errorMessage}</span>
                </div>
              )}
              {successMessage && (
                <div className="success-message">
                  <span className="success-message-text">{successMessage}</span>
                </div>
              )}
              <form onSubmit={e => this.handleSubmitLoginAction(e)}>
                <InputEmail
                  handleChangeEmail={value => this.handleChangeEmail(value)}
                  value={email}
                  id="email"
                  placeholder="Email"
                />
                <InputPassword
                  handleChangePassword={value =>
                    this.handleChangePassword(value)
                  }
                  value={password}
                  id="password"
                  placeholder="Password"
                />
                <LoadButton
                  type="submit"
                  buttonText="Log In"
                  isFetching={this.props.loginReducer.isFetching}
                  baseClassButton="input-btn login-btn"
                />
              </form>
              <NavLink
                activeClassName="active"
                className="forg-pass"
                to={routerLinks.forgot}
              >
                Forgot your password?
              </NavLink>
              <div>
                {false && (
                  <div>
                    <span className="or-divider">or</span>
                    <div className="social-title">
                      Sign up with your favourite social profile
                    </div>
                    <div className="social-wrapper">
                      <a href="https://github.com/">
                        <img
                          src={require('../../images/github.svg')}
                          alt="github"
                        />
                      </a>
                      <a
                        href="https://google.com/"
                        className="social-center-icon"
                      >
                        <img
                          src={require('../../images/google.svg')}
                          alt="google"
                        />
                      </a>
                      <a href="https://facebook.com/">
                        <img src={require('../../images/fb.svg')} alt="fb" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ loginReducer, confirmSignUpReducer, recoveryPasswordReducer }) => ({
    loginReducer,
    confirmSignUpReducer,
    recoveryPasswordReducer
  }),
  dispatch => ({
    fetchLoginIfNeeded: (email: string, password: string) =>
      dispatch(actionLogin.fetchLoginIfNeeded(email, password)),
    fetchConfirmSignUpIfNeeded: (hashParam: string) =>
      dispatch(actionConfirmSignUp.fetchConfirmSignUpIfNeeded(hashParam))
  })
);

export default connector(Login);
