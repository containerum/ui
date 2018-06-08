/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';
import className from 'classnames/bind';

import * as actionGetNamespacesTariffs from '../../actions/namespacesActions/getNamespacesTariffs';
import * as actionCreateNamespace from '../../actions/namespaceActions/createNamespace';
import * as actionChangeProfileInfo from '../../actions/profileActions/changeProfileInfo';
import countriesBillingConstants from '../../constants/countriesBillingConstants';
import {
  GET_NAMESPACES_TARIFFS_INVALID,
  GET_NAMESPACES_TARIFFS_REQUESTING,
  GET_NAMESPACES_TARIFFS_FAILURE
} from '../../constants/namespacesConstants/getNamespacesTariffs';
import { CREATE_NAMESPACE_REQUESTING } from '../../constants/namespaceConstants/createNamespace';
import type {
  Namespaces as NamespacesType,
  Dispatch,
  ReduxState
} from '../../types';
import config from '../../config';
import TariffsNamespacesList from '../../components/TariffsNamespacesList';
import CreateModal from '../../components/CustomerModal/CreateModal';
import AddInformationModal from '../../components/CustomerModal/AddInformationModal';
import Notification from '../Notification';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';
import {
  CHANGE_PROFILE_INFO_FAILURE,
  CHANGE_PROFILE_INFO_SUCCESS
} from '../../constants/profileConstants/changeProfileInfo';

import globalStyles from '../../theme/global.scss';
import styles from './index.scss';

const globalClass = className.bind(globalStyles);

const containerClassName = globalClass(
  'contentBlockContainer',
  'container',
  'containerNoBackground',
  'paddingX0'
);

type Props = {
  getNamespacesTariffsReducer: NamespacesType,
  createNamespaceReducer: Object,
  changeProfileInfoReducer: Object,
  getProfileReducer: Object,
  fetchGetNamespacesTariffsIfNeeded: () => void,
  fetchCreateNamespaceIfNeeded: (
    idName: string,
    tariff: string,
    price: string
  ) => void,
  fetchChangeProfileInfoIfNeeded: (
    countryCode: number,
    firstName: string
  ) => void
};

// Export this for unit testing more easily
export class CreateNamespace extends PureComponent<Props> {
  constructor() {
    super();
    const defaultCountry = countriesBillingConstants.filter(
      country => country.value === config.defaultCountry
    );
    this.state = {
      isOpened: false,
      Name: '',
      NSTariffId: null,
      NSTariffName: null,
      NSTariffCpu: null,
      NSTariffMemory: null,
      // NSTariffVolume: null,
      NSTariffPrice: null,
      NSTariffPricePerDay: null,
      inputNameProfile: '',
      isOpenedAddInfo: false,
      isFailed: false,
      isFullDataOfProfile: false,
      errorMessage: 'An unexpected error has occurred! Please try again later.',
      selectedCountry: defaultCountry[0]
    };
  }
  componentDidMount() {
    this.props.fetchGetNamespacesTariffsIfNeeded();
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

  handleSelectTariff = tariff => {
    const {
      id,
      label,
      cpuLimit,
      memoryLimit,
      // volumeSize,
      price,
      pricePerDay
    } = tariff;
    this.setState({
      ...this.state,
      isOpened: true,
      NSTariffId: id,
      NSTariffName: label,
      NSTariffCpu: cpuLimit,
      NSTariffMemory: memoryLimit,
      // NSTariffVolume: volumeSize,
      NSTariffPrice: price,
      NSTariffPricePerDay: pricePerDay
    });
  };

  renderTariffsNamespacesList = () => {
    const {
      getNamespacesTariffsReducer,
      createNamespaceReducer,
      changeProfileInfoReducer
    } = this.props;
    if (
      !getNamespacesTariffsReducer.readyStatus ||
      getNamespacesTariffsReducer.readyStatus ===
        GET_NAMESPACES_TARIFFS_INVALID ||
      getNamespacesTariffsReducer.readyStatus ===
        GET_NAMESPACES_TARIFFS_REQUESTING ||
      createNamespaceReducer.readyStatus === CREATE_NAMESPACE_REQUESTING
    ) {
      return (
        <div className="row">
          {new Array(8).fill().map(() => (
            <div key={_.uniqueId()} className="col-md-3">
              <div className={styles.namespacePlanBlockPlaceholder}>
                <img
                  src={require('../../images/add-ns-block.svg')}
                  alt="add-ns"
                />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (
      getNamespacesTariffsReducer.readyStatus === GET_NAMESPACES_TARIFFS_FAILURE
    ) {
      return <p>Oops, Failed to load data of Projects!</p>;
    }

    return (
      <TariffsNamespacesList
        data={this.props.getNamespacesTariffsReducer.data}
        NSTariffName={this.state.NSTariffName}
        handleSelectTariff={tariff => this.handleSelectTariff(tariff)}
        changeProfile={changeProfileInfoReducer.readyStatus}
        isFullDataOfProfile={this.state.isFullDataOfProfile}
        handleClickSelectTariff={this.handleOpenCloseAddInfoModal}
      />
    );
  };

  render() {
    const {
      createNamespaceReducer,
      fetchCreateNamespaceIfNeeded,
      changeProfileInfoReducer
    } = this.props;
    const {
      NSTariffId,
      NSTariffName,
      Name,
      NSTariffCpu,
      NSTariffMemory,
      // NSTariffVolume,
      NSTariffPrice,
      NSTariffPricePerDay,
      isOpened,
      selectedCountry,
      isOpenedAddInfo,
      inputNameProfile,
      isFailed,
      errorMessage
    } = this.state;
    const { status, idName, method, err } = createNamespaceReducer;
    // console.log(this.state);
    return (
      <div>
        <Notification
          status={status}
          name={idName}
          method={method}
          errorMessage={err}
        />
        <CreateModal
          type="Project"
          tariff={NSTariffName}
          id={NSTariffId}
          name={Name}
          data={{
            cpu: NSTariffCpu,
            memory: NSTariffMemory,
            // volume: NSTariffVolume,
            price: NSTariffPrice,
            pricePerDay: NSTariffPricePerDay
          }}
          isOpened={isOpened}
          handleInputName={this.handleInputName}
          handleOpenCloseModal={this.handleOpenCloseModal}
          onHandleCreate={fetchCreateNamespaceIfNeeded}
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
        <Helmet title="Create Project" />
        <div className={globalStyles.contentBlock}>
          <div className={`${containerClassName} mt-0 container`}>
            <div className={`${globalStyles.contentBlockContent} mt-0`}>
              <div className={`${styles.namespacePlan} mt-0`}>
                <div className={styles.namespacePlanTitle}>
                  choose a project size
                </div>
              </div>
              {this.renderTariffsNamespacesList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getNamespacesTariffsReducer,
    createNamespaceReducer,
    changeProfileInfoReducer,
    getProfileReducer
  }: ReduxState) => ({
    getNamespacesTariffsReducer,
    createNamespaceReducer,
    changeProfileInfoReducer,
    getProfileReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetNamespacesTariffsIfNeeded: () =>
      dispatch(actionGetNamespacesTariffs.fetchGetNamespacesTariffsIfNeeded()),
    fetchCreateNamespaceIfNeeded: (
      idName: string,
      tariff: string,
      price: string
    ) =>
      dispatch(
        actionCreateNamespace.fetchCreateNamespaceIfNeeded(
          idName,
          tariff,
          price
        )
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

export default connector(CreateNamespace);
