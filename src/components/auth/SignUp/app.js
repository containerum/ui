import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignUp from './Signup';
import PropTypes from 'prop-types';

class AppSignUp extends Component {
    render() {
        const { dispatch, errorMessage } = this.props;
        return (
            <div>
                <SignUp
                    errorMessage={errorMessage}
                    dispatch={dispatch}
                />
            </div>
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
    const { auth } = state;
    const { errorMessage } = auth;

    return {
        errorMessage
    }
}

export default connect(mapStateToProps)(AppSignUp)
