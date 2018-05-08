/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import classNames from 'classnames/bind';
import _ from 'lodash/fp';
import queryString from 'query-string';
import dateFormat from 'dateformat';

import countriesBillingConstants from '../../constants/countriesBillingConstants';
import config from '../../config';
import {
  GET_PROFILE_TARIFFS_INVALID,
  GET_PROFILE_TARIFFS_REQUESTING,
  GET_PROFILE_TARIFFS_FAILURE
} from '../../constants/profileConstants/getProfileTariffs';
import {
  GET_PROFILE_INVALID,
  GET_PROFILE_REQUESTING,
  GET_PROFILE_FAILURE,
  GET_PROFILE_SUCCESS
} from '../../constants/profileConstants/getProfile';
import {
  GET_BALANCE_INVALID,
  GET_BALANCE_REQUESTING,
  GET_BALANCE_FAILURE
} from '../../constants/billingConstants/getBalance';
import {
  GET_PROFILE_REPORT_INVALID,
  GET_PROFILE_REPORT_REQUESTING,
  GET_PROFILE_REPORT_FAILURE
} from '../../constants/profileConstants/getProfileReport';
import {
  CHANGE_PROFILE_INFO_FAILURE,
  CHANGE_PROFILE_INFO_SUCCESS
} from '../../constants/profileConstants/changeProfileInfo';
import * as actionGetTariffsProfile from '../../actions/profileActions/getTariffsProfile';
import * as actionGetReportProfile from '../../actions/profileActions/getReportProfile';
import * as actionPayFor from '../../actions/billingActions/payFor';
import * as actionCouponPay from '../../actions/billingActions/couponPay';
import * as actionChangeProfileInfo from '../../actions/profileActions/changeProfileInfo';
import type { Dispatch, ReduxState } from '../../types';
import Notification from '../Notification';
import AddInformationModal from '../../components/CustomerModal/AddInformationModal';
import ProfileSidebar from '../../components/ProfileSidebar';
import BillingInfo from '../../components/BillingInfo';
import AddFunds from '../../components/AddFunds';
// import Coupon from '../../components/Coupon';
import HistoryFunds from '../../components/HistoryFunds';
import globalStyles from '../../theme/global.scss';
import accountStyles from '../Account/index.scss';

type Props = {
  getProfileTariffsReducer: Object,
  getProfileReportReducer: Object,
  getProfileReducer: Object,
  getBalanceReducer: Object,
  payForReducer: Object,
  couponPayReducer: Object,
  changeProfileInfoReducer: Object,
  location: Object,
  fetchGetProfileTariffsIfNeeded: (monthly: ?string) => void,
  fetchGetProfileReportIfNeeded: (page: string) => void,
  fetchPayForIfNeeded: (amount: number) => void,
  fetchCouponPayIfNeeded: (code: string) => void,
  fetchChangeProfileInfoIfNeeded: (
    countryCode: number,
    firstName: string
  ) => void
};

const globalClassName = classNames.bind(globalStyles);

// Export this for unit testing more easily
export class Billing extends PureComponent<Props> {
  constructor(props) {
    super(props);
    const defaultCountry = countriesBillingConstants.filter(
      country => country.value === config.defaultCountry
    );
    this.state = {
      inputFunds: '',
      inputNameProfile: '',
      inputCoupon: '',
      currentPage: 1,
      isOpened: false,
      isFailed: false,
      isFullDataOfProfile: false,
      errorMessage: 'An unexpected error has occurred! Please try again later.',
      selectedCountry: defaultCountry[0]
    };
  }

