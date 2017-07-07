import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import { recoveryPassword } from '../../actions/RecoveryPasswordActions';
import { checkHashPassword } from '../../actions/CheckHashPasswordActions';
import InputPassword from '../auth/InputPassword';
import MiniSpinner from '../MiniSpinner';

import Logo from '../Logo';

class RecoveryPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: '',
            newPassword: '',
            isValidNewPassword: false,
            repeatPassword: '',
            isValidRepeatPassword: false
        };
    }
    componentWillMount() {
        document.body.classList.add('c-body-bg');
        localStorage.removeItem('id_token');
        if (this.props.location.query.hashParam) {
            this.props.onCheckHashPassword(this.props.location.query.hashParam);
        } else {
            browserHistory.push('/Forgot');
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.CheckHashPasswordReducer.status !== 200 && nextProps.CheckHashPasswordReducer.status > 0) {
            this.setState({
                ...this.state,
                errorMsg: <div>Link is invalid. <Link to="/Forgot" className="c-link-wt">Forgot your password?</Link></div>
            });
            const getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        }
        if (nextProps.RecoveryPasswordReducer.status === 202) {
            browserHistory.push({
                pathname: '/Login',
                search: '?hashConf=' + this.props.CheckHashPasswordReducer.hashParam
            });
        }
    }
    submitUpdatedPasswordData(e) {
        e.preventDefault();

        const new_password = this.refs.new_password.refs.new_password.value;
        const repeat_password = this.refs.repeat_password.refs.repeat_password.value;

        if (
            (new_password.length >= 8 && new_password.length <= 64) &&
            (repeat_password.length >= 8 && repeat_password.length <= 64) &&
            new_password === repeat_password
        ) {
            const updatePasswordData = {
                password: new_password
            };
            const getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'none';
            this.props.onRecoveryPassword(this.props.CheckHashPasswordReducer.hashParam, updatePasswordData.password);
        } else {
            this.setState({
                ...this.state,
                errorMsg: 'Password is not valid'
            });
            const getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        }
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
        const updatePasswordButtonText = this.props.RecoveryPasswordReducer.isFetching ? <MiniSpinner /> : 'Update Password';
        const isDisabled = this.props.CheckHashPasswordReducer.status === 200;
        return (
            <div className="container">
                <Logo />
                <form className="form-signin" onSubmit={this.submitUpdatedPasswordData.bind(this)}>
                    <div className="card c-card">
                        <div className="card-block p-5">
                            <div className="card-label">Type new password</div>
                            <div id="loginAlert" className="alert alert-danger mb-4 c-alert-danger">
                                { this.state.errorMsg }
                            </div>
                            <div id="successfulAlert" className="alert alert-success mb-4 c-alert-success">
                                { this.state.successMsg }
                            </div>
                            <InputPassword
                                placeholder="New password"
                                refValue="new_password"
                                ref="new_password"
                                handlePassword={
                                    (password, isValidPassword) =>
                                        this.checkNewPassword(password, isValidPassword)
                                }
                                isDisabled={!isDisabled}
                            />
                            <InputPassword
                                placeholder="Confirm new password"
                                refValue="repeat_password"
                                ref="repeat_password"
                                handlePassword={
                                    (password, isValidPassword) =>
                                        this.checkRepeatPassword(password, isValidPassword)
                                }
                                isDisabled={!isDisabled}
                            />
                            <button
                                ref="button"
                                type="submit"
                                disabled={!isDisabled}
                                className={!isDisabled ? 'btn btn-block c-btn-green disabled' : 'btn btn-block c-btn-green'}
                            >
                                { updatePasswordButtonText }
                            </button>
                        </div>
                        <div className="card-footer text-center">Don`t have an account? <Link to="/SignUp">Sing up</Link></div>
                    </div>
                    <p className="text-center pt-3"><Link to="/Login" className="c-link-wt">Go to Login</Link></p>
                </form>
            </div>
        );
    }
}

RecoveryPassword.propTypes = {
    onCheckHashPassword: PropTypes.func.isRequired,
    onRecoveryPassword: PropTypes.func.isRequired,
    location: PropTypes.object,
    CheckHashPasswordReducer: PropTypes.object,
    RecoveryPasswordReducer: PropTypes.object,
    hashParam: PropTypes.string,
    status: PropTypes.number
};

function mapStateToProps(state) {
    return {
        hashParam: state.hashParam,
        CheckHashPasswordReducer: state.CheckHashPasswordReducer,
        RecoveryPasswordReducer: state.RecoveryPasswordReducer,
        status: state.CheckHashPasswordReducer.status
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCheckHashPassword: hashParam => {
            dispatch(checkHashPassword(hashParam));
        },
        onRecoveryPassword: (hashParam, password) => {
            dispatch(recoveryPassword(hashParam, password));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoveryPassword);
