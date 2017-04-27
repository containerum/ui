import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InputEmail from '../InputEmail/InputEmail';
import InputPassword from '../InputPassword/InputPassword';

class InputSignUp extends Component {
    constructor() {
        super();
        this.state = {
            toggleActive: false,
            idOfActiveToggle: 'option1'
        };
        this.onToggle = this.onToggle.bind(this);
    }
    onToggle(e) {
        const targetId = e.target.id;
        if (this.state.idOfActiveToggle !== targetId) {
            this.setState({
                toggleActive: !this.state.toggleActive,
                idOfActiveToggle: targetId
            });
        }
    }
    componentDidMount() {
        const element = document.getElementById('body');
        element.classList.add('c-body-bg');
    }
    render() {
        const { errorMessage } = this.props;
        let toggleCompanyComponent = '';
        let currentMessage = 'Email or Password is not valid';

        if (errorMessage)
            currentMessage = errorMessage;

        if(this.state.toggleActive === true) {
            toggleCompanyComponent = (
                <div>

                    <label className='sr-only' htmlFor='inlineFormInputCompanyName'>Company name</label>
                    <div className='form-group mb-4 c-has-feedback-left'>
                        <input
                            ref='company_name'
                            required='required'
                            autoFocus
                            type='text'
                            className='form-control'
                            id='inlineFormInputCompanyName'
                            placeholder='Company name'
                        />
                        <i className='c-form-control-icon fa fa-address-book fa-1'></i>
                    </div>

                    <label className='sr-only' htmlFor='inlineFormInputTaxCode'>Tax Code</label>
                    <div className='form-group mb-4 c-has-feedback-left'>
                        <input
                            ref='tax_code'
                            required='required'
                            autoFocus
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

        return (
            <div className='container'>
                <div className='text-center p-4'>
                    <img className='c-logo-login' src='src/images/Containerum_logo_new.png' alt='Responsive image'/>
                </div>
                <form className='form-signin' onSubmit={(event) => this.handleClick(event)}>
                    <div className='card c-card'>
                        <div className='card-block p-5'>
                            <div className='card-label'>
                                Sing up
                            </div>
                            <div id='loginAlert' className='alert alert-danger mb-4 c-alert-danger'>{ currentMessage }</div>
                            <div className='text-center'>
                                <div className='btn-group mb-3'>
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
                                        className={this.state.idOfActiveToggle === 'option2'
                                            ? 'btn btn-success active' : 'btn btn-success'}>
                                        <input
                                            onChange={this.onToggle}
                                            type='radio'
                                            name='options'
                                            id='option2'
                                            checked={this.state.toggleActive}
                                        />Company
                                    </label>
                                </div>
                            </div>
                            <InputEmail />
                            <InputPassword />
                            {toggleCompanyComponent}
                            <button type='submit' ref='button' className='btn btn-block c-btn-green'>Sign Up</button>
                        </div>
                        <div className='card-footer p-3 text-center'>
                            By signing up, you agree to the <br />
                            <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>
                        </div>
                    </div>
                    <p className='text-center pt-2 c-wt'>
                        Dont have an account? <Link to='/Login' className='c-link-wt'>Log In</Link>
                    </p>
                </form>
            </div>
        )
    }

    handleClick(event) {
        event.preventDefault();
        const {
            isValidEmail,
            emailUser,
            isValidPassword,
            passUser
        } = this.props.validate;

        const creds = { username: emailUser.trim(), password: passUser.trim() };
        if(isValidEmail && isValidPassword) {
            this.props.SignUpUser(creds);
        } else {
            let getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
            setTimeout(function() { getAlert.style.display = 'none'; }, 5000);
        }
    }
}

InputSignUp.propTypes = {
    SignUpUser: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

function mapStateToProps (state) {
    return {
        validate: state.validate
    }
}

export default connect(mapStateToProps)(InputSignUp)
