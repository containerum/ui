/* @flow */

import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import type { Connector } from 'react-redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import cookie from 'react-cookies';
import globalStyles from '../../theme/global.scss';
import styles from './index.scss';
import logoContainerum from '../../images/logo_containerum_lv.svg';

import { routerLinks } from '../../config';

type Props = {
  forgotReducer: Object,
  history: Object
};

class CheckEmail extends PureComponent<Props> {
  componentDidMount() {
    cookie.remove('accessToken', { path: '/' });
    cookie.remove('refreshToken', { path: '/' });
    if (this.props.forgotReducer.readyStatus !== 'FORGOT_SUCCESS') {
      this.props.history.push('/login');
    }
  }
  render() {
    const { email } = this.props.forgotReducer;
    return (
      <div>
        <Helmet title="Check Email" />
        <div
          className={`${globalStyles.window} ${styles.windowResetPasswordTwo}`}
        >
          <div className={globalStyles.windowForm}>
            <div
              className={globalStyles.mainForm}
              style={{ marginTop: '200px' }}
            >
              <div
                className={globalStyles.formHeader}
                style={{
                  fontSize: '20px',
                  textTransform: 'initial'
                }}
              >
                Check your inbox {''}
                <strong>{email}</strong> and follow the password reset link.
              </div>
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '15px',
                  fontWeight: 400,
                  textTransform: 'initial',
                  color: '#777',
                  marginTop: 40
                }}
              >
                If you don`t receive an email, and it`s not in your spam folder
                this could mean you signed up with a different address.
              </div>
              <div
                className={globalStyles.windowLinksBlock}
                style={{ height: 50, marginTop: 50 }}
              >
                <div className={globalStyles.windowLinksBlockText}>
                  Go to{' '}
                  <NavLink activeClassName="active" to={routerLinks.login}>
                    Log In
                  </NavLink>{' '}
                  or{' '}
                  <NavLink activeClassName="active" to={routerLinks.signUp}>
                    Sign Up
                  </NavLink>
                </div>
              </div>
            </div>
            <img
              src={logoContainerum}
              alt="logo containerum"
              style={{
                bottom: 30,
                position: 'absolute',
                right: 170
              }}
            />
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
