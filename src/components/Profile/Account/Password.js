import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InputPassword from '../../auth/InputPassword';
import { changePassword } from '../../../actions/ChangePasswordActions';
import './Account.css';

class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            errorMsg: '',
            successMsg: '',
            currentPassword: '',
            isValidCurrentPassword: false,
            newPassword: '',
            isValidNewPassword: false,
            repeatPassword: '',
            isValidRepeatPassword: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.ChangePasswordReducer.errorMessage) {
            this.setState({
                ...this.state,
                errorMsg: nextProps.ChangePasswordReducer.errorMessage
            });
            let getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        }
        if (nextProps.ChangePasswordReducer.data) {
            this.setState({
                ...this.state,
                successMsg: nextProps.ChangePasswordReducer.data
            });
            let getSuccessfulAlert = document.getElementById('successfulAlert');
            getSuccessfulAlert.style.display = 'block';
        }
    }
    openModal() {
        this.setState({modalIsOpen: true});
    }
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    submitUpdatedPasswordData(e) {
        e.preventDefault();

        const current_password = this.refs.current_password.refs.current_password.value;
        const new_password = this.refs.new_password.refs.new_password.value;
        const repeat_password = this.refs.repeat_password.refs.repeat_password.value;

        if (
            (current_password.length >= 8 && current_password.length <= 64) &&
            (new_password.length >= 8 && new_password.length <= 64) &&
            (repeat_password.length >= 8 && repeat_password.length <= 64) &&
            new_password === repeat_password
        ) {
            const { dispatch } = this.props;
            const updatePasswordData = {
                password: current_password,
                new_password: new_password
            };
            let getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'none';
            // console.log(updatePasswordData);
            dispatch(changePassword(updatePasswordData));
        } else {
            this.setState({
                ...this.state,
                errorMsg: 'Password is not valid'
            });
            let getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        }
    }
    checkCurrentPassword(password, isValidPassword) {
        this.setState({
            ...this.state,
            currentPassword: password,
            isValidCurrentPassword: isValidPassword
        });
    }
    checkNewPassword(password, isValidPassword) {
        this.setState({
            ...this.state,
            newPassword: password,
            isValidNewPassword: isValidPassword
        });
    }
    checkRepeatPassword(password, isValidPassword) {
        this.setState({
            ...this.state,
            repeatPassword: password,
            isValidRepeatPassword: isValidPassword
        });
    }
    render() {
        return (
            <div className="card-block c-table-card-block">
                <table className="table i-table-card">
                    <tbody>
                    <tr>
                        <td className="first-td-width">
                            <h2 id="password">
                                <a name="password" className="anchor" href="#password">Password</a>
                            </h2> <br/>
                            <p>Password changing</p>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td style={{width: '400px'}}>
                            <form onSubmit={this.submitUpdatedPasswordData.bind(this)}>
                                <div id='loginAlert' className='alert alert-danger mb-4 c-alert-danger'>
                                    { this.state.errorMsg }
                                </div>
                                <div id='successfulAlert' className='alert alert-success mb-4 c-alert-success'>
                                    { this.state.successMsg }
                                </div>
                                <div className="form-group i-mb-20 c-has-feedback-left">
                                    <InputPassword
                                        placeholder="Current password"
                                        refValue="current_password"
                                        ref="current_password"
                                        handlePassword={
                                            (password, isValidPassword) =>
                                                this.checkCurrentPassword(password, isValidPassword)
                                        }
                                    />
                                </div>
                                <div className="form-group i-mb-20 c-has-feedback-left">
                                    <InputPassword
                                        placeholder="New password"
                                        small="Password must be 8 or more characters"
                                        refValue="new_password"
                                        ref="new_password"
                                        handlePassword={
                                            (password, isValidPassword) =>
                                                this.checkNewPassword(password, isValidPassword)
                                        }
                                    />
                                </div>
                                <div className="form-group i-mb-20 c-has-feedback-left">
                                    <InputPassword
                                        placeholder="Confirm new password"
                                        refValue="repeat_password"
                                        ref="repeat_password"
                                        handlePassword={
                                            (password, isValidPassword) =>
                                                this.checkRepeatPassword(password, isValidPassword)
                                        }
                                    />
                                </div>
                                <button type="submit" className="btn btn-block c-btn-green">Update Password</button>
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

Password.propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

function mapStateToProps (state) {
    return {
        ChangePasswordReducer: state.ChangePasswordReducer
    }
}

export default connect(mapStateToProps)(Password)
