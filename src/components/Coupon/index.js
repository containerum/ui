/* @flow */

import React from 'react';

import LoadButton from '../LoadButton';
import InputControl from '../InputControl';

type Props = {
  isFetching: boolean,
  inputCoupon: string,
  handleChangeInputCode: (value: string) => void,
  handleSubmitPayCoupon: (e: Object) => void
};

const Coupon = ({
  isFetching,
  inputCoupon,
  handleChangeInputCode,
  handleSubmitPayCoupon
}: Props) => (
  <div id="coupon">
    <div className="block-item">
      <div className="block-item__title">Promo code</div>
      <form onSubmit={e => handleSubmitPayCoupon(e)}>
        <div className="row">
          <div className="col-md-5">
            <div className="light-text">
              If you have a promo code, please enter <br />
              it below to receive your credit
            </div>
          </div>
          <div className="col-md-7">
            <InputControl
              value={inputCoupon}
              id="couponFunds"
              type="text"
              required
              baseClassName="form-group__input-text form-control"
              baseClassNameLabel={`form-group__label ${inputCoupon &&
                'form-group__label-always-onfocus'}`}
              labelText="Promo code"
              handleChangeInput={e => handleChangeInputCode(e.target.value)}
            />
            <LoadButton
              style={{
                width: '200px',
                height: '40px'
              }}
              type="submit"
              buttonText="Apply"
              isFetching={isFetching}
              baseClassButton="button_blue btn btn-outline-primary"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default Coupon;
