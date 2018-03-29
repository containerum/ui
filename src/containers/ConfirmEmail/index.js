/* @flow */

import React, { PureComponent } from 'react';
import type { Connector } from 'react-redux';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import { NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';

import { routerLinks } from '../../config';

type Props = {
  signUpReducer: Object,
  history: Object
};

class ConfirmEmail extends PureComponent<Props> {
  render() {
    const { signUpReducer, history } = this.props;
    if (signUpReducer.readyStatus !== 'SIGNUP_SUCCESS') {
      history.push(routerLinks.signUp);
    }
    return (
      <div>
        <Helmet title="Confirm Email" />
        <div className="window windowConfirmEmail">
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

            <div className="main-form" style={{ marginTop: '200px' }}>
              <div
                className="form-header"
                style={{
                  fontSize: '20px',
                  textTransform: 'initial'
                }}
              >
                <b>Confirm Email:</b> <br />
                {signUpReducer.email}
              </div>
              <div
                className="form-header"
                style={{
                  textAlign: 'center',
                  fontSize: '18px',
                  textTransform: 'initial'
                }}
              >
                Confirm your email by clicking the verification link we`ve just
                sent to your inbox.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(({ signUpReducer }) => ({
  signUpReducer
}));

export default connector(ConfirmEmail);
