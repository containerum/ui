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
                <label className='sr-only' htmlFor='inlineFormInputGroup'>Password</label>
                <div className='input-group mb-2'>
                    <div className='input-group-addon c-input-group-addon'>@</div>
                    <input
                        onChange={(event) => this.ValidationGetValuePass(event)}
                        type='password'
                        ref='password'
                        required='required'
                        className='form-control c-form-control'
                        id='inlineFormInputGroup'
                        placeholder='Password'
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

export default connect(mapStateToProps)(InputPassword)
