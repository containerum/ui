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
        backgroundColor : 'rgba(0, 0, 0, 0.01)',
        transition      : 'transform .3s ease-out,-webkit-transform .3s ease-out',
        zIndex: 1000
    },
    content: {
        position                : 'absolute',
        top                     : '0',
        left                    : '0',
        right                   : '0',
        bottom                  : '0',
        border                  : 'none',
        backgroundColor : 'rgba(0, 0, 0, 0.5)',
        overflow                : 'hidden',
        WebkitOverflowScrolling : 'touch',
        borderRadius            : 'none',
        outline                 : 'none',
        padding                 : '0'
    }
};

class CreateModal extends Component {
    constructor() {
        super();
        this.state = {
            nameType: '',
            modalIsOpen: this.props ? this.props.isOpened : false
        }
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if(nextProps.isOpened && nextProps.tariff) {
            if (typeof window !== 'undefined') {
                document.body.classList.add('overflow-hidden');
            }
            this.setState({
                ...this.state,
                modalIsOpen: true
            });
        }
    }
    handleClickCloseModal() {
        if (typeof window !== 'undefined') {
            document.body.classList.remove('overflow-hidden');
        }
        this.setState({
            nameType: '',
            modalIsOpen: false
        });
    }
    handleSubmitCreatingEssence(e) {
        e.preventDefault();
        if (this.props.tariff && this.state.nameType.length >= 2) {
            if (typeof window !== 'undefined') {
                document.body.classList.remove('overflow-hidden');
            }
            this.setState({
                nameType: '',
                modalIsOpen: false
            });
            this.props.onHandleCreate(this.state.nameType, this.props.tariff);
        }
    }
    handleChangeNameOfType(e) {
        const regexp = /^[a-z][a-z0-9-]*$|^$/;
        const inputValue = e.target.value.trim();
        if (inputValue.search(regexp) !== -1) {
            this.setState({
                ...this.state,
                nameType: e.target.value
            });
        }
    }
    render() {
        // console.log(this.state);
        const styleSubmit = this.state.nameType.length >= 2 ?
            'btn modal-footer-solution-select' :
            'btn modal-footer-solution-select modal-footer-volume-delete';
        const isDisabledSubmit = this.state.nameType.length >= 2;
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.handleClickCloseModal.bind(this)}
                style={customStyles}
                contentLabel="Create"
            >
                <div
                    className="modal fade show"
                    id="volume"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="modalLabel"
                >
                    <div className="modal-dialog modal-dialog2 modal-dialog-create" role="document">
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
                                    <div className=" namespace-plan-block-container hover-action-new">
                                        <div className="row">
                                            <div className="col-md-6 namespace-plan-block-container-left">
                                                <div className="namespace-plan-block-price">{this.props.data.price}</div>
                                                {
                                                    this.props.price === 0 && this.props.tariff === "free" ?
                                                        '' : <div className="namespace-plan-block-month">per month</div>
                                                }
                                            </div>
                                            { this.props.data.memory && this.props.data.cpu && this.props.data.traffic ?
                                                <div className="col-md-6 namespace-plan-block-container-right">
                                                    <div className="content-block-content card-block">
                                                        <div className="content-block__info-item ">
                                                            <div className="content-block__info-name inline">RAM : </div>
                                                            <div className="content-block__info-text inline">{this.props.data.memory} GB</div>
                                                        </div>
                                                        <div className="content-block__info-item">
                                                            <div className="content-block__info-name inline">CPU : </div>
                                                            <div className="content-block__info-text inline">{this.props.data.cpu}</div>
                                                        </div>
                                                        <div className="content-block__info-item">
                                                            <div className="content-block__info-name inline">Trafic : </div>
                                                            <div className="content-block__info-text inline">{this.props.data.traffic} TB</div>
                                                        </div>
                                                    </div>
                                                </div> : this.props.data.storageLimit ?
                                                    <div className="col-md-6  volume-plan-container-right">
                                                        <div className="hard-drive-size">{this.props.data.storageLimit} GB</div>
                                                    </div> : ''}
                                        </div>
                                    </div>
                                </div>
                                <span className="modal-redis-text mt-4">Please, enter the name to continue</span>
                                <input
                                    type="text"
                                    className="form-control volume-form-input"
                                    placeholder="Name"
                                    value={this.state.nameType}
                                    onChange={this.handleChangeNameOfType.bind(this)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn modal-footer-solution-cancel"
                                    onClick={this.handleClickCloseModal.bind(this)}
                                >Cancel</button>
                                <button
                                    type="submit"
                                    className={styleSubmit}
                                    disabled={!isDisabledSubmit}
                                >Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        );
    }
}

CreateModal.propTypes = {
    type: PropTypes.string,
    tariff: PropTypes.string,
    data: PropTypes.object,
    isOpened: PropTypes.bool,
    onHandleCreate: PropTypes.func
};

export default CreateModal;
