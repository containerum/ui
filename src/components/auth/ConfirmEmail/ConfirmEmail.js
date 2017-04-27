import { Link } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ConfirmEmail extends Component {
    render() {
        const emailUser = this.props.validate.emailUser;
        return (
            <div className='c-body-bg'>
                <div className='container'>
                    <div className='text-center p-4'>
                        <img src='https://www.prodpad.com/wp-content/uploads/trello-logo-white.png' className='c-logo-login' alt='Responsive image'/>
                    </div>
                    <form className='form-signin'>
                        <div className='card c-card'>
                            <div className='card-block p-5'>
                                {
                                    <h3>{ emailUser }</h3>
                                }
                            </div>
                            <div className='card-footer text-center'>Confirm your email by clicking the verification link we just send to your inbox.</div>
                        </div>
                        <p className='text-center pt-2'><Link to='/Login' className='c-link-wt'>Go to Login</Link></p>

                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        validate: state.validate
    }
}

export default connect(mapStateToProps)(ConfirmEmail)
