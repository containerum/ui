/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';

import * as actionGetVolumesTariffs from '../../actions/volumesActions/getVolumesTariffs';
import * as actionCreateVolume from '../../actions/volumeActions/createVolume';
import * as actionChangeProfileInfo from '../../actions/profileActions/changeProfileInfo';
import countriesBillingConstants from '../../constants/countriesBillingConstants';
import {
  GET_VOLUMES_TARIFFS_INVALID,
  GET_VOLUMES_TARIFFS_REQUESTING,
  GET_VOLUMES_TARIFFS_FAILURE
} from '../../constants/volumesConstants/getVolumesTariffs';
import { CREATE_VOLUME_REQUESTING } from '../../constants/volumeConstants/createVolume';
import {
  CHANGE_PROFILE_INFO_FAILURE,
  CHANGE_PROFILE_INFO_SUCCESS
} from '../../constants/profileConstants/changeProfileInfo';
import type { Volumes as VolumesType, Dispatch, ReduxState } from '../../types';
import TariffsVolumesList from '../../components/TariffsVolumesList';
import CreateModal from '../../components/CustomerModal/CreateModal';
import AddInformationModal from '../../components/CustomerModal/AddInformationModal';
import Notification from '../Notification';
import config from '../../config';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';
import globalStyles from '../../theme/global.scss';

type Props = {
  getVolumesTariffsReducer: VolumesType,
  createVolumeReducer: Object,
  changeProfileInfoReducer: Object,
  getProfileReducer: Object,
  fetchGetVolumesTariffsIfNeeded: () => void,
  fetchCreateVolumeIfNeeded: (
    idVol: string,
    tariff: string,
    price: string
  ) => void,
  fetchChangeProfileInfoIfNeeded: (
    countryCode: number,
    firstName: string
  ) => void
};

