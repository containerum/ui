/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import className from 'classnames/bind';
import _ from 'lodash/fp';
import cookie from 'react-cookies';

import { routerLinks } from '../../config';
import {
  GET_DOMAINS_INVALID,
  GET_DOMAINS_REQUESTING,
  GET_DOMAINS_FAILURE
} from '../../constants/domainsConstants/getDomains';
import * as actionGetDomains from '../../actions/domainsActions/getDomains';
import * as actionDeleteDomain from '../../actions/domainActions/deleteDomain';
import * as actionAddDomain from '../../actions/domainActions/addDomain';
import * as actionGetStorages from '../../actions/storagesActions/getStorages';
import * as actionAddStorage from '../../actions/storageActions/addStorage';
import * as actionDeleteStorage from '../../actions/storageActions/deleteStorage';
import type { Dispatch, ReduxState } from '../../types';
import Notification from '../Notification';
import ProfileSidebar from '../../components/ProfileSidebar';
import SettingsViewList from '../../components/SettingsViewList';
import StoragesViewList from '../../components/StoragesViewList';
import InputControl from '../../components/InputControl';
import LoadButton from '../../components/LoadButton';
import globalStyles from '../../theme/global.scss';
import accountStyles from '../Account/index.scss';
import { DELETE_DOMAIN_SUCCESS } from '../../constants/domainConstants/deleteDomain';
import { ADD_DOMAIN_SUCCESS } from '../../constants/domainConstants/addDomain';
import inputStyles from '../../components/InputControl/index.scss';
import buttonsStyles from '../../theme/buttons.scss';
import {
  GET_STORAGES_FAILURE,
  GET_STORAGES_INVALID,
  GET_STORAGES_REQUESTING
} from '../../constants/storagesConstants/getStorages';
import { ADD_STORAGE_SUCCESS } from '../../constants/storageConstants/addStorage';
import { DELETE_STORAGE_SUCCESS } from '../../constants/storageConstants/deleteStorage';

const globalClass = className.bind(globalStyles);
const containerClassName = globalClass(
  'contentBlockContainer',
  'containerCard'
);
const containerClassNameSidebar = globalClass(
  'contentBlockContainer',
  'containerFluid',
  'containerNoBackground'
);
const formClassName = globalClass('formInputText', 'formControl');

type Props = {
  history: Object,
  getDomainsReducer: Object,
  deleteDomainReducer: Object,
  addDomainReducer: Object,
  getStoragesReducer: Object,
  addStorageReducer: Object,
  deleteStorageReducer: Object,
  fetchGetDomainsIfNeeded: () => void,
  fetchDeleteDomainIfNeeded: (id: string, ip: string) => void,
  fetchAddDomainIfNeeded: (id: Array) => void,
  fetchGetStoragesIfNeeded: () => void,
  fetchAddStorageIfNeeded: (data: Object) => void,
  fetchDeleteStorageIfNeeded: (name: string) => void
};

