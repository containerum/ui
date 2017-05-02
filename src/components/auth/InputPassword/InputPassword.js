import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputPassword extends Component {
    ValidationGetValuePass() {
        const password = this.refs.password.value;
        if (password.length >= 7 && password.length <= 64) {
            this.props.handlePassword(password, true);
        } else {
            this.props.handlePassword(password, false);
        }
    }
    render() {
        return (
            <div>
                <label className='sr-only' htmlFor='Password'>Password</label>
                <div className='form-group mb-4 c-has-feedback-left'>
                    <input
                        onChange={(event) => this.ValidationGetValuePass(event)}
                        type='password'
                        ref='password'
                        required='required'
                        className='form-control'
                        id='Password'
                        placeholder='Password'
                    />
                    <i className='c-form-control-icon fa fa-lock'></i>
                </div>
            </div>
        );
    }
}

InputPassword.propTypes = {
    handlePassword: PropTypes.func.isRequired
};

export default InputPassword;