// Export this for unit testing more easily
export class CreateVolume extends PureComponent<Props> {
  constructor() {
    super();
    const defaultCountry = countriesBillingConstants.filter(
      country => country.value === config.defaultCountry
    );
    this.state = {
      isOpened: false,
      Name: '',
      VolTariffName: null,
      VolTariffVolume: null,
      VolTariffPrice: null,
      VolTariffStorageLimit: null,
      VolTariffPricePerDay: null,
      inputNameProfile: '',
      isOpenedAddInfo: false,
      isFailed: false,
      isFullDataOfProfile: false,
      errorMessage: 'An unexpected error has occurred! Please try again later.',
      selectedCountry: defaultCountry[0]
    };
  }
  componentDidMount() {
    this.props.fetchGetVolumesTariffsIfNeeded();
  }
  componentWillUpdate(nextProps) {
    const { getProfileReducer, changeProfileInfoReducer } = this.props;
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
          isOpenedAddInfo: true
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
        isOpenedAddInfo: false
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
  handleInputName = Name => {
    this.setState({
      ...this.state,
      Name
    });
  };
  handleOpenCloseModal = () => {
    this.setState({
      ...this.state,
      isOpened: !this.state.isOpened,
      Name: ''
    });
  };
  handleSelectTariff = tariff => {
    const { label, volumeSize, price, storageLimit, pricePerDay } = tariff;
    this.setState({
      ...this.state,
      isOpened: true,
      VolTariffName: label,
      VolTariffVolume: volumeSize,
      VolTariffPrice: price,
      VolTariffStorageLimit: storageLimit,
      VolTariffPricePerDay: pricePerDay
    });
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
  handleOpenCloseAddInfoModal = () => {
    this.setState({
      ...this.state,
      isOpenedAddInfo: !this.state.isOpenedAddInfo,
      inputNameProfile: '',
      isFailed: false
    });
  };

  renderTariffsVolumesList = () => {
    const {
      getVolumesTariffsReducer,
      createVolumeReducer,
      changeProfileInfoReducer
    } = this.props;
    // console.log(getVolumesTariffsReducer);
    if (
      !getVolumesTariffsReducer.readyStatus ||
      getVolumesTariffsReducer.readyStatus === GET_VOLUMES_TARIFFS_INVALID ||
      getVolumesTariffsReducer.readyStatus === GET_VOLUMES_TARIFFS_REQUESTING ||
      createVolumeReducer.readyStatus === CREATE_VOLUME_REQUESTING
    ) {
      return (
        <div className="row">
          {new Array(8).fill().map(() => (
            <div key={_.uniqueId()} className="col-md-3">
              <div className="namespace-plan-block-placeholder">
                <img
                  src={require('../../images/add-vol-block.svg')}
                  style={{ width: '104%' }}
                  alt="add-vol"
                />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (getVolumesTariffsReducer.readyStatus === GET_VOLUMES_TARIFFS_FAILURE) {
      return <p>Oops, Failed to load data of Volume!</p>;
    }

    return (
      <TariffsVolumesList
        data={this.props.getVolumesTariffsReducer.data}
        VolTariffName={this.state.VolTariffName}
        handleSelectTariff={tariff => this.handleSelectTariff(tariff)}
        changeProfile={changeProfileInfoReducer.readyStatus}
        isFullDataOfProfile={this.state.isFullDataOfProfile}
        handleClickSelectTariff={this.handleOpenCloseAddInfoModal}
      />
    );
  };

  render() {
    const {
      createVolumeReducer,
      fetchCreateVolumeIfNeeded,
      changeProfileInfoReducer
    } = this.props;
    const {
      VolTariffName,
      Name,
      VolTariffVolume,
      VolTariffPrice,
      VolTariffPricePerDay,
      VolTariffStorageLimit,
      isOpened,
      selectedCountry,
      isOpenedAddInfo,
      inputNameProfile,
      isFailed,
      errorMessage
    } = this.state;
    const { status, idVol, method, err } = createVolumeReducer;
    return (
      <div>
        <Notification
          status={status}
          name={idVol}
          method={method}
          errorMessage={err}
        />
        <CreateModal
          type="Volume"
          tariff={VolTariffName}
          name={Name}
          data={{
            volume: VolTariffVolume,
            price: VolTariffPrice,
            storageLimit: VolTariffStorageLimit,
            pricePerDay: VolTariffPricePerDay
          }}
          isOpened={isOpened}
          handleInputName={this.handleInputName}
          handleOpenCloseModal={this.handleOpenCloseModal}
          onHandleCreate={fetchCreateVolumeIfNeeded}
        />
        <AddInformationModal
          data={countriesBillingConstants}
          selectedCountry={selectedCountry}
          isOpened={isOpenedAddInfo}
          handleInputName={this.handleInputNameProfile}
          inputValue={inputNameProfile}
          handleSelectCountry={this.handleSelectCountry}
          onHandleAddInformation={e => this.handleAddInformation(e)}
          handleOpenCloseModal={this.handleOpenCloseAddInfoModal}
          isLoading={changeProfileInfoReducer.isFetching}
          isFailed={isFailed}
          errorMessage={errorMessage}
        />
        <Helmet title="Create Volume" />
        <div className={globalStyles.contentBlock}>
          <div className="content-block-container container no-back mt-0 no-padding">
            <div className="content-block-content mt-0">
              <div className="namespace-plan mt-0">
                <div className="namespace-plan-title">choose a volume size</div>
                {this.renderTariffsVolumesList()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getVolumesTariffsReducer,
    createVolumeReducer,
    changeProfileInfoReducer,
    getProfileReducer
  }: ReduxState) => ({
    getVolumesTariffsReducer,
    createVolumeReducer,
    changeProfileInfoReducer,
    getProfileReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetVolumesTariffsIfNeeded: () =>
      dispatch(actionGetVolumesTariffs.fetchGetVolumesTariffsIfNeeded()),
    fetchCreateVolumeIfNeeded: (idVol: string, tariff: string, price: string) =>
      dispatch(
        actionCreateVolume.fetchCreateVolumeIfNeeded(idVol, tariff, price)
      ),
    fetchChangeProfileInfoIfNeeded: (countryCode: number, firstName: string) =>
      dispatch(
        actionChangeProfileInfo.fetchChangeProfileInfoIfNeeded(
          countryCode,
          firstName
        )
      )
  })
);

export default connector(CreateVolume);
