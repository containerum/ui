import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputPassword extends Component {
    ValidationGetValuePass() {
        const hasErrorGroupCurrentPassword = document.getElementById('group-current_password');
        const hasErrorGroupNewPassword = document.getElementById('group-new_password');
        const hasErrorGroupRepeatPassword = document.getElementById('group-repeat_password');
        hasErrorGroupCurrentPassword.classList.remove('has-error');
        hasErrorGroupNewPassword.classList.remove('has-error');
        hasErrorGroupRepeatPassword.classList.remove('has-error');
        const refValue = this.props.refValue ? this.props.refValue : 'password';
        const password = this.refs[refValue].value;

        // console.log(password);
        if (password.length !== 0) {
            document.getElementById('label-' + refValue).classList.add('form-group__label-always-onfocus');
        } else {
            document.getElementById('label-' + refValue).classList.remove('form-group__label-always-onfocus');
        }

        if (password.length >= 8 && password.length <= 64) {
            this.props.handlePassword(password, true);
        } else {
            this.props.handlePassword(password, false);
        }
    }
    render() {
        const refValue = this.props.refValue ? this.props.refValue : 'password';
        const placeholder = this.props.placeholder ? this.props.placeholder : 'Password';
        const small = this.props.small ? this.props.small : '';
        return (
            <div className="form-group" id={`group-${refValue}`}>
                <input
                    className="form-group__input-text form-control"
                    onChange={(event) => this.ValidationGetValuePass(event)}
                    type="password"
                    ref={refValue}
                    required="required"
                    id={refValue}
                    // placeholder={placeholder}
                    disabled={this.props.isDisabled}
                />
                <label
                    className="form-group__label"
                    id={`label-${refValue}`}
                    htmlFor={refValue}
                >{placeholder}</label>
                <div className="form-group__helper">{small}</div>
            </div>
        );
    }
}

InputPassword.propTypes = {
    handlePassword: PropTypes.func,
    refValue: PropTypes.string,
    placeholder: PropTypes.string,
    isDisabled: PropTypes.bool,
    small: PropTypes.string
};

export default InputPassword;
