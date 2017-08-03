import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validator from 'validator';

import { deleteProfile } from '../../../actions/ProfileActions/deleteProfileActions';

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(127, 127, 127, .8)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class DeleteAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            errorMsg: '',
            successMsg: ''
        };
        this.handleClickOpenModal = this.handleClickOpenModal.bind(this);
        this.handleClickCloseModal = this.handleClickCloseModal.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        const getAlert = document.getElementById('failDeleteAlert');
        const getSuccessfulAlert = document.getElementById('successfulDeleteAlert');
        if (nextProps.DeleteProfileReducer.data) {
            this.setState({
                ...this.state,
                successMsg: <div>{nextProps.DeleteProfileReducer.data}. Your profile has been deleted. <a href="http://containerum.io/" className="c-link-wt">Click the link to exit the site</a></div>
            });
            if (getSuccessfulAlert) {
                getSuccessfulAlert.style.display = 'block';
            }
            setTimeout(() => {
                window.location.replace('http://containerum.io/');
            }, 3000);
        } else if (nextProps.DeleteProfileReducer.errorMessage) {
            this.setState({
                ...this.state,
                errorMsg: nextProps.DeleteProfileReducer.errorMessage
            });
            if (getAlert) {
                getAlert.style.display = 'block';
            }
        } else {
            if (getAlert && getSuccessfulAlert) {
                getAlert.style.display = 'none';
                getSuccessfulAlert.style.display = 'none';
            }
        }
    }
    handleOnClickDeleteProfile(e) {
        e.preventDefault();
        const currentEmail = this.refs.email.value.trim();
        const getAlert = document.getElementById('failDeleteAlert');

        const isValidEmailState = validator.isEmail(currentEmail);
        if (isValidEmailState) {
            const userEmail = this.props.GetProfileReducer.data.login ? this.props.GetProfileReducer.data.login : '';
            if (currentEmail === userEmail) {
                if (getAlert) {
                    getAlert.style.display = 'none';
                }
                this.props.onDeleteProfile();
            } else {
                this.setState({
                    ...this.state,
                    errorMsg: 'Password is not valid'
                });
                if (getAlert) {
                    getAlert.style.display = 'block';
                }
            }
        } else {
            this.setState({
                ...this.state,
                errorMsg: 'Password is not valid'
            });
            if (getAlert) {
                getAlert.style.display = 'block';
            }
        }
    }
    handleClickCloseModal() {
        this.setState({ modalIsOpen: false });
    }
    handleClickOpenModal() {
        this.setState({ modalIsOpen: true });
    }
    render() {
        return (
            <div className="card mt-3">
                <div className="card-block c-table-card-block">
                    <table className="table i-table-card">
                        <tbody>
                            <tr>
                                <td className="first-td-width">
                                    <h2 id="delete-account">
                                        <a name="delete-account" className="anchor" href="#delete-account">Delete Account</a>
                                    </h2> <br/>
                                    <p>Warning: This will totally delete Your Apps and Data</p>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                </td>
                                <td style={{ width: '200px' }}>
                                    <button
                                        onClick={this.handleClickOpenModal}
                                        className="btn btn-block c-btn-green"
                                        type="submit"
                                    >
                                        Delete
                                    </button>
                                    <Modal
                                        isOpen={this.state.modalIsOpen}
                                        onRequestClose={this.handleClickCloseModal}
                                        style={customStyles}
                                        contentLabel="Delete"
                                    >
                                        <h3 className="text-left">Delete Account</h3>
                                        <div id="failDeleteAlert" className="alert alert-danger mb-4 c-alert-danger">
                                            { this.state.errorMsg }
                                        </div>
                                        <div id="successfulDeleteAlert" className="alert alert-success mb-4 c-alert-success">
                                            { this.state.successMsg }
                                        </div>
                                        <p className="text-left">
                                            Account Deleting is irreversible. Enter your Containerum email to confirm <br/>
                                            you want to permanently delete this account and all included data.
                                        </p>
                                        <div onClick={this.handleClickCloseModal} className="i-close"></div>
                                        <form onSubmit={this.handleOnClickDeleteProfile.bind(this)}>
                                            <div className="card-block p-5 i-card-block-padding-2">
                                                <div className="form-group i-mb-20 c-has-feedback-left">
                                                    <input
                                                        ref="email"
                                                        id="email"
                                                        required="required"
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Email"
                                                    />
                                                    <i className="c-form-control-icon fa fa-tag fa-1"></i>
                                                </div>
                                                <div>
                                                    <button className="btn pull-right c-btn-green" onClick={this.handleClickCloseModal}>Cancel</button>
                                                    <button type="submit" className="btn pull-right c-btn-green mr-2">Delete</button>
                                                </div>
                                            </div>
                                        </form>
                                    </Modal>
                                </td>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

DeleteAccount.propTypes = {
    onDeleteProfile: PropTypes.func.isRequired,
    GetProfileReducer: PropTypes.object
};

function mapStateToProps(state) {
    return {
        GetProfileReducer: state.GetProfileReducer,
        DeleteProfileReducer: state.DeleteProfileReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteProfile: () => {
            dispatch(deleteProfile());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);
