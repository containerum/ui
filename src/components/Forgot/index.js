import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import InputEmail from '../auth/InputEmail/InputEmail';
import { ConfirmEmail } from '../../actions/EmailConfirmActions';

class Forgot extends Component {
    handleClick(event) {
        event.preventDefault();
        const {
            isValidEmail,
            emailUser
        } = this.props.validate;
        let { dispatch } = this.props;

        const creds = { email: emailUser.trim() };
        if(isValidEmail) {
            dispatch(ConfirmEmail(creds));
        } else {
            let getAlert = document.getElementById('loginAlert');
            getAlert.style.visibility = 'visible';
            setTimeout(function() { getAlert.style.visibility = 'hidden'; }, 5000);
        }
    }
    render() {
        const errMsg = this.props.errorMessage;
        return (
            <div>
                <div id='loginAlert'><center><p>Email or Password is not valid</p></center></div>
                <form className='row rowform' onSubmit={(event) => this.handleClick(event)}>
                    <img src='http://placehold.it/70x70' className='img-circle' alt='Responsive image'/>
                    <h1>Containerum</h1>
                    <div className='formcontainer'>
                        <h2 className='resh2'>Reset Password</h2>
                        <div className='form-group'>
                            <InputEmail />
                        </div>
                        <button ref='button' type='submit' className='btn btn-default btn-long'>Reset</button>
                        <h5><Link to='/Login'>Go to Login</Link></h5>
                        {
                            <p>{ errMsg }</p>
                        }
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        validate: state.validate,
        confirmEmailReducer: state.confirmEmailReducer
    }
}

export default connect(mapStateToProps)(Forgot)