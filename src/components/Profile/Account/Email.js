import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InputEmail from '../../auth/InputEmail';
import './Account.css';
import { updateEmail } from '../../../actions/EmailUpdateActions';

class Email extends Component {
    constructor() {
        super();
        this.state = {
            errorMsg: '',
            successMsg: '',
            newEmail: '',
            isValidNewEmail: false,
            confirmEmail: '',
            isValidConfirmEmail: false
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.EmailUpdateReducer.errorMessage) {
            this.setState({
                ...this.state,
                errorMsg: nextProps.EmailUpdateReducer.errorMessage
            });
            let emailUpdateAlert = document.getElementById('emailUpdateAlert');
            emailUpdateAlert.style.display = 'block';
        }
        if (nextProps.EmailUpdateReducer.data) {
            this.setState({
                ...this.state,
                successMsg: nextProps.EmailUpdateReducer.data
            });
            let successfulEmailUpdate = document.getElementById('successfulEmailUpdate');
            successfulEmailUpdate.style.display = 'block';
        }
    }
    handleOnSubmitUpdateEmail(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        if (
            this.state.isValidNewEmail && this.state.isValidConfirmEmail &&
            this.state.newEmail === this.state.confirmEmail
        ) {
            const updateObj = {
                new_email: this.state.confirmEmail
            };
            dispatch(updateEmail(updateObj));
        } else {
            this.setState({
                ...this.state,
                errorMsg: 'Email is not valid'
            });
            let emailUpdateAlert = document.getElementById('emailUpdateAlert');
            emailUpdateAlert.style.display = 'block';
        }
    }
    checkValidateNewEmailInput(email, isValidEmail) {
        this.setState({
            ...this.state,
            newEmail: email,
            isValidNewEmail: isValidEmail
        });
    }
    checkValidateConfirmEmailInput(email, isValidEmail) {
        this.setState({
            ...this.state,
            confirmEmail: email,
            isValidConfirmEmail: isValidEmail
        });
    }
    render() {
        return (
            <div className="card-block c-table-card-block">
                <table className="table i-table-card">
                    <tbody>
                    <tr>
                        <td className="first-td-width">
                            <h2 id="email">
                                <a name="email" className="anchor" href="#email">Email</a>
                            </h2> <br/>
                            <p>Email changing</p>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td style={{width: '400px'}}>
                            <form onSubmit={this.handleOnSubmitUpdateEmail.bind(this)}>
                                <div id='emailUpdateAlert' className='alert alert-danger mb-4 c-alert-danger'>
                                    { this.state.errorMsg }
                                </div>
                                <div id='successfulEmailUpdate' className='alert alert-success mb-4 c-alert-success'>
                                    { this.state.successMsg }
                                </div>
                                <div className="form-group i-mb-20 c-has-feedback-left">
                                    <InputEmail
                                        placeholder="New email"
                                        refValue="new_email"
                                        handleEmail={
                                            (email, isValidEmail) =>
                                                this.checkValidateNewEmailInput(email, isValidEmail)
                                        }
                                    />
                                </div>
                                <div className="form-group i-mb-20 c-has-feedback-left">
                                    <InputEmail
                                        placeholder="Confirm email"
                                        refValue="confirm_email"
                                        handleEmail={
                                            (email, isValidEmail) =>
                                                this.checkValidateConfirmEmailInput(email, isValidEmail)
                                        }
                                    />
                                </div>
                                <button type="submit" className="btn btn-block c-btn-green">Update Email</button>
                            </form>
                        </td>
                        <td>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

Email.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps (state) {
    return {
        EmailUpdateReducer: state.EmailUpdateReducer
    }
}

export default connect(mapStateToProps)(Email)
