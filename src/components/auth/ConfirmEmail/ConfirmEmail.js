import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Logo from '../../Logo';

class ConfirmEmail extends Component {
    render() {
        return (
            <div className='container'>
                <Logo />
                <form className='form-signin'>
                    <div className='card c-card'>
                        <div className='card-block p-5'>
                            <div className='card-label'>
                                Confirm Email { this.props.signUpReducer.emailUser }
                            </div>
                        </div>
                        <div className='card-footer p-3 text-center'>Confirm your email by clicking the verification
                            link we just send to your inbox.</div>
                    </div>
                    <p className='text-center pt-3'><Link to='/Login' className='c-link-wt'>Go to Login</Link></p>
                </form>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        signUpReducer: state.signUpReducer
    }
}

export default connect(mapStateToProps)(ConfirmEmail)
