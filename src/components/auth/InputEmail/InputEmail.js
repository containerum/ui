import React, { Component } from 'react';
import validator from 'validator';
import PropTypes from 'prop-types';

class InputEmail extends Component {
    ValidationGetValueMail() {
        const inputEmail = this.refs.inputEmail.value;
        const isValidEmailState = validator.isEmail(inputEmail);
        if (isValidEmailState) {
            this.props.handleEmail(inputEmail, true);
        } else {
            this.props.handleEmail(inputEmail, false);
        }
    }
    render() {
        return (
            <div>
                <label className='sr-only' htmlFor='Username'>Email</label>
                <div className='form-group i-mb-20 c-has-feedback-left'>
                    <input
                        onChange={(event) => this.ValidationGetValueMail(event)}
                        ref='inputEmail'
                        required='required'
                        autoFocus
                        type='email'
                        className='form-control'
                        id='Username'
                        placeholder='Email'
                    />
                    <i className='c-form-control-icon fa fa-user'></i>
                </div>
            </div>
        );
    }
}

InputEmail.propTypes = {
    handleEmail: PropTypes.func.isRequired
};

export default InputEmail;
