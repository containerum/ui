/* @flow */

import React, { PureComponent } from 'react';
import type { Connector } from 'react-redux';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import { NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';

import { routerLinks, sourceType } from '../../config';
import globalStyles from '../../theme/global.scss';
import styles from './index.scss';
import logoContainerum from '../../images/logo_containerum_exon_lv.svg';

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
        <div className={`${globalStyles.window} ${styles.windowConfirmEmail}`}>
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
                <b>Confirm Email:</b> <br />
                {signUpReducer.email}
              </div>
              <div
                className={globalStyles.formHeader}
                style={{
                  textAlign: 'center',
                  fontSize: '18px',
                  textTransform: 'initial',
                  color: '#777'
                }}
              >
                Confirm your email by clicking the verification link we`ve just
                sent to your inbox.
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

const connector: Connector<{}, Props> = connect(({ signUpReducer }) => ({
  signUpReducer
}));

export default connector(ConfirmEmail);
