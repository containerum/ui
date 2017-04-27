import React, { Component } from 'react';
import InputLogin from './InputLogin';
import { LOGINUser } from '../../../actions/LoginActions';
import PropTypes from 'prop-types';

export default class Login extends Component {
    render() {
        const { dispatch, errorMessage } = this.props;

        return (
            <div className='c-body-bg'>
                <InputLogin
                    errorMessage={errorMessage}
                    onLoginClick={ creds => dispatch(LOGINUser(creds)) }
                />
            </div>
        )
    }
}

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    errorMessage: PropTypes.string
};