  componentDidMount() {
    const {
      location,
      fetchGetProfileTariffsIfNeeded,
      fetchGetProfileReportIfNeeded
    } = this.props;
    fetchGetProfileTariffsIfNeeded();
    const { page } = queryString.parse(location.search);
    fetchGetProfileReportIfNeeded(page && page);
  }
  componentWillUpdate(nextProps) {
    const { getProfileReducer, changeProfileInfoReducer } = this.props;
    const { page } = queryString.parse(this.props.location.search);
    if (Number.isInteger(parseInt(page, 10))) {
      this.setState({
        currentPage: parseInt(page, 10)
      });
    }
    if (
      getProfileReducer.readyStatus !==
        nextProps.getProfileReducer.readyStatus &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      const dataProfile = nextProps.getProfileReducer.data.data;
      const countryCode = dataProfile ? dataProfile.country_code : null;
      const firstName = dataProfile ? dataProfile.first_name : null;
      if (countryCode && firstName) {
        this.setState({
          ...this.state,
          isFullDataOfProfile: true
        });
      } else {
        this.setState({
          ...this.state,
          isOpened: true
        });
      }
    }
    if (
      changeProfileInfoReducer.readyStatus !==
        nextProps.changeProfileInfoReducer.readyStatus &&
      nextProps.changeProfileInfoReducer.readyStatus ===
        CHANGE_PROFILE_INFO_SUCCESS
    ) {
      this.setState({
        ...this.state,
        isOpened: false
      });
    } else if (
      changeProfileInfoReducer.readyStatus !==
        nextProps.changeProfileInfoReducer.readyStatus &&
      nextProps.changeProfileInfoReducer.readyStatus ===
        CHANGE_PROFILE_INFO_FAILURE
    ) {
      this.setState({
        ...this.state,
        isFailed: true
      });
    }
  }
  handleChangeInputFunds = value => {
    const regexp = /^\d+(?:\.\d{0,2})?$|^$/;
    if (value.search(regexp) !== -1) {
      this.setState({
        ...this.state,
        inputFunds: value
      });
    }
  };
  handleChangeInputCode = value => {
    const regexp = /^[a-zA-Z0-9]{0,20}$|^$/;
    if (value.search(regexp) !== -1) {
      this.setState({
        ...this.state,
        inputCoupon: value.toUpperCase()
      });
    }
  };
  handleInputNameProfile = value => {
    this.setState({
      ...this.state,
      inputNameProfile: value,
      isFailed: false
    });
  };
  handleSelectCountry = name => {
    const filteredCountry = countriesBillingConstants.filter(
      country => country.name === name
    );
    this.setState({
      ...this.state,
      selectedCountry: filteredCountry[0]
    });
  };
  handleAddInformation = e => {
    e.preventDefault();
    const { inputNameProfile, selectedCountry } = this.state;
    this.props.fetchChangeProfileInfoIfNeeded(
      selectedCountry.billing_code,
      inputNameProfile
    );
  };
  handleOpenCloseModal = () => {
    this.setState({
      ...this.state,
      isOpened: !this.state.isOpened,
      inputNameProfile: '',
      isFailed: false
    });
  };
  handleSubmitPay = e => {
    e.preventDefault();
    this.props.fetchPayForIfNeeded(this.state.inputFunds);
  };
  handleSubmitPayCoupon = e => {
    e.preventDefault();
    this.props.fetchCouponPayIfNeeded(this.state.inputCoupon);
  };
  renderProfileSideBar = () => {
    const { getProfileTariffsReducer } = this.props;

    if (
      !getProfileTariffsReducer.readyStatus ||
      getProfileTariffsReducer.readyStatus === GET_PROFILE_TARIFFS_INVALID ||
      getProfileTariffsReducer.readyStatus === GET_PROFILE_TARIFFS_REQUESTING
    ) {
      return (
        <div>
          <img
            src={require('../../images/profile-sidebar-big.svg')}
            style={{ width: '100%' }}
            alt="sidebar"
          />
          {new Array(7)
            .fill()
            .map(() => (
              <img
                key={_.uniqueId()}
                src={require('../../images/profile-sidebar-small.svg')}
                style={{ marginTop: '25px', float: 'right' }}
                alt="sidebar"
              />
            ))}
          <img
            src={require('../../images/profile-sidebar-big.svg')}
            style={{ marginTop: '30px', width: '100%' }}
            alt="sidebar"
          />
          {new Array(4)
            .fill()
            .map(() => (
              <img
                key={_.uniqueId()}
                src={require('../../images/profile-sidebar-small.svg')}
                style={{ marginTop: '25px', float: 'right' }}
                alt="sidebar"
              />
            ))}
        </div>
      );
    }

    if (getProfileTariffsReducer.readyStatus === GET_PROFILE_TARIFFS_FAILURE) {
      return <p>Oops, Failed to load data of Billing!</p>;
    }

    return <ProfileSidebar type="billing" />;
  };

