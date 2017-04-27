import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignUp from './Signup';
import PropTypes from 'prop-types';

class AppSignUp extends Component {
    render() {
        const { dispatch, errorMessage } = this.props;
        return (
            <SignUp
                errorMessage={errorMessage}
                dispatch={dispatch}
            />
        )
    }
}

AppSignUp.propTypes = {
    dispatch: PropTypes.func.isRequired,
    quote: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    errorMessage: PropTypes.string,
    isSecretQuote: PropTypes.bool
};

function mapStateToProps(state) {
    const { signUpReducer } = state;
    const { errorMessage } = signUpReducer;

    return {
        errorMessage
    }
}

export default connect(mapStateToProps)(AppSignUp)
