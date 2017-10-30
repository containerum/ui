import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InputPassword from '../InputPassword';
import { changePassword } from '../../../actions/ChangePasswordActions';
import MiniSpinner from '../../MiniSpinner';

class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: '',
            successMsg: '',
            currentPassword: '',
            isValidCurrentPassword: false,
            newPassword: '',
            isValidNewPassword: false,
            repeatPassword: '',
            isValidRepeatPassword: false
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.ChangePasswordReducer.errorMessage) {
            if (typeof window !== 'undefined') {
                // this.setState({
                //     ...this.state,
                //     errorMsg: nextProps.ChangePasswordReducer.errorMessage
                // });
                // const getAlert = document.getElementById('loginAlert');
                // getAlert.style.display = 'block';

                const hasErrorGroupCurrentPassword = document.getElementById('group-current_password');
                const hasErrorGroupNewPassword = document.getElementById('group-new_password');
                const hasErrorGroupRepeatPassword = document.getElementById('group-repeat_password');
                hasErrorGroupCurrentPassword.classList.add('has-error');
                hasErrorGroupNewPassword.classList.add('has-error');
                hasErrorGroupRepeatPassword.classList.add('has-error');
            }
        }
        if (nextProps.ChangePasswordReducer.data) {
            // this.setState({
            //     ...this.state,
            //     successMsg: 'Your password has been changed successfully!'
            // });
            // const getSuccessfulAlert = document.getElementById('successfulAlert');
            // getSuccessfulAlert.style.display = 'block';
            this.refs.current_password.refs.current_password.value = '';
            this.refs.new_password.refs.new_password.value = '';
            this.refs.repeat_password.refs.repeat_password.value = '';
        }
    }
    submitUpdatedPasswordData(e) {
        e.preventDefault();

        if (typeof window !== 'undefined') {
            const hasErrorGroupCurrentPassword = document.getElementById('group-current_password');
            const hasErrorGroupNewPassword = document.getElementById('group-new_password');
            const hasErrorGroupRepeatPassword = document.getElementById('group-repeat_password');
            const current_password = this.refs.current_password.refs.current_password.value;
            const new_password = this.refs.new_password.refs.new_password.value;
            const repeat_password = this.refs.repeat_password.refs.repeat_password.value;

            if (
                (current_password.length >= 8 && current_password.length <= 64) &&
                (new_password.length >= 8 && new_password.length <= 64) &&
                (repeat_password.length >= 8 && repeat_password.length <= 64) &&
                new_password === repeat_password
            ) {
                const updatePasswordData = {
                    password: current_password,
                    new_password: new_password
                };
                // const getAlert = document.getElementById('loginAlert');
                // getAlert.style.display = 'none';
                // console.log(updatePasswordData);
                this.props.onChangePassword(updatePasswordData);
            } else {
                // this.setState({
                //     ...this.state,
                //     errorMsg: 'Password is not valid'
                // });
                hasErrorGroupCurrentPassword.classList.add('has-error');
                hasErrorGroupNewPassword.classList.add('has-error');
                hasErrorGroupRepeatPassword.classList.add('has-error');
                // const getAlert = document.getElementById('loginAlert');
                // getAlert.style.display = 'block';
            }
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
        const resetPasswordButtonText = this.props.ChangePasswordReducer.isFetching ? <MiniSpinner /> : 'Save';
        const isActiveResetPasswordButton = this.props.ChangePasswordReducer.isFetching ?
            'button_blue btn btn-outline-primary save-password disabled' :
            'button_blue btn btn-outline-primary save-password';
        const isActiveResetPasswordState = !!this.props.ChangePasswordReducer.isFetching;
        return (
            <div>
                <div className="block-item" id="password">
                    <div className="block-item__title">Password</div>
                    <form onSubmit={this.submitUpdatedPasswordData.bind(this)}>
                        <div className="row">
                            <div className="col-md-10">
                                <div className="row">
                                    <div className="col-md-4">
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
                                    <div className="col-md-4">
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
                                    <div className="col-md-4">
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
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group pt-0 text-right">
                                    <button
                                        type="submit"
                                        className={isActiveResetPasswordButton}
                                        disabled={isActiveResetPasswordState}
                                    >
                                        {resetPasswordButtonText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Password.propTypes = {
    onChangePassword: PropTypes.func.isRequired,
    ChangePasswordReducer: PropTypes.object,
    errorMessage: PropTypes.string
};

function mapStateToProps(state) {
    return {
        ChangePasswordReducer: state.ChangePasswordReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangePassword: updatePasswordData => {
            dispatch(changePassword(updatePasswordData));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Password);
