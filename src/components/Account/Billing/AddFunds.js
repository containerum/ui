import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MiniSpinner from '../../MiniSpinner';
import { payFor } from '../../../actions/BillingActions/payForAction';

class AddFunds extends Component {
    constructor() {
        super();
        this.state = {
            inputFunds: ''
        };
    }
    handleChangeInputFunds(e) {
        const inputValue = e.target.value.trim();
        if (inputValue.length !== 0) {
            document.getElementById('payLabel').classList.add('form-group__label-always-onfocus');
        } else {
            document.getElementById('payLabel').classList.remove('form-group__label-always-onfocus');
        }

        const regexp = /^\d+(?:\.\d{0,2})?$|^$/;
        if (inputValue.search(regexp) !== -1) {
            this.setState({
                ...this.state,
                inputFunds: inputValue
            });
        }
    }
    handleSubmitPay(e) {
        e.preventDefault();
        if (this.state.inputFunds !== '') {
            // console.log(this.state.inputFunds);
            this.props.onPayFor(this.state.inputFunds);
        }
    }
    render() {
        // console.log(this.props.PayForReducer);
        const paypalButtonText = this.props.PayForReducer.isFetching ? <MiniSpinner /> : 'Add funds by PayPal';
        const isActivePaypalButton = this.props.PayForReducer.isFetching ?
            'button_blue btn btn-outline-primary disabled' :
            'button_blue btn btn-outline-primary';
        const isActivePaypalState = !!this.props.PayForReducer.isFetching;
        return (
            <div className="block-item" id="add-funds">
                <div className="block-item__title">Add funds</div>
                <form onSubmit={this.handleSubmitPay.bind(this)}>
                    <div className="row">
                        <div className="col-md-5">
                            <div className="light-text">One-time payment via PayPal</div>
                        </div>
                        <div className="col-md-7">
                            <div className="form-group pt-0">
                                <input
                                    type="text"
                                    className="form-group__input-text form-control"
                                    onChange={this.handleChangeInputFunds.bind(this)}
                                    value={this.state.inputFunds}
                                    id="text"
                                />
                                <label
                                    className="form-group__label"
                                    htmlFor="payFunds"
                                    id="payLabel"
                                >Amount, $</label>
                                <div className="form-group__helper"> </div>
                            </div>
                            <div className="form-group pt-0">
                                <button
                                    style={{
                                        width: '200px',
                                        height: '40px'
                                    }}
                                    ref="button"
                                    type="submit"
                                    className={isActivePaypalButton}
                                    disabled={isActivePaypalState}
                                >
                                    { paypalButtonText }
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

AddFunds.propTypes = {
    PayForReducer: PropTypes.object
};

function mapStateToProps(state) {
    return {
        PayForReducer: state.PayForReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPayFor: (amount) => {
            dispatch(payFor(amount));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFunds);
