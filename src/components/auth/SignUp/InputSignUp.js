import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Toggle from 'react-bootstrap-toggle';
import { connect } from 'react-redux';

import InputEmail from '../InputEmail/InputEmail';

class InputSignUp extends Component {
    constructor() {
        super();
        this.state = { toggleActive: false };
        this.onToggle = this.onToggle.bind(this);
    }
    onToggle() {
        this.setState({ toggleActive: !this.state.toggleActive });
    }
    render() {
        const { errorMessage } = this.props;
        let toggleCompanyComponent = '';

        if(this.state.toggleActive === true) {
            toggleCompanyComponent = (
                <div>
                    <div className='form-group'>
                        <input
                            type='text'
                            ref='company_name'
                            className='form-control'
                            placeholder='Company name'
                            required='required'
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            ref='tax_code'
                            className='form-control'
                            placeholder='Tax Code'
                            required='required'
                        />
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div id='loginAlert'><center><p>Email or Password is not valid</p></center></div>
                <form className='row rowform' onSubmit={(event) => this.handleClick(event)}>
                    <img src='http://placehold.it/70x70' className='img-circle' alt='Responsive image'/>
                    <h1>Containerum</h1>
                    <div className='formcontainer'>
                        <h2>Sign Up</h2>
                        <div className='form-group'>
                            <div className='form-control'>
                                <div className='col-sm-4'>Individual</div>
                                <div className='col-sm-4'>
                                    <Toggle
                                        onClick={this.onToggle}
                                        active={this.state.toggleActive}
                                    />
                                </div>
                                <div className='col-sm-4'>Company</div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <InputEmail />
                        </div>
                        <div className='form-group'>
                            <input
                                onKeyDown={(event) => this.ValidationGetValuePass(event)}
                                type='password'
                                ref='password'
                                className='form-control'
                                placeholder='Password'
                                required='required'
                            />
                        </div>
                        {toggleCompanyComponent}
                        <button ref='button' className='btn btn-default btn-login_sign'>SignUp</button>
                        <div className='conh5'>
                            <h5>By signing up, you agree to the</h5>
                            <h5><a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a></h5>
                        </div>
                        {errorMessage &&
                        <p>{errorMessage}</p>
                        }
                    </div>
                    <h5>Dont have an account?<Link to='/Login'>Log In</Link></h5>
                </form>
            </div>
        )
    }

    ValidationGetValuePass() {
        const password = this.refs.password;
        const pass = password.value.length;
        const button = this.refs.button;
        if (pass >= 7) {
            button.removeAttribute('disabled', 'disabled');
        }
        if (pass >= 64) {
            button.setAttribute('disabled', 'disabled');
        }
    }

    handleClick(event) {
        event.preventDefault();
        const { isValidEmail, emailUser } = this.props.validate;

        const password = this.refs.password.value;
        const creds = { username: emailUser.trim(), password: password.trim() };
        if(isValidEmail && (password.length >= 7 && password.length <= 64)) {
            this.props.SignUpUser(creds)
        } else {
            let getAlert = document.getElementById('loginAlert');
            getAlert.style.visibility = 'visible';
            setTimeout(function() { getAlert.style.visibility = 'hidden'; }, 5000);
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
