import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputPassword extends Component {
    ValidationGetValuePass() {
        const refValue = this.props.refValue ? this.props.refValue : 'password';
        const password = this.refs[refValue].value;
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
            <div className="form-group">
                <input
                    className="form-group__input-text form-control"
                    onChange={(event) => this.ValidationGetValuePass(event)}
                    type="password"
                    ref={refValue}
                    required="required"
                    id={refValue}
                    placeholder={placeholder}
                    disabled={this.props.isDisabled}
                />
                <label className="form-group__label" htmlFor={refValue}>{placeholder}</label>
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
