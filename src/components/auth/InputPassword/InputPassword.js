import React, { Component } from 'react';
import { connect } from 'react-redux';

import { validatePassword, notValidatePassword } from '../../../actions/ValidateEmailActions';

class InputPassword extends Component {
    ValidationGetValuePass() {
        const { dispatch } = this.props;

        const password = this.refs.password.value;
        if (password.length >= 7 && password.length <= 64) {
            dispatch(validatePassword(password));
        } else {
            dispatch(notValidatePassword());
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

function mapStateToProps (state) {
    return {
        validate: state.validate
    }
}

export default connect(mapStateToProps)(InputPassword)