export class Settings extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      ip: '',
      name: '',
      used: 1,
      size: 1
    };
  }
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentDidMount() {
    const { fetchGetDomainsIfNeeded, fetchGetStoragesIfNeeded } = this.props;
    fetchGetDomainsIfNeeded();
    fetchGetStoragesIfNeeded();
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.deleteDomainReducer.readyStatus !==
        nextProps.deleteDomainReducer.readyStatus &&
      nextProps.deleteDomainReducer.readyStatus === DELETE_DOMAIN_SUCCESS
    ) {
      this.props.fetchGetDomainsIfNeeded();
    }
    if (
      this.props.deleteStorageReducer.readyStatus !==
        nextProps.deleteStorageReducer.readyStatus &&
      nextProps.deleteStorageReducer.readyStatus === DELETE_STORAGE_SUCCESS
    ) {
      this.props.fetchGetStoragesIfNeeded();
    }
    if (
      this.props.addDomainReducer.readyStatus !==
        nextProps.addDomainReducer.readyStatus &&
      nextProps.addDomainReducer.readyStatus === ADD_DOMAIN_SUCCESS
    ) {
      this.setState(
        {
          ...this.state,
          ip: ''
        },
        () => this.props.fetchGetDomainsIfNeeded()
      );
    }
    if (
      this.props.addStorageReducer.readyStatus !==
        nextProps.addStorageReducer.readyStatus &&
      nextProps.addStorageReducer.readyStatus === ADD_STORAGE_SUCCESS
    ) {
      this.setState(
        {
          ...this.state,
          name: '',
          used: 1,
          size: 1
        },
        () => this.props.fetchGetStoragesIfNeeded()
      );
    }
  }

  handleDeleteIP = (id, ip) => {
    this.props.fetchDeleteDomainIfNeeded(id, ip);
  };
  handleDeleteStorage = name => {
    this.props.fetchDeleteStorageIfNeeded(name);
  };
  handleChangeNumberInput = (value, type) => {
    let regexp = /^[0-9][0-9.]*$|^$/;
    if (type === 'name') {
      regexp = /^[-._a-zA-Z0-9]+$|^$/;
    }
    if (value.search(regexp) !== -1) {
      this.setState({
        ...this.state,
        [type]: value
      });
    }
  };
  handleSubmitAddIP = e => {
    e.preventDefault();
    this.props.fetchAddDomainIfNeeded([this.state.ip]);
  };
  handleSubmitAddStorage = e => {
    e.preventDefault();
    this.props.fetchAddStorageIfNeeded(this.state);
  };

  renderProfileSideBar = () => {
    const { getDomainsReducer } = this.props;

    if (
      !getDomainsReducer.readyStatus ||
      getDomainsReducer.readyStatus === GET_DOMAINS_INVALID ||
      getDomainsReducer.readyStatus === GET_DOMAINS_REQUESTING
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

    return <ProfileSidebar type="settings" />;
  };
  renderIP = () => {
    const { getDomainsReducer, addDomainReducer } = this.props;

    if (
      !getDomainsReducer.readyStatus ||
      getDomainsReducer.readyStatus === GET_DOMAINS_INVALID ||
      getDomainsReducer.readyStatus === GET_DOMAINS_REQUESTING
    ) {
      return (
        <img
          src={require('../../images/billing-main.svg')}
          style={{ marginTop: '28px', width: '100%' }}
          alt="billing"
        />
      );
    }

    if (getDomainsReducer.readyStatus === GET_DOMAINS_FAILURE) {
      return <p>Oops, Failed to load data of Settings!</p>;
    }

    return (
      <div>
        <SettingsViewList
          getDomainsReducer={getDomainsReducer.data}
          handleDeleteIP={this.handleDeleteIP}
        />
        <form
          style={{ marginTop: 30 }}
          onSubmit={this.handleSubmitAddIP}
          className={globalStyles.blockItem}
          id="addIP"
        >
          <div className={globalStyles.blockItemTitle}>Add IP</div>
          <div className="row">
            <div className="col-md-4">
              <InputControl
                value={this.state.ip}
                id="domain"
                type="text"
                pattern="^[0-9][0-9.]*$"
                required
                title="Example: 192.168.88.210"
                baseClassName={`${formClassName} ${inputStyles.inputCustom}`}
                baseClassNameLabel={`${globalStyles.formGroupLabel} ${this.state
                  .ip && globalStyles.formGroupLabelOnFocus}`}
                labelText="IP"
                baseClassNameHelper={globalStyles.formGroupHelper}
                handleChangeInput={e =>
                  this.handleChangeNumberInput(e.target.value, 'ip')
                }
              />
            </div>
          </div>
          <div
            style={{
              textAlign: 'center'
            }}
          >
            <LoadButton
              type="submit"
              buttonText="Add IP"
              isFetching={addDomainReducer.isFetching}
              baseClassButton={`${buttonsStyles.buttonUIFeedbackSubmit} btn`}
              disabled={addDomainReducer.isFetching}
              style={{
                width: 235,
                display: 'inline-block',
                marginTop: 40
              }}
            />
          </div>
        </form>
      </div>
    );
  };
  renderStorageClass = () => {
    const { getStoragesReducer, addStorageReducer } = this.props;

    if (
      !getStoragesReducer.readyStatus ||
      getStoragesReducer.readyStatus === GET_STORAGES_INVALID ||
      getStoragesReducer.readyStatus === GET_STORAGES_REQUESTING
    ) {
      return (
        <img
          src={require('../../images/billing-main.svg')}
          style={{ marginTop: '28px', width: '100%' }}
          alt="billing"
        />
      );
    }

    if (getStoragesReducer.readyStatus === GET_STORAGES_FAILURE) {
      return <p>Oops, Failed to load data of Settings!</p>;
    }

    return (
      <div>
        <StoragesViewList
          getStoragesReducer={getStoragesReducer.data}
          handleDeleteStorage={this.handleDeleteStorage}
        />
        <form
          style={{ marginTop: 30 }}
          onSubmit={this.handleSubmitAddStorage}
          className={globalStyles.blockItem}
          id="addStorage"
        >
          <div className={globalStyles.blockItemTitle}>Add Storage</div>
          <div className="row">
            <div className="col-md-4">
              <InputControl
                value={this.state.name}
                id="name"
                type="text"
                pattern="^[-._a-zA-Z0-9]+$"
                required
                title="Example: gluster-heketi"
                baseClassName={`${formClassName} ${inputStyles.inputCustom}`}
                baseClassNameLabel={`${globalStyles.formGroupLabel} ${this.state
                  .name && globalStyles.formGroupLabelOnFocus}`}
                labelText="Name"
                baseClassNameHelper={globalStyles.formGroupHelper}
                handleChangeInput={e =>
                  this.handleChangeNumberInput(e.target.value, 'name')
                }
              />
            </div>
            <div className="col-md-4">
              <InputControl
                value={this.state.size}
                id="size"
                type="number"
                pattern="^[0-9][0-9.]*$"
                min={1}
                required
                title="Example: 7"
                baseClassName={`${formClassName} ${inputStyles.inputCustom}`}
                baseClassNameLabel={`${globalStyles.formGroupLabel} ${this.state
                  .size && globalStyles.formGroupLabelOnFocus}`}
                labelText="Size"
                baseClassNameHelper={globalStyles.formGroupHelper}
                handleChangeInput={e =>
                  this.handleChangeNumberInput(e.target.value, 'size')
                }
              />
            </div>
            {/* <div className="col-md-4"> */}
            {/* <InputControl */}
            {/* value={this.state.used} */}
            {/* id="used" */}
            {/* type="number" */}
            {/* pattern="^[0-9][0-9.]*$" */}
            {/* min={1} */}
            {/* required */}
            {/* title="Example: 100" */}
            {/* baseClassName={`${formClassName} ${inputStyles.inputCustom}`} */}
            {/* baseClassNameLabel={`${globalStyles.formGroupLabel} ${this.state */}
            {/* .used && globalStyles.formGroupLabelOnFocus}`} */}
            {/* labelText="Used" */}
            {/* baseClassNameHelper={globalStyles.formGroupHelper} */}
            {/* handleChangeInput={e => */}
            {/* this.handleChangeNumberInput(e.target.value, 'used') */}
            {/* } */}
            {/* /> */}
            {/* </div> */}
          </div>
          <div
            style={{
              textAlign: 'center'
            }}
          >
            <LoadButton
              type="submit"
              buttonText="Add Storage"
              isFetching={addStorageReducer.isFetching}
              baseClassButton={`${buttonsStyles.buttonUIFeedbackSubmit} btn`}
              disabled={addStorageReducer.isFetching}
              style={{
                width: 235,
                display: 'inline-block',
                marginTop: 40
              }}
            />
          </div>
        </form>
      </div>
    );
  };

  render() {
    const { deleteDomainReducer, addDomainReducer } = this.props;
    const {
      status: statusDelete,
      method: methodDelete,
      ips: ipDelete,
      err: errDelete
    } = deleteDomainReducer;
    const {
      status: statusAdd,
      method: methodAdd,
      ips: ipAdd,
      err: errAdd
    } = addDomainReducer;
    return (
      <div>
        <Helmet title="Settings" />
        <Notification
          status={statusDelete}
          name={ipDelete}
          method={methodDelete}
          errorMessage={errDelete}
        />
        <Notification
          status={statusAdd}
          name={ipAdd}
          method={methodAdd}
          errorMessage={errAdd}
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
                  <div className={`${containerClassName} container`}>
                    {this.renderIP()}
                    {this.renderStorageClass()}
                  </div>
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
    getDomainsReducer,
    deleteDomainReducer,
    addDomainReducer,
    getStoragesReducer,
    addStorageReducer,
    deleteStorageReducer
  }: ReduxState) => ({
    getDomainsReducer,
    deleteDomainReducer,
    addDomainReducer,
    getStoragesReducer,
    addStorageReducer,
    deleteStorageReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetDomainsIfNeeded: () =>
      dispatch(actionGetDomains.fetchGetDomainsIfNeeded()),
    fetchDeleteDomainIfNeeded: (id: string, ip: string) =>
      dispatch(actionDeleteDomain.fetchDeleteDomainIfNeeded(id, ip)),
    fetchAddDomainIfNeeded: (ip: Array) =>
      dispatch(actionAddDomain.fetchAddDomainIfNeeded(ip)),
    fetchGetStoragesIfNeeded: () =>
      dispatch(actionGetStorages.fetchGetStoragesIfNeeded()),
    fetchAddStorageIfNeeded: (data: Object) =>
      dispatch(actionAddStorage.fetchAddStorageIfNeeded(data)),
    fetchDeleteStorageIfNeeded: (name: string) =>
      dispatch(actionDeleteStorage.fetchDeleteStorageIfNeeded(name))
  })
);

export default connector(Settings);
