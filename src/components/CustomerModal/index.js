import React, { Component } from 'react';
import PropTypes from 'prop-types';

import redisLogo from '../../images/redis_logo.png';
import Modal from 'react-modal';
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

class CustomerModal extends Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false
        }
    }
    handleClickCloseModal() {
        this.setState({
            ...this.state,
            modalIsOpen: false
        });
    }
    handleClickOpenModal() {
        this.setState({
            ...this.state,
            modalIsOpen: true
        });
    }
    render() {
        console.log(this.props.isOpened, this.props.name, this.props.type);
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.handleClickCloseModal.bind(this)}
                styles={customStyles}
                contentLabel="Delete"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                onClick={this.handleClickCloseModal.bind(this)}
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <img className="modal-redis-icon" src={redisLogo} alt="redis" />
                            <h4 className="modal-title" id="modalLabel">Redis</h4>
                            <span className="modal-redis-text">Deployment will be removed</span>
                            <input className="custom-select" />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn modal-footer-solution-cancel"
                            >Cancel</button>
                            <button
                                type="button"
                                className="btn modal-footer-solution-select"
                            >Delete</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

CustomerModal.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    isOpened: PropTypes.bool
};

export default CustomerModal;
