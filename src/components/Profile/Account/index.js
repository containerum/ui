import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUser } from '../../../actions/UserActions';
import InputEmail from '../../../components/auth/InputEmail';

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '500px'
    }
};

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            data: [],
            errorMsg: '',
            email: '',
            isValidEmail: false
        };
        this.openModal = this.openModal.bind(this);
        // this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.checkValidateEmailInput = this.checkValidateEmailInput.bind(this);
        this.submitUpdatedData = this.submitUpdatedData.bind(this);
    }
    checkValidateEmailInput(email, isValidEmail) {
        this.setState({
            ...this.state,
            email: email,
            isValidEmail: isValidEmail
        });
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.ProfileReducer.data.login && nextProps.ProfileReducer.data.login !== this.props.ProfileReducer.data.login) {
            this.setState({
                ...this.state,
                email: nextProps.ProfileReducer.data.login
            });
        }
    }
    openModal() {
        this.setState({modalIsOpen: true});
    }
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    submitUpdatedData(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        const updateData = {
            first_name: this.refs.first_name.value,
            last_name: this.refs.last_name.value,
            email: this.state.email,
            phone: this.refs.phone.value,
            address: this.refs.address.value,
        };
        // console.log(updateData);
        dispatch(getUser(updateData));
    }
    render() {
        const userEmail = this.props.ProfileReducer.data.login ? this.props.ProfileReducer.data.login : '';
        return (
            <div className='container-fluid pt-3'>
                <div className='row'>
                    <div className="col-12">
                        <div className="card mt-3">
                            <div className="card-block c-table-card-block">
                                <table className="table i-table-card">
                                    <tbody>
                                    <tr>
                                        <td>
                                            Account
                                        </td>
                                        <td>
                                            {userEmail}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src='http://placehold.it/150x150' alt='...' className='img-rounded'/>
                                        </td>
                                        <td>
                                            {userEmail}
                                        </td>
                                        <td>
                                            <ul>
                                                <li>Plan: ULTRA</li>
                                                <li>Limits</li>
                                                <li>RAM: 8 GB</li>
                                                <li>STORAGE: 40 GB</li>
                                            </ul>
                                        </td>
                                        <td>
                                            <button onClick={this.openModal} className='btn btn-default' type='submit'>Edit Profile</button>
                                            <Modal
                                                isOpen={this.state.modalIsOpen}
                                                // onAfterOpen={this.afterOpenModal}
                                                onRequestClose={this.closeModal}
                                                style={customStyles}
                                                contentLabel='Example Modal'
                                            >
                                                <h3 className="text-center">Edit your profile</h3>
                                                <div onClick={this.closeModal} className="i-close"></div>
                                                <form onSubmit={this.submitUpdatedData}>
                                                    <div className='card-block p-5'>
                                                        <div className='form-group i-mb-20 c-has-feedback-left'>
                                                            <input
                                                                ref='first_name'
                                                                required='required'
                                                                type='text'
                                                                className='form-control'
                                                                id='inlineFormInputFirstName'
                                                                placeholder='First Name'
                                                                defaultValue=''
                                                            />
                                                            <i className='c-form-control-icon fa fa-tag fa-1'></i>
                                                        </div>

                                                        <div className='form-group i-mb-20 c-has-feedback-left'>
                                                            <input
                                                                ref='last_name'
                                                                required='required'
                                                                type='text'
                                                                className='form-control'
                                                                id='inlineFormInputLastName'
                                                                placeholder='Last Name'
                                                                defaultValue=''
                                                            />
                                                            <i className='c-form-control-icon fa fa-tag fa-1'></i>
                                                        </div>

                                                        <InputEmail
                                                            handleEmail={
                                                                (email, isValidEmail) =>
                                                                    this.checkValidateEmailInput(email, isValidEmail)
                                                            }
                                                            defaultUserEmail={userEmail}
                                                        />

                                                        <div className='form-group i-mb-20 c-has-feedback-left'>
                                                            <input
                                                                ref='phone'
                                                                required='required'
                                                                type='text'
                                                                className='form-control'
                                                                id='inlineFormInputPhone'
                                                                placeholder='Phone'
                                                                defaultValue=''
                                                            />
                                                            <i className='c-form-control-icon fa fa-tag fa-1'></i>
                                                        </div>

                                                        <div className='form-group i-mb-20 c-has-feedback-left'>
                                                            <input
                                                                ref='address'
                                                                required='required'
                                                                type='text'
                                                                className='form-control'
                                                                id='inlineFormInputAddress'
                                                                placeholder='Address'
                                                                defaultValue=''
                                                            />
                                                            <i className='c-form-control-icon fa fa-tag fa-1'></i>
                                                        </div>
                                                        <button ref='button' type='submit' className='btn btn-block c-btn-green i-btn-login-strong'>Update profile</button>
                                                    </div>
                                                </form>
                                            </Modal>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Account.propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

function mapStateToProps (state) {
    const { UserReducer } = state;
    const { ProfileReducer } = state;
    const { userErrorMessage } = UserReducer;

    return {
        userErrorMessage,
        ProfileReducer,
        UserReducer
    }
}

export default connect(mapStateToProps)(Account)
