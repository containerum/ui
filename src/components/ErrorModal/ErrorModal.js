import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(127, 127, 127, .8)',
        zIndex: 1000
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

class ErrorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // modalIsOpen: true
            modalIsOpen: this.props.modalIsOpen
        };
        this.openModal = this.openModal.bind(this);
        // this.closeModal = this.closeModal.bind(this);
    }
    // closeModal() {
    //     this.setState({modalIsOpen: false});
    // }
    componentWillReceiveProps(nextProps) {
        this.setState({ modalIsOpen: nextProps.modalIsOpen });
    }
    handleOnClickReload() {
        window.location.reload();
    }
    openModal() {
        this.setState({ modalIsOpen: true });
    }
    render() {
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                // onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="ErrorModal"
            >
                <h3 className="text-center">An unexpected error has occurred&nbsp;</h3>
                <p className="text-left">
                    Please check your Internet connection. <br />
                    Press the reload button to resubmit the data <br />
                    needed to load the page. Or visit our website later.
                </p>
                {/*<div onClick={this.closeModal} className="i-close"></div>*/}
                {/*<button className='btn pull-right c-btn-green' onClick={this.closeModal}>Cancel</button>*/}
                <button
                    type="submit"
                    onClick={this.handleOnClickReload.bind(this)}
                    className="btn pull-right c-btn-green"
                >
                    Reload page
                </button>
            </Modal>
        );
    }
}

ErrorModal.propTypes = {
    modalIsOpen: PropTypes.bool.isRequired
};

export default ErrorModal;
