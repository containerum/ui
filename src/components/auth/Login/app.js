import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Login from './Login'

class App extends Component {
  render() {
    const { dispatch, errorMessage } = this.props
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
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  isSecretQuote: PropTypes.bool.isRequired
}

function mapStateToProps(state) {

  const { auth } = state
  const { errorMessage } = auth

  return {
    errorMessage
  }
}

export default connect(mapStateToProps)(App)
