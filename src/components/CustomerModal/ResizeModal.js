import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import 'rc-tooltip/assets/bootstrap_white.css';

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
        maxHeight               : '350px'
    }
};

class ResizeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: this.props ? this.props.isOpened : false
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.isOpened && nextProps.tariff) {
            this.setState({
                ...this.state,
                modalIsOpen: true
            });
        }
    }
    handleClickCloseModal() {
        this.setState({
            modalIsOpen: false
        });
    }
    handleSubmitCreatingEssence(e) {
        e.preventDefault();
        // console.log(this.props.tariff, this.props.data.idName);
        if (this.props.tariff && this.props.data.idName) {
            this.setState({
                modalIsOpen: false
            });
            this.props.onHandleCreate(this.props.data.idName, this.props.tariff);
        }
    }
    render() {
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.handleClickCloseModal.bind(this)}
                style={customStyles}
                contentLabel="Resize"
                className={{
                    base: 'modal-dialog modal-dialog2 modal-dialog-create'
                }}
            >
                <form
                    onSubmit={this.handleSubmitCreatingEssence.bind(this)}
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
                        >New {this.props.type}</h4>
                        <div className="col-md-10 p-0">
                            <div className=" namespace-plan-block-container hover-action-new hover-always-new">
                                <div className="row">
                                    <div className={this.props.data.price === '$2' ?
		                                "col-md-6 namespace-plan-block-container-left namespace-plan-block2dollars" :
		                                "col-md-6 namespace-plan-block-container-left"}>
                                        <div className="namespace-plan-block-price">{this.props.data.price}<span className="namespace-plan-span-price">/mo</span></div>
                                            <div className="namespace-plan-block-month">{this.props.data.pricePerDay}</div>
                                    </div>
                                    { this.props.data.memory && this.props.data.cpu ?
                                        <div className="col-md-6 namespace-plan-block-container-right">
                                            <div className={this.props.data.price === '$2' ?
		                                        "content-block-content card-block card-block2dollars" :
		                                        "content-block-content card-block"}>
                                                <div className="content-block__info-item ">
                                                    <div className="content-block__info-name inline">RAM : </div>
                                                    <div className="content-block__info-text inline">{this.props.data.memory} GB</div>
                                                </div>
                                                <div className="content-block__info-item">
                                                    <div className="content-block__info-name inline">CPU : </div>
                                                    <div className="content-block__info-text inline">{this.props.data.cpu}</div>
                                                </div>
	                                            {
		                                            this.props.data.volume ?
                                                        <div className="content-block__info-item">
                                                            <div className="content-block__info-name inline">Volume : </div>
                                                            <div className="content-block__info-text inline">{this.props.data.volume} GB</div>
                                                        </div> : ''
	                                            }
                                            </div>
                                        </div> : this.props.data.storageLimit ?
                                            <div className="col-md-6  volume-plan-container-right">
                                                <div className="hard-drive-size">{this.props.data.storageLimit} GB</div>
                                            </div> : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn modal-footer-solution-cancel"
                            onClick={this.handleClickCloseModal.bind(this)}
                        >Cancel</button>
                        <button
                            type="submit"
                            className="btn modal-footer-solution-select"
                        >Resize</button>
                    </div>
                </form>
            </Modal>
        );
    }
}

ResizeModal.propTypes = {
    type: PropTypes.string,
    tariff: PropTypes.string,
    data: PropTypes.object,
    isOpened: PropTypes.bool,
    onHandleCreate: PropTypes.func
};

export default ResizeModal;