  renderProfileInfo = () => {
    const {
      getProfileTariffsReducer,
      getProfileReportReducer,
      getProfileReducer,
      getBalanceReducer,
      changeProfileInfoReducer
    } = this.props;

    if (
      !getProfileTariffsReducer.readyStatus ||
      getProfileTariffsReducer.readyStatus === GET_PROFILE_TARIFFS_INVALID ||
      getProfileTariffsReducer.readyStatus === GET_PROFILE_TARIFFS_REQUESTING ||
      (!getProfileReportReducer.readyStatus ||
        getProfileReportReducer.readyStatus === GET_PROFILE_REPORT_INVALID ||
        getProfileReportReducer.readyStatus ===
          GET_PROFILE_REPORT_REQUESTING) ||
      (!getProfileReducer.readyStatus ||
        getProfileReducer.readyStatus === GET_PROFILE_INVALID ||
        getProfileReducer.readyStatus === GET_PROFILE_REQUESTING) ||
      (!getBalanceReducer.readyStatus ||
        getBalanceReducer.readyStatus === GET_BALANCE_INVALID ||
        getBalanceReducer.readyStatus === GET_BALANCE_REQUESTING)
    ) {
      return (
        <img
          src={require('../../images/billing-main.svg')}
          style={{ marginTop: '28px', width: '100%' }}
          alt="billing"
        />
      );
    }

    if (
      getProfileTariffsReducer.readyStatus === GET_PROFILE_TARIFFS_FAILURE ||
      getProfileReportReducer.readyStatus === GET_PROFILE_REPORT_FAILURE ||
      getProfileReducer.readyStatus === GET_PROFILE_FAILURE ||
      getBalanceReducer.readyStatus === GET_BALANCE_FAILURE
    ) {
      return <p>Oops, Failed to load data of Billing!</p>;
    }

    const { is_active: isActive } = getProfileReducer.data;
    const { pages } = getProfileReportReducer.data;
    const { operations } = getProfileReportReducer.data;
    const {
      payForReducer
      // couponPayReducer
    } = this.props;
    const statusUser = isActive.toString() === 'true' ? 'Active' : 'Inactive';
    const balance = parseFloat(getBalanceReducer.data.balance);
    const monthUsage = parseFloat(getProfileTariffsReducer.data.monthly_cost);
    const dailyUsage = parseFloat(monthUsage / 30);
    let formatDateToActive = '';
    const dateNow = new Date();
    if (dailyUsage) {
      const activityDays = Math.floor(balance / dailyUsage);
      if (activityDays) {
        dateNow.setDate(dateNow.getDate() + activityDays);
        formatDateToActive = dateFormat(dateNow, 'dd/mm/yyyy');
      }
    }

    const containerClassName = globalClassName(
      'contentBlockContainer',
      'containerFluid'
    );

    return (
      <div className={`${containerClassName} container`}>
        <BillingInfo
          statusUser={statusUser}
          balance={balance}
          monthUsage={monthUsage}
          dailyUsage={dailyUsage}
          formatDateToActive={formatDateToActive}
        />
        <AddFunds
          isFetching={payForReducer.isFetching}
          changeProfile={changeProfileInfoReducer.readyStatus}
          isFullDataOfProfile={this.state.isFullDataOfProfile}
          handleClickAddFunds={this.handleOpenCloseModal}
          inputFunds={this.state.inputFunds}
          handleChangeInputFunds={value => this.handleChangeInputFunds(value)}
          handleSubmitPay={e => this.handleSubmitPay(e)}
        />
        {/* <Coupon */}
        {/* isFetching={couponPayReducer.isFetching} */}
        {/* inputCoupon={this.state.inputCoupon} */}
        {/* handleChangeInputCode={value => this.handleChangeInputCode(value)} */}
        {/* handleSubmitPayCoupon={e => this.handleSubmitPayCoupon(e)} */}
        {/* /> */}
        <HistoryFunds
          operations={operations}
          countPages={pages}
          currentPage={this.state.currentPage}
        />
      </div>
    );
  };

