import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

class EnsureLoggedInContainer extends Component {
	componentWillMount() {
		if (this.props.isAuthenticated === false) {
			if (typeof window !== 'undefined') {
				browserHistory.push('/Login');
			}
		}
	}
	componentWillUpdate(nextProps) {
		if (nextProps.isAuthenticated === false) {
			if (typeof window !== 'undefined') {
				browserHistory.push('/Login');
			}
		}
	}

  render() {
	  if (this.props.isAuthenticated) {
		  return this.props.children
	  } else {
		  return null
	  }
  }
}

EnsureLoggedInContainer.propTypes = {
	isAuthenticated: PropTypes.bool
};

function mapStateToProps(state) {
	const { LoginReducer } = state;
	const { isAuthenticated } = LoginReducer;

	return {
		isAuthenticated
	};
}

export default connect(mapStateToProps)(EnsureLoggedInContainer)
