import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import PropTypes from 'prop-types';

class App extends Component {
    render() {
        const { dispatch, errorMessage } = this.props;
        return (
            <div>
                <Login
                    errorMessage={errorMessage}
                    dispatch={dispatch}
                />
            </div>
        )
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    quote: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    errorMessage: PropTypes.string,
    isSecretQuote: PropTypes.bool
};

function mapStateToProps(state) {
    const { loginReducer } = state;
    const { errorMessage } = loginReducer;

    return {
        errorMessage
    }
}

export default connect(mapStateToProps)(App)
