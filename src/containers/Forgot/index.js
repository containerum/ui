/* @flow */

import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import type { Connector } from 'react-redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import cookie from 'react-cookies';
import isEmail from 'validator/lib/isEmail';

import { routerLinks } from '../../config';
import * as actionForgot from '../../actions/forgot';
import InputEmail from '../../components/InputEmail';
import LoadButton from '../../components/LoadButton';
import { FORGOT_FAILURE } from '../../constants/forgotConstants';

type Props = {
  forgotReducer: Object,
  fetchForgotIfNeeded: (email: string, password: string) => void
};

class Forgot extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isValidEmail: true,
      errorMessage: 'Email is not valid'
    };
  }
  componentDidMount() {
    cookie.remove('token', { path: '/' });
    cookie.remove('accessToken', { path: '/' });
    cookie.remove('refreshToken', { path: '/' });
    cookie.remove('lastTimeToRefresh', { path: '/' });
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.forgotReducer.readyStatus !==
        nextProps.forgotReducer.readyStatus &&
      nextProps.forgotReducer.readyStatus === FORGOT_FAILURE
    ) {
      this.setState({
        ...this.state,
        isValidEmail: false,
        errorMessage: 'Email is not valid'
      });
    }
  }
  handleChangeEmail(email) {
    // console.log(email);
    this.setState({
      ...this.state,
      email
    });
  }
  handleSubmitForgotAction(e) {
    e.preventDefault();
    if (isEmail(this.state.email)) {
      const { email } = this.state;
      // console.log(email, password, this.state);
      this.props.fetchForgotIfNeeded(email);
    } else {
      this.setState({
        ...this.state,
        isValidEmail: false,
        errorMessage: 'Email is not valid'
      });
    }
  }
  render() {
    // console.log(this.state);
    // console.log(this.props.forgotReducer);
    const { email, isValidEmail, errorMessage } = this.state;
    return (
      <div>
        <Helmet title="Forgot" />
        <div className="window windowResetPassword">
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
              <div className="form-header form-header-login">
                Reset Password
              </div>
              {!isValidEmail && (
                <div className="error-message">
                  <span className="error-message-text">{errorMessage}</span>
                </div>
              )}
              <form onSubmit={e => this.handleSubmitForgotAction(e)}>
                <InputEmail
                  handleChangeEmail={value => this.handleChangeEmail(value)}
                  value={email}
                  id="email"
                  placeholder="Email"
                />
                <LoadButton
                  type="submit"
                  buttonText="Submit"
                  isFetching={this.props.forgotReducer.isFetching}
                  baseClassButton="input-btn login-btn"
                />
              </form>
              <NavLink
                activeClassName="active"
                className="forg-pass"
                to={routerLinks.login}
              >
                Go to login
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
  ({ forgotReducer }) => ({
    forgotReducer
  }),
  dispatch => ({
    fetchForgotIfNeeded: (email: string, password: string) =>
      dispatch(actionForgot.fetchForgotIfNeeded(email, password))
  })
);

export default connector(Forgot);
