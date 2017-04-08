import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

export default function requireAuthentication(Component) {

  class AuthenticatedComponent extends Component {
    componentWillMount() {
      if (this.props.isAuthenticated === true) {
        browserHistory.push('/')
      }
    }
    componentWillUpdate(nextProps) {
      if (nextProps.this.props.isAuthenticated === true) {
        browserHistory.push('/')
      }
    }
    render() {
      return (
        <div>
          {this.props.isAuthenticated === true
            ? <Component {...this.props} />
            : browserHistory.push('/Login')
          }
        </div>
      )
    }
  }

  function mapStateToProps(state) {
    const { auth } = state
    const { isAuthenticated } = auth

    return {
      isAuthenticated
    }
  }

  return connect(mapStateToProps)(AuthenticatedComponent)
}
