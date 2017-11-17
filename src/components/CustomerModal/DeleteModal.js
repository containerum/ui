import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const customStyles = {
    overlay: {
        position        : 'fixed',
        top             : 0,
        left            : 0,
        right           : 0,
        bottom          : 0,
        transition      : 'transform .3s ease-out,-webkit-transform .3s ease-out',
        zIndex          : 1000,
        backgroundColor : 'rgba(0, 0, 0, 0.5)'
    },
    content: {
        position                : 'absolute',
        top                     : '0',
        left                    : '0',
        right                   : '0',
        bottom                  : '0',
        border                  : 'none',
        overflow                : 'hidden',
        WebkitOverflowScrolling : 'touch',
        borderRadius            : 'none',
        outline                 : 'none',
        padding                 : '0',
        maxHeight               : '340px'
    }
};

class DeleteModal extends Component {
    constructor() {
        super();
        this.state = {
            nameType: '',
            modalIsOpen: this.props ? this.props.isOpened : false
        }
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        // if(nextProps.isOpened && nextProps.name !== this.state.nameType) {
        if(nextProps.isOpened && nextProps.name) {
            this.setState({
                ...this.state,
                modalIsOpen: true
            });
        }
    }
    handleClickCloseModal() {
        this.setState({
            nameType: '',
            modalIsOpen: false
        });
    }
    handleSubmitDeletingEssence(e) {
        e.preventDefault();
        if (this.state.nameType === this.props.name) {
            this.setState({
                ...this.state,
                nameType: '',
                modalIsOpen: false
            });
            this.props.onHandleDelete(this.props.name);
        }
    }
    handleChangeNameOfType(e) {
        this.setState({
            ...this.state,
            nameType: e.target.value
        });
    }
    render() {
        const styleSubmit = this.state.nameType === this.props.name ?
            'btn modal-footer-solution-select' :
            'btn modal-footer-solution-select modal-footer-volume-delete';
        const isDisabledSubmit = this.state.nameType !== this.props.name;
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.handleClickCloseModal.bind(this)}
                style={customStyles}
                contentLabel="Delete"
                className={{
                    base: 'modal-dialog modal-dialog2'
                }}
            >
                <form
                    onSubmit={this.handleSubmitDeletingEssence.bind(this)}
                    className="modal-content"
                >
                    <div className="modal-header">
                        <button
                            type="button"
                            className="close"
                            onClick={this.handleClickCloseModal.bind(this)}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body text-left">
                        <h4
                            className="modal-title modal-title-volume"
                            id="modalLabel"
                        >{this.props.name}</h4>
                        <span className="modal-redis-text">
                            Deleting your {this.props.type} is irreversible.<br />
                            Enter your {this.props.type} name (<strong style={{color: '#29abe2'}}>{this.props.name}</strong>) below to confirm you want to permanently delete it:
                        </span>
                        <input
                            type="text"
                            className="form-control volume-form-input"
                            placeholder="Name"
                            onChange={this.handleChangeNameOfType.bind(this)}
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn modal-footer-solution-cancel"
                            onClick={this.handleClickCloseModal.bind(this)}
                        >Cancel</button>
                        <button
                            type="submit"
                            className={styleSubmit}
                            disabled={isDisabledSubmit}
                        >Delete</button>
                    </div>
                </form>
            </Modal>
        );
    }
}

DeleteModal.propTypes = {
    typeModal: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    isOpened: PropTypes.bool,
    onHandleDelete: PropTypes.func
};

export default DeleteModal;
