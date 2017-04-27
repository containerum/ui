import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import InputEmail from '../auth/InputEmail/InputEmail';
import { ConfirmEmail } from '../../actions/EmailConfirmActions';

class Forgot extends Component {
    handleClick(event) {
        event.preventDefault();
        const {
            isValidEmail,
            emailUser
        } = this.props.validate;
        let { dispatch } = this.props;

        const creds = { email: emailUser.trim() };
        if(isValidEmail) {
            dispatch(ConfirmEmail(creds));
        } else {
            let getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
            setTimeout(function() { getAlert.style.display = 'none'; }, 5000);
        }
    }
    render() {
        const { errorMessage } = this.props;
        let currentMessage = 'Email is not valid';
        if (errorMessage)
            currentMessage = errorMessage;

        return (
            <div className='c-body-bg'>
                <div className='container'>
                    <div className='text-center p-4'>
                        <img src='https://www.prodpad.com/wp-content/uploads/trello-logo-white.png' className='c-logo-login' alt='Responsive image'/>
                    </div>
                    <form className='form-signin' onSubmit={(event) => this.handleClick(event)}>
                        <div className='card c-card'>
                            <div className='card-block p-5'>
                                <div id='loginAlert' className='alert alert-danger mb-2'>{ currentMessage }</div>
                                <h2 className='text-center'>Reset Password</h2>
                                <InputEmail />
                                <button ref='button' type='submit' className='btn btn-block c-btn-blue'>Reset</button>
                            </div>
                            <div className='card-footer text-center'>Don't have an account?<Link to='/Signup'>Sing up</Link></div>
                        </div>
                        <p className='text-center pt-2'><Link to='/Login' className='c-link-wt'>Go to Login</Link></p>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        validate: state.validate,
        confirmEmailReducer: state.confirmEmailReducer
    }
}

export default connect(mapStateToProps)(Forgot)