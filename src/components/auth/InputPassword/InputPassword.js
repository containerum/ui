import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputPassword extends Component {
    ValidationGetValuePass() {
        const refValue = this.props.refValue ? this.props.refValue : 'password';
        const password = this.refs[refValue].value;
        if (password.length >= 7 && password.length <= 64) {
            this.props.handlePassword(password, true);
        } else {
            this.props.handlePassword(password, false);
        }
    }
    render() {
        const refValue = this.props.refValue ? this.props.refValue : 'password';
        const placeholder = this.props.placeholder ? this.props.placeholder : 'Password';
        const small = this.props.small ?<small>Password must be 8 or more characters</small> : '';
        return (
            <div>
                <label className='sr-only' htmlFor='Password'>Password</label>
                <div className='form-group i-mb-20 c-has-feedback-left'>
                    <input
                        onChange={(event) => this.ValidationGetValuePass(event)}
                        type='password'
                        ref={refValue}
                        required='required'
                        className='form-control'
                        id='Password'
                        placeholder={placeholder}
                    />
                    <i className='c-form-control-icon fa fa-lock'></i>
                    {small}
                </div>
            </div>
        );
    }
}

InputPassword.propTypes = {
    handlePassword: PropTypes.func,
    refValue: PropTypes.string,
    placeholder: PropTypes.string,
    small: PropTypes.string
};

export default InputPassword;
