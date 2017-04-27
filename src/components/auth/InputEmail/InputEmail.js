import React, { Component } from 'react';
import validator from 'validator';
import { connect } from 'react-redux';

import { validateEmail, notValidateEmail } from '../../../actions/ValidateEmailActions';

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
    onFocusHandler() {
        let getAlert = document.getElementById('loginAlert');
        getAlert.style.display = 'none';
    }
    render() {
        return (
            <div>
                <label className='sr-only' htmlFor='inlineFormInputGroup'>Email</label>
                <div className='input-group mb-2'>
                    <div className='input-group-addon c-input-group-addon'>@</div>
                    <input
                        onChange={(event) => this.ValidationGetValueMail(event)}
                        onFocus={(event) => this.onFocusHandler(event)}
                        ref='inputEmail'
                        required='required'
                        autoFocus
                        type='email'
                        className='form-control c-form-control'
                        id='inlineFormInputGroup'
                        placeholder='Email'
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        validate: state.validate
    }
}

export default connect(mapStateToProps)(InputEmail)
