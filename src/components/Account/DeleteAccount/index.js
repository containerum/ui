import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DeleteModal from '../../CustomerModal/DeleteModal';

import { deleteProfile } from '../../../actions/ProfileActions/deleteProfileAction';
import Spinner from '../../Spinner';

class DeleteAccount extends Component {
    constructor() {
        super();
        this.state = {
            isOpened: false
        }
    }
    componentWillReceiveProps(nextProps) {
        // console.log(this.props.DeleteNamespaceReducer.idName, nextProps.DeleteNamespaceReducer.idName);
        if (this.props.DeleteProfileReducer) {
            this.setState({
                ...this.state,
                isOpened: false
            });
        }
    }
    handleClickDeletingAccount() {
        this.setState({
            ...this.state,
            isOpened: true
        });
    }
    render() {
        let isFetchingDeleteAccount = '';
        if (this.props.DeleteProfileReducer.isFetching) {
            isFetchingDeleteAccount = <Spinner />;
        }
        return (
            <div>
                { isFetchingDeleteAccount }
                <div className="block-item" id="delete-account">
                    <div className="block-item__title">Delete Account</div>
                    <div className="light-text">This action will delete your Apps and Data</div>
                    <div className="block-item__buttons">
                        <button
                            className="button_red btn btn-outline-primary"
                            onClick={this.handleClickDeletingAccount.bind(this)}
                        >Delete</button>
                    </div>

                    <DeleteModal
                        type="Account"
                        name={this.props.email}
                        isOpened={this.state.isOpened}
                        onHandleDelete={this.props.onDeleteProfile}
                    />
                </div>
            </div>
        );
    }
}

DeleteAccount.propTypes = {
    onDeleteProfile: PropTypes.func.isRequired,
    GetProfileReducer: PropTypes.object,
    email: PropTypes.string
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
