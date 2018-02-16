import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MiniSpinner from '../../MiniSpinner';
import { payFor } from '../../../actions/BillingActions/payForAction';
import Notification from '../../Notification';
import paypal from '../../../images/paypal.svg';
import creditCard from '../../../images/credit-card.svg';

class AddFunds extends Component {
    constructor() {
        super();
        this.state = {
            inputFunds: ''
        };
    }
    handleChangeInputFunds(e) {
        const inputValue = e.target.value.trim();
        if (typeof window !== 'undefined') {
            if (inputValue.length !== 0) {
                document.getElementById('payLabel').classList.add('form-group__label-always-onfocus');
            } else {
                document.getElementById('payLabel').classList.remove('form-group__label-always-onfocus');
            }
            const groupPayFunds = document.getElementById('group-pay-funds');
            groupPayFunds.classList.remove('has-error');
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
        if (this.state.inputFunds !== '' && this.state.inputFunds >= 5) {
            // console.log(this.state.inputFunds);
            this.props.onPayFor(this.state.inputFunds);
        } else {
            if (typeof window !== 'undefined') {
                const groupPayFunds = document.getElementById('group-pay-funds');
                groupPayFunds.classList.add('has-error');
            }
        }
    }
    render() {
        // console.log(this.props.PayForReducer);
        // const paypalButtonText = this.props.PayForReducer.isFetching ? <MiniSpinner /> : 'Proceed';
        // const isActivePaypalButton = this.props.PayForReducer.isFetching ?
        //     'feedback-form__submit btn disabled' :
        //     'feedback-form__submit btn';
        // const isActivePaypalState = !!this.props.PayForReducer.isFetching;
        return (
            <div className="block-item" id="add-funds">
                <Notification
                    status={this.props.PayForReducer.status}
                    name="Account"
                    errorMessage={this.props.PayForReducer.errorMessage}
                />
                <div>
                    <div className="block-item__title">Add funds</div>
                    {/*<form onSubmit={this.handleSubmitPay.bind(this)}>*/}
                    <div>
                        <div className="row">
                            <div className="col-md-5" style={{display: 'inline-flex'}}>
                                {/*<div className="light-text">Add funds via PayPal</div>*/}
	                            <img
		                            style={{marginRight: '30px'}}
                                    src={creditCard}
                                    alt="credit card"
                                />
	                            <img
                                    src={paypal}
                                    alt="paypal"
                                />
                            </div>
                            <div className="col-md-7">
	                            <a
                                    href={`${process.env.REACT_APP_API}/checkouts/new?auth_token=${localStorage.getItem('id_token')}`}
                                    style={{ width: '200px', height: '40px' }}
                                    className="feedback-form__submit btn"
                                >
		                            Add funds
                                </a>
                                {/*<div className="form-group" id="group-pay-funds">*/}
                                    {/*<input*/}
                                        {/*className="form-group__input-text form-control"*/}
                                        {/*onChange={this.handleChangeInputFunds.bind(this)}*/}
                                        {/*value={this.state.inputFunds}*/}
                                        {/*type="text"*/}
                                        {/*required="required"*/}
                                        {/*id="payFunds"*/}
                                        {/*title=' '*/}
                                    {/*/>*/}
                                    {/*<label*/}
                                        {/*className="form-group__label"*/}
                                        {/*id='payLabel'*/}
                                        {/*htmlFor='payFunds'*/}
                                    {/*>Enter Amount - $5 min</label>*/}
                                    {/*/!*<div className="form-group__helper">Enter Amount - $5 min</div>*!/*/}
                                {/*</div>*/}
                                {/*<div className="form-group pt-0">*/}
                                    {/*<button*/}
                                        {/*style={{*/}
                                            {/*width: '200px',*/}
                                            {/*height: '40px'*/}
                                        {/*}}*/}
                                        {/*ref="button"*/}
                                        {/*type="submit"*/}
                                        {/*className={isActivePaypalButton}*/}
                                        {/*disabled={isActivePaypalState}*/}
                                    {/*>*/}
                                        {/*{ paypalButtonText }*/}
                                    {/*</button>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
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
