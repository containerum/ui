import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Logo from '../Logo';

class ResetPassword extends Component {
    componentWillMount() {
        document.body.classList.add('c-body-bg');
    }
    render() {
        if (!this.props.confirmEmailReducer.emailUser) {
            browserHistory.push('/Login');
        }
        return (
            <div className="main_container">
                <Logo />
                <form className="form-signin">
                    <div className="card c-card">
                        <div className="card-block p-3">
                            <div className="card-label c-card-label">
                                Reset Password
                            </div>
                        </div>
                        <p className="card-block p-3 text-center">
                            Check your inbox. If you don`t receive an email, <br />
                            and it`s not in your spam folder this could mean <br />
                            you signed up with a different address.
                        </p>
                        <div className="card-footer p-3 text-center">
                            <Link to="/Login">Login</Link> or <Link to="/SignUp">Sign Up</Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

ResetPassword.propTypes = {
    confirmEmailReducer: PropTypes.object
};

function mapStateToProps(state) {
    return {
        confirmEmailReducer: state.confirmEmailReducer
    };
}

export default connect(mapStateToProps)(ResetPassword);