  render() {
    const {
      payForReducer,
      couponPayReducer,
      changeProfileInfoReducer
    } = this.props;
    const {
      selectedCountry,
      isOpened,
      inputNameProfile,
      isFailed,
      errorMessage
    } = this.state;

    const containerClassNameSidebar = globalClassName(
      'contentBlockContainer',
      'containerFluid',
      'containerNoBackground'
    );

    return (
      <div>
        <Helmet title="Billing" />
        <Notification
          status={payForReducer.status}
          name="Account"
          errorMessage={payForReducer.err}
        />
        <Notification
          status={couponPayReducer.status}
          name={couponPayReducer.code}
          errorMessage={couponPayReducer.err}
        />
        <AddInformationModal
          data={countriesBillingConstants}
          selectedCountry={selectedCountry}
          isOpened={isOpened}
          handleInputName={this.handleInputNameProfile}
          inputValue={inputNameProfile}
          handleSelectCountry={this.handleSelectCountry}
          onHandleAddInformation={e => this.handleAddInformation(e)}
          handleOpenCloseModal={this.handleOpenCloseModal}
          isLoading={changeProfileInfoReducer.isFetching}
          isFailed={isFailed}
          errorMessage={errorMessage}
        />
        <div className={globalStyles.contentBlock}>
          <div
            className={`container ${
              globalStyles.containerNoBackground
            } pl-0 pr-0`}
          >
            <div className="row double two-columns">
              <div className="col-md-3 col-lg-3 col-xl-2">
                <div
                  className={`${globalStyles.contentBlock} ${
                    accountStyles.accountInfo
                  }`}
                >
                  <div
                    className={`${containerClassNameSidebar} container pl-0 pr-0`}
                  >
                    {this.renderProfileSideBar()}
                  </div>
                </div>
              </div>
              <div className="col-md-9 col-lg-9 col-xl-10">
                <div className={globalStyles.contentBlock}>
                  {this.renderProfileInfo()}
                </div>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getProfileTariffsReducer,
    getProfileReportReducer,
    getProfileReducer,
    getBalanceReducer,
    payForReducer,
    couponPayReducer,
    changeProfileInfoReducer
  }: ReduxState) => ({
    getProfileTariffsReducer,
    getProfileReportReducer,
    getProfileReducer,
    getBalanceReducer,
    payForReducer,
    couponPayReducer,
    changeProfileInfoReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetProfileTariffsIfNeeded: (monthly: ?string = 1) =>
      dispatch(actionGetTariffsProfile.fetchGetProfileTariffsIfNeeded(monthly)),
    fetchGetProfileReportIfNeeded: (page: string = 1) =>
      dispatch(actionGetReportProfile.fetchGetProfileReportIfNeeded(page)),
    fetchPayForIfNeeded: (amount: number) =>
      dispatch(actionPayFor.fetchPayForIfNeeded(amount)),
    fetchCouponPayIfNeeded: (code: string) =>
      dispatch(actionCouponPay.fetchCouponPayIfNeeded(code)),
    fetchChangeProfileInfoIfNeeded: (countryCode: number, firstName: string) =>
      dispatch(
        actionChangeProfileInfo.fetchChangeProfileInfoIfNeeded(
          countryCode,
          firstName
        )
      )
  })
);

export default connector(Billing);
