/* @flow */

import React from 'react';
// import cookie from 'react-cookies';

import LoadButton from '../LoadButton';
import InputControl from '../InputControl';
// import config from '../../config';
import paypal from '../../images/paypal.svg';
import creditCard from '../../images/credit-card.svg';
import { CHANGE_PROFILE_INFO_SUCCESS } from '../../constants/profileConstants/changeProfileInfo';

import globalStyles from '../../theme/global.scss';
import buttonsStyles from '../../theme/buttons.scss';

type Props = {
  isFetching: boolean,
  inputFunds: string,
  handleChangeInputFunds: (value: string) => void,
  handleSubmitPay: (e: Object) => void,
  handleClickAddFunds: () => void,
  changeProfile: string,
  isFullDataOfProfile: boolean
};
// const browser = cookie.load('browser');
// const accessToken = cookie.load('accessToken');

const AddFunds = ({
  isFetching,
  inputFunds,
  handleChangeInputFunds,
  handleSubmitPay,
  changeProfile,
  handleClickAddFunds,
  isFullDataOfProfile
}: Props) => (
  <div className={globalStyles.blockItem} id="add-funds">
    <div className={globalStyles.blockItemTitle}>Add funds</div>
    <div>
      <form onSubmit={handleSubmitPay}>
        <div className="row">
          <div className="col-md-5" style={{ display: 'inline-flex' }}>
            <img
              style={{ marginRight: '30px' }}
              src={creditCard}
              alt="credit card"
            />
            <img src={paypal} alt="paypal" />
          </div>
          <div className="col-md-7">
            {/* {changeProfile === CHANGE_PROFILE_INFO_SUCCESS || */}
            {/* isFullDataOfProfile ? ( */}
            {/* <a */}
            {/* href={`${ */}
            {/* config.webApi */}
            {/* }/checkouts/new?User-Client=${browser}&User-Token=${accessToken}`} */}
            {/* style={{ */}
            {/* width: '200px', */}
            {/* height: '40px', */}
            {/* paddingTop: '5px' */}
            {/* }} */}
            {/* className={`${buttonsStyles.buttonUIFeedbackSubmit} btn`} */}
            {/* > */}
            {/* Add funds */}
            {/* </a> */}
            {/* ) : ( */}
            {/* <button */}
            {/* style={{ */}
            {/* width: '200px', */}
            {/* height: '40px', */}
            {/* paddingTop: '5px' */}
            {/* }} */}
            {/* className={`${buttonsStyles.buttonUIFeedbackSubmit} btn`} */}
            {/* onClick={handleClickAddFunds} */}
            {/* > */}
            {/* Add funds */}
            {/* </button> */}
            {/* )} */}
            <InputControl
              value={inputFunds}
              id="payFunds"
              type="text"
              required
              baseClassName="form-group__input-text form-control"
              baseClassNameLabel={`form-group__label ${inputFunds &&
                'form-group__label-always-onfocus'}`}
              labelText="Enter Amount - $5 min"
              handleChangeInput={e => handleChangeInputFunds(e.target.value)}
            />
            <div className="form-group pt-0" style={{ marginTop: 7 }}>
              {changeProfile === CHANGE_PROFILE_INFO_SUCCESS ||
              isFullDataOfProfile ? (
                <LoadButton
                  style={{
                    width: '200px',
                    height: '40px'
                  }}
                  type="submit"
                  buttonText="Add funds"
                  isFetching={isFetching}
                  baseClassButton="feedback-form__submit btn"
                />
              ) : (
                <button
                  style={{
                    width: '200px',
                    height: '40px',
                    paddingTop: '5px'
                  }}
                  type="button"
                  className={`${buttonsStyles.buttonUIFeedbackSubmit} btn`}
                  onClick={handleClickAddFunds}
                >
                  Add funds
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default AddFunds;
