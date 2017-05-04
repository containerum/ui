import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ConfirmEmail } from '../../actions/EmailConfirmActions';
import InputEmail from '../auth/InputEmail';

import Logo from '../Logo';

class Forgot extends Component {
    constructor() {
        super();
        this.state = {
            errorMsg: '',
            email: '',
            isValidEmail: false,
        };
        this.checkValidateEmailInput = this.checkValidateEmailInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        document.body.classList.add('c-body-bg');
    }
    handleClick(event) {
        event.preventDefault();
        const { dispatch } = this.props;

        if(this.state.isValidEmail) {
            const creds = { email: this.state.email.trim() };
            dispatch(ConfirmEmail(creds));
        } else {
            this.setState({
                ...this.state,
                errorMsg: 'Email or Password is not valid'
            });
            let getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
            setTimeout(() => {getAlert.style.display = 'none'}, 5000);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errorMessage) {
            this.setState({
                ...this.state,
                errorMsg: nextProps.errorMessage
            });
            let getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
            setTimeout(() => {getAlert.style.display = 'none'}, 5000);
        }
    }
    checkValidateEmailInput(email, isValidEmail) {
        this.setState({
            ...this.state,
            email: email,
            isValidEmail: isValidEmail
        });
    }
    render() {
        return (
            <div className='container'>
                <Logo />
                <form className='form-signin' onSubmit={(event) => this.handleClick(event)}>
                    <div className='card c-card'>
                        <div className='card-block p-5'>
                            <div id='loginAlert' className='alert alert-danger mb-4 c-alert-danger'>
                                { this.state.errorMsg }
                            </div>
                            <div className='card-label'>Reset Password</div>
                            <InputEmail
                                handleEmail={
                                    (email, isValidEmail) =>
                                        this.checkValidateEmailInput(email, isValidEmail)
                                }
                            />
                            <button ref='button' type='submit' className='btn btn-block c-btn-green'>Reset</button>
                        </div>
                        <div className='card-footer text-center'>Don't have an account? <Link to='/SignUp'>Sing up</Link></div>
                    </div>
                    <p className='text-center pt-3'><Link to='/Login' className='c-link-wt'>Go to Login</Link></p>
                </form>
            </div>
        );
    }
}

Forgot.propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

function mapStateToProps (state) {
    const { confirmEmailReducer } = state;
    const { errorMessage } = confirmEmailReducer;

    return {
        errorMessage,
        confirmEmailReducer
    }
}

export default connect(mapStateToProps)(Forgot)