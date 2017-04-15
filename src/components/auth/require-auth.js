import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

export default function requireAuthentication(Component) {

  class AuthenticatedComponent extends Component {
    componentWillMount() {
      if (this.props.isAuthenticated === false) {
        browserHistory.push('/Login')
      }
    }
    componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated === false) {
        browserHistory.push('/Login')
      }
    }
    render() {
      return (
        <div>
          {this.props.isAuthenticated === true
            ? <Component {...this.props} />
            : null
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
