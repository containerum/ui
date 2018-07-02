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
import logoContainerum from '../../images/logo_containerum_exon_lv.svg';

import { routerLinks, sourceType } from '../../config';

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
            <div className={globalStyles.authBlock}>
              <NavLink
                activeClassName={globalStyles.authBlockActiveLink}
                to={routerLinks.signUp}
              >
                Sign Up
              </NavLink>
              <span className={globalStyles.authDivider}>or</span>
              <NavLink
                activeClassName={globalStyles.authBlockActiveLink}
                to={routerLinks.login}
              >
                Log In
              </NavLink>
            </div>
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
                <strong>{email}</strong> and follow the password reset link
                we`ve just sent you.
              </div>
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '15px',
                  fontWeight: 300,
                  textTransform: 'initial'
                }}
              >
                If you don`t receive an email, and it`s not in your spam folder
                this could mean you signed up with a different address.
              </div>
              {/* <NavLink */}
              {/* activeClassName={globalStyles.authBlockActiveLink} */}
              {/* className="forg-pass" */}
              {/* to={routerLinks.login} */}
              {/* > */}
              {/* Go to login */}
              {/* </NavLink> */}
            </div>
            {sourceType !== 'ONLINE' && (
              <img
                src={logoContainerum}
                alt="logo containerum"
                style={{
                  bottom: 30,
                  position: 'absolute',
                  right: 170
                }}
              />
            )}
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
