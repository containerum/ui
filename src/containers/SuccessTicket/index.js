/* @flow */

import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import type { Connector } from 'react-redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import cookie from 'react-cookies';

import { routerLinks } from '../../config';

type Props = {
  forgotReducer: Object,
  history: Object
};

class CheckEmail extends PureComponent<Props> {
  componentDidMount() {
    cookie.remove('token', { path: '/' });
    if (this.props.forgotReducer.readyStatus !== 'FORGOT_SUCCESS') {
      this.props.history.push('/login');
    }
  }
  render() {
    // console.log(this.state);
    // const { email } = this.state;
    const { email } = this.props.forgotReducer;
    return (
      <div>
        <Helmet title="Check Email" />
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
              <div className="form-header form-header-login">Check Email</div>
              <div>
                Check your inbox <strong>{email}</strong>. If you don`t receive
                an email, and it`s not in your spam folder this could mean you
                signed up with a different address.
              </div>
              <NavLink
                activeClassName="active"
                className="forg-pass"
                to={routerLinks.login}
              >
                Go to login
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(({ forgotReducer }) => ({
  forgotReducer
}));

export default connector(CheckEmail);
