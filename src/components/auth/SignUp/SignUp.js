import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { SignUpUser } from '../../../actions/SignUpActions';
import InputEmail from '../InputEmail';
import InputPassword from '../InputPassword';
import Logo from '../../Logo';
import MiniSpinner from '../../MiniSpinner';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            toggleActive: false,
            idOfActiveToggle: 'option1',
            errorMsg: '',
            email: '',
            isValidEmail: false,
            password: '',
            isValidPassword: false
        };
        this.onToggle = this.onToggle.bind(this);
        this.checkValidateEmailInput = this.checkValidateEmailInput.bind(this);
        this.checkValidatePasswordInput = this.checkValidatePasswordInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    onToggle(e) {
        const targetId = e.target.id;
        if (this.state.idOfActiveToggle !== targetId) {
            this.setState({
                ...this.state,
                toggleActive: !this.state.toggleActive,
                idOfActiveToggle: targetId
            });
        }
    }
    checkValidateEmailInput(email, isValidEmail) {
        this.setState({
            ...this.state,
            email: email,
            isValidEmail: isValidEmail
        });
    }
    checkValidatePasswordInput(password, isValidPassword) {
        this.setState({
            ...this.state,
            password: password,
            isValidPassword: isValidPassword
        });
    }
    componentWillMount() {
        document.body.classList.add('c-body-bg');
    }
    componentDidMount() {
        if (this.props.location.query.error) {
            this.setState({
                ...this.state,
                errorMsg: 'Email or Password is not valid'
            });
            let getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
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
        }
    }
    handleClick(event) {
        event.preventDefault();
        const { dispatch } = this.props;

        if (this.state.isValidEmail && this.state.isValidPassword) {
            const creds = { username: this.state.email.trim(), password: this.state.password.trim() };
            dispatch(SignUpUser(creds));
        } else {
            this.setState({
                ...this.state,
                errorMsg: 'Email or Password is not valid'
            });
            let getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        }
    }
    render() {
        let toggleCompanyComponent = '';
        if(this.state.toggleActive === true) {
            toggleCompanyComponent = (
                <div>

                    <label className='sr-only' htmlFor='inlineFormInputCompanyName'>Company name</label>
                    <div className='form-group i-mb-20 c-has-feedback-left'>
                        <input
                            ref='company_name'
                            required='required'
                            type='text'
                            className='form-control'
                            id='inlineFormInputCompanyName'
                            placeholder='Company name'
                        />
                        <i className='c-form-control-icon fa fa-address-book fa-1'></i>
                    </div>

                    <label className='sr-only' htmlFor='inlineFormInputTaxCode'>Tax Code</label>
                    <div className='form-group i-mb-20 c-has-feedback-left'>
                        <input
                            ref='tax_code'
                            required='required'
                            type='text'
                            className='form-control'
                            id='inlineFormInputTaxCode'
                            placeholder='Tax Code'
                        />
                        <i className='c-form-control-icon fa fa-tag fa-1'></i>
                    </div>
                </div>
            );
        }
        const defaultEmail = this.props.location.query.email ? this.props.location.query.email : '';
        const signUpButtonText = this.props.signUpReducer.isFetching ? <MiniSpinner /> : 'Sign Up';
        const isActiveSignUpButton = this.props.signUpReducer.isFetching ?
            'btn btn-block c-btn-green disabled' :
            'btn btn-block c-btn-green';

        return (
            <div className='container'>
                <Logo />
                <form className='form-signin' onSubmit={(event) => this.handleClick(event)}>
                    <div className='card c-card'>
                        <div className='card-block p-5'>
                            <div className='card-label'>
                                Sing up
                            </div>
                            <div id='loginAlert' className='alert alert-danger mb-4 c-alert-danger'>
                                { this.state.errorMsg }
                            </div>
                            <div className='text-center i-height-btn-group i-mb-20'>
                                <div className='btn-group'>
                                    <label
                                        className={this.state.idOfActiveToggle === 'option1'
                                            ? 'btn btn-success active' : 'btn btn-success'}>
                                        <input
                                            onChange={this.onToggle}
                                            type='radio'
                                            name='options'
                                            id='option1'
                                            checked={!this.state.toggleActive}
                                        />Individual
                                    </label>
                                    <label
                                        className="btn btn-success disabled"
                                        // className={this.state.idOfActiveToggle === 'option2'
                                        //     ? 'btn btn-success active' : 'btn btn-success'}
                                    >
                                        <input
                                            // onChange={this.onToggle}
                                            type='radio'
                                            name='options'
                                            id='option2'
                                            checked={this.state.toggleActive}
                                        />Company
                                    </label>
                                </div>
                            </div>
                            <InputEmail
                                handleEmail={
                                    (email, isValidEmail) =>
                                        this.checkValidateEmailInput(email, isValidEmail)
                                }
                                defaultUserEmail={defaultEmail}
                            />
                            <InputPassword
                                handlePassword={
                                    (password, isValidPassword) =>
                                        this.checkValidatePasswordInput(password, isValidPassword)
                                }
                            />
                            {toggleCompanyComponent}
                            <button type='submit' ref='button' className={isActiveSignUpButton}>{ signUpButtonText }</button>
                        </div>
                        <div className='card-footer p-3 text-center'>
                            By signing up, you agree to the <br />
                            <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>
                        </div>
                    </div>
                    <p className='text-center pt-3 c-wt'>
                        Don't have an account? <Link to='/Login' className='c-link-wt'>Log In</Link>
                    </p>
                </form>
            </div>
        )
    }
}

SignUp.propTypes = {
    dispatch: PropTypes.func.isRequired,
    quote: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    errorMessage: PropTypes.string,
    isSecretQuote: PropTypes.bool
};

function mapStateToProps(state) {
    const { signUpReducer } = state;
    const { errorMessage } = signUpReducer;

    return {
        errorMessage,
        signUpReducer
    }
}

export default connect(mapStateToProps)(SignUp)
