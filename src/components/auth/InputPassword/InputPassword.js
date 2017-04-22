import React, { Component } from 'react';
import { connect } from 'react-redux';

import { validatePassword, notValidatePassword } from '../../../actions';

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
            <input
                onChange={(event) => this.ValidationGetValuePass(event)}
                type='password'
                ref='password'
                className='form-control'
                placeholder='Password'
                required='required'
            />
        );
    }
}

function mapStateToProps (state) {
    return {
        validate: state.validate
    }
}

export default connect(mapStateToProps)(InputPassword)
