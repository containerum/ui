import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MiniSpinner from '../../MiniSpinner';
import { couponPay } from '../../../actions/BillingActions/couponPayAction';
import Notification from '../../Notification';
import {browserHistory} from "react-router";

class Coupon extends Component {
	constructor() {
		super();
		this.state = {
			inputCoupon: '',
			isValidCoupon: false
		};
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.CouponPayReducer.errorMessage !==
			nextProps.CouponPayReducer.errorMessage &&
			nextProps.CouponPayReducer.errorMessage) {
			const groupPayFunds = document.getElementById('group-pay-coupon');
			const groupCode = this.refs.code;
			groupPayFunds.classList.add('has-error');
			groupCode.classList.remove('has-error-visible');
		} else if (nextProps.CouponPayReducer.data &&
			nextProps.CouponPayReducer.coupon) {
			this.setState({
				...this.state,
				inputCoupon: ''
			});
		}
	}
	handleChangeInputCoupon(e) {
		const inputValue = e.target.value.trim();
		const regexp = /^[a-zA-Z0-9]{0,20}$|^$/;
		if (inputValue.search(regexp) !== -1) {
			if (inputValue.length !== 0) {
				document.getElementById('couponLabel').classList.add('form-group__label-always-onfocus');
			} else {
				document.getElementById('couponLabel').classList.remove('form-group__label-always-onfocus');
			}
			const groupPayFunds = document.getElementById('group-pay-coupon');
			const groupCode = this.refs.code;
			groupPayFunds.classList.remove('has-error');
			groupCode.classList.add('has-error-visible');
			this.setState({
				...this.state,
				inputCoupon: inputValue.toUpperCase()
			}, () => {
				if (inputValue.length < 5) {
					this.setState({
						...this.state,
						isValidCoupon: false
					});
				} else {
					this.setState({
						...this.state,
						isValidCoupon: true
					});
				}
			});
		}
	}
	handleSubmitPayCoupon(e) {
		e.preventDefault();
		if (this.state.inputCoupon &&
			this.state.inputCoupon.length >= 5) {
			this.props.onCouponPay(this.state.inputCoupon);
		} else {
			const groupPayFunds = document.getElementById('group-pay-coupon');
			const groupCode = this.refs.code;
			groupPayFunds.classList.add('has-error');
			groupCode.classList.remove('has-error-visible');
		}
	}
    render() {
	    const couponButtonText = this.props.CouponPayReducer.isFetching ? <MiniSpinner /> : 'Apply';
	    const isActiveCouponButton = this.props.CouponPayReducer.isFetching || !this.state.isValidCoupon ?
		    'button_blue btn btn-outline-primary disabled' :
		    'button_blue btn btn-outline-primary';
	    const isActiveCouponState = !!this.props.CouponPayReducer.isFetching || !this.state.isValidCoupon;
        return (
	        <div id="coupon">
		        <Notification
			        status={this.props.CouponPayReducer.status}
			        name={this.props.CouponPayReducer.coupon}
			        data={this.props.CouponPayReducer.data}
			        errorMessage={this.props.CouponPayReducer.errorMessage}
		        />
		        <div className="block-item">
			        <div className="block-item__title">Promo code</div>
			        <form onSubmit={this.handleSubmitPayCoupon.bind(this)}>
				        <div className="row">
					        <div className="col-md-5">
						        <div className="light-text">If you have a promo code, please enter <br/>
							        it below to receive your credit</div>
					        </div>
					        <div className="col-md-7">
						        <div className="form-group" id="group-pay-coupon">
							        <input
								        className="form-group__input-text form-control"
								        onChange={this.handleChangeInputCoupon.bind(this)}
								        value={this.state.inputCoupon}
								        type="text"
								        required="required"
								        ref="inputCode"
								        id="couponFunds"
							        />
							        <label
								        className="form-group__label"
								        id='couponLabel'
								        htmlFor='couponFunds'
							        >Promo code</label>
							        <div
								        className="form-group__helper has-error-visible"
								        ref="code"
							        >Invalid Promo Code</div>
						        </div>
						        <div className="form-group pt-0">
							        <button
								        style={{
									        width: '200px',
									        height: '40px'
								        }}
								        ref="button"
								        type="submit"
								        className={isActiveCouponButton}
								        disabled={isActiveCouponState}
							        >
								        { couponButtonText }
							        </button>
						        </div>
					        </div>
				        </div>
			        </form>
		        </div>
	        </div>
        );
    }
}

Coupon.propTypes = {
    onCouponPay: PropTypes.func,
	CouponPayReducer: PropTypes.object,
};

function mapStateToProps(state) {
    return {
	    CouponPayReducer: state.CouponPayReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCouponPay: (coupon) => {
            dispatch(couponPay(coupon));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Coupon);
