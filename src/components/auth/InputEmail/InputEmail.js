import React, { Component } from 'react';
import validator from 'validator';
import { connect } from 'react-redux';

import { validateEmail, notValidateEmail } from '../../../actions';

class InputEmail extends Component {
    ValidationGetValueMail() {
        const { dispatch } = this.props;

        const inputEmail = this.refs.inputEmail.value;
        const isValidEmailState = validator.isEmail(inputEmail);
        if (isValidEmailState) {
            dispatch(validateEmail(inputEmail));
        } else {
            dispatch(notValidateEmail());
        }
    }
    render() {
        return (
            <input
                onChange={(event) => this.ValidationGetValueMail(event)}
                type='email'
                ref='inputEmail'
                className='form-control'
                placeholder='Email'
                required='required'
                autoFocus
            />
        );
    }
}

function mapStateToProps (state) {
    return {
        validate: state.validate
    }
}

export default connect(mapStateToProps)(InputEmail)
