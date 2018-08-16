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
import globalStyles from '../../theme/global.scss';
import buttonStyles from '../../theme/buttons.scss';
import styles from './index.scss';
import logoContainerum from '../../images/logo_containerum_lv.svg';

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
    cookie.remove('accessToken', { path: '/' });
    cookie.remove('refreshToken', { path: '/' });
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
    this.setState({
      ...this.state,
      email
    });
  }
  handleSubmitForgotAction(e) {
    e.preventDefault();
    if (isEmail(this.state.email)) {
      const { email } = this.state;
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
    const { email, isValidEmail, errorMessage } = this.state;
    return (
      <div>
        <Helmet title="Forgot" />
        <div className={`${globalStyles.window} ${styles.windowResetPassword}`}>
          <div className={globalStyles.windowForm}>
            <div className={globalStyles.mainForm}>
              <div
                className={`${globalStyles.formHeader} ${
                  globalStyles.formHeaderLogin
                }`}
              >
                Reset Password
              </div>
              {!isValidEmail && (
                <div className={globalStyles.errorMessage}>
                  <span className={globalStyles.errorMessageText}>
                    {errorMessage}
                  </span>
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
                  typeMiniSpinner="transparency"
                  isFetching={this.props.forgotReducer.isFetching}
                  baseClassButton={`${buttonStyles.buttonUI} ${
                    buttonStyles.buttonUIPrimary
                  } ${globalStyles.authBtnMargin}`}
                />
              </form>
              <div
                className={globalStyles.windowLinksBlock}
                style={{ height: 50 }}
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
              <div>
                {false && (
                  <div>
                    <span className={globalStyles.orDivider}>or</span>
                    <div className={globalStyles.socialTitle}>
                      Sign up with your favourite social profile
                    </div>
                    <div className={globalStyles.socialWrapper}>
                      <a href="https://github.com/">
                        <img
                          src={require('../../images/github.svg')}
                          alt="github"
                        />
                      </a>
                      <a
                        href="https://google.com/"
                        className={globalStyles.socialCenterIcon}
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
