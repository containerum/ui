import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }
    componentWillMount() {
      if(this.props.isAuthenticated == false) {
        this.context.router.push('/Login');
      }
    }

    componentWillUpdate(nextProps) {
      if(nextProps.this.props.isAuthenticated == false) {
        this.context.router.push('/Login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {

    const { auth } = state
    const { isAuthenticated } = auth

    return {
      isAuthenticated
    }
  }

  connect(mapStateToProps)(Authentication)
}
