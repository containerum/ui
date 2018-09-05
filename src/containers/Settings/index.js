/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import className from 'classnames/bind';
import _ from 'lodash/fp';
import cookie from 'react-cookies';
import Tooltip from 'rc-tooltip';
import { Scrollbars } from 'react-custom-scrollbars';
import JSONPretty from 'react-json-pretty';
import cloneDeep from 'clone-deep';

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
import * as actionGetStatus from '../../actions/statusActions/getStatus';
import getImportLogs from '../../functions/WS/getImportLogs';
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
import configmapStyles from '../../containers/ConfigMaps/index.scss';
import podStyles from '../../containers/Pod/index.scss';
import {
  GET_STORAGES_FAILURE,
  GET_STORAGES_INVALID,
  GET_STORAGES_REQUESTING
} from '../../constants/storagesConstants/getStorages';
import {
  GET_STATUS_FAILURE,
  GET_STATUS_INVALID,
  GET_STATUS_REQUESTING
} from '../../constants/statusConstants/getStatus';
import { ADD_STORAGE_SUCCESS } from '../../constants/storageConstants/addStorage';
import { DELETE_STORAGE_SUCCESS } from '../../constants/storageConstants/deleteStorage';
import {
  GET_PROFILE_FAILURE,
  GET_PROFILE_INVALID,
  GET_PROFILE_REQUESTING,
  GET_PROFILE_SUCCESS
} from '../../constants/profileConstants/getProfile';
import successImg from '../../images/success.svg';
import warningImg from '../../images/warning.svg';

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

const itemClassName = globalClass(
  'blockItemTokensTable',
  'contentBlockTable',
  'table'
);
const containerClassNameTable = globalClass(
  'contentBlcokContainer',
  'containerCard',
  'hoverAction'
);

type Props = {
  history: Object,
  getProfileReducer: Object,
  getDomainsReducer: Object,
  deleteDomainReducer: Object,
  addDomainReducer: Object,
  getStoragesReducer: Object,
  addStorageReducer: Object,
  deleteStorageReducer: Object,
  getStatusReducer: Object,
  fetchGetDomainsIfNeeded: () => void,
  fetchDeleteDomainIfNeeded: (id: string, ip: string) => void,
  fetchAddDomainIfNeeded: (id: Array) => void,
  fetchGetStoragesIfNeeded: () => void,
  fetchAddStorageIfNeeded: (data: Object) => void,
  fetchDeleteStorageIfNeeded: (name: string) => void,
  fetchGetStatusIfNeeded: () => void
};

export class Settings extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      ip: '',
      name: '',
      used: 1,
      size: 1,
      errorMessage: '',
      logs: []
    };
  }
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentWillUpdate(nextProps) {
    const {
      fetchGetDomainsIfNeeded,
      fetchGetStoragesIfNeeded,
      fetchGetStatusIfNeeded,
      history
    } = this.props;
    if (
      this.props.getProfileReducer.readyStatus !==
        nextProps.getProfileReducer.readyStatus &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      if (nextProps.getProfileReducer.data.role === 'admin') {
        fetchGetDomainsIfNeeded();
        fetchGetStoragesIfNeeded();
        fetchGetStatusIfNeeded();
      } else {
        history.push(routerLinks.namespaces);
      }
    }
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
  componentWillUnmount() {
    if (this.clientSocket) {
      this.clientSocket.close();
    }
    if (
      typeof window !== 'undefined' &&
      typeof window.document !== 'undefined'
    ) {
      document.removeEventListener('keydown', e => this._handleKeyPress(e));
    }
  }

  onMessageFailure = () => {
    this.setState({
      ...this.state,
      errorMessage: 'Failed to connect to server'
    });
  };
  onMessageReceived = data => {
    const nextLogs = cloneDeep(this.state.logs);
    nextLogs.push(data);
    this.setState({ ...this.state, logs: nextLogs });
  };
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
  handleClickImportLogs = () => {
    this.clientSocket = getImportLogs();
    if (this.clientSocket) {
      this.clientSocket.onerror = () => this.onMessageFailure();
      this.clientSocket.onmessage = evt => {
        const resultString = JSON.parse(evt.data);
        // console.log(resultString);
        this.onMessageReceived(resultString);
      };
    } else {
      this.clientSocket.onerror = () => this.onMessageFailure();
    }
  };

  renderProfileSideBar = () => {
    const { getDomainsReducer, getProfileReducer } = this.props;

    if (
      !getDomainsReducer.readyStatus ||
      getDomainsReducer.readyStatus === GET_DOMAINS_INVALID ||
      getDomainsReducer.readyStatus === GET_DOMAINS_REQUESTING ||
      !getProfileReducer.readyStatus ||
      getProfileReducer.readyStatus === GET_PROFILE_INVALID ||
      getProfileReducer.readyStatus === GET_PROFILE_REQUESTING
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

    if (getProfileReducer.readyStatus === GET_PROFILE_FAILURE) {
      return <p>Oops, Failed to load data of Account!</p>;
    }

    return (
      <ProfileSidebar type="settings" role={getProfileReducer.data.role} />
    );
  };
  renderImportLogs = () => {
    const { errorMessage, logs } = this.state;
    return (
      <div
        style={{
          marginBottom: 50,
          borderBottom: '1px solid #f6f6f6'
        }}
      >
        <div
          className={globalStyles.blockItem}
          style={{
            marginBottom: 20
          }}
        >
          <div className="row">
            <div className="col-md-10">
              <div
                className={globalStyles.textLight}
                style={{ fontSize: 20 }}
                id="status"
              >
                Import resources to system
              </div>
              <div style={{ marginTop: 20 }}>
                {!logs.length ? (
                  <button
                    className="btn btn-outline-primary"
                    onClick={this.handleClickImportLogs}
                  >
                    Import
                  </button>
                ) : (
                  <Scrollbars
                    universal
                    autoHide
                    style={{ width: 840, height: 350 }}
                    renderThumbVertical={({ style, ...props }) => (
                      <div
                        {...props}
                        style={{
                          ...style,
                          backgroundColor: 'rgba(246, 246, 246, 0.3)',
                          borderRadius: '4px'
                        }}
                      />
                    )}
                    renderThumbHorizontal={({ style, ...props }) => (
                      <div
                        {...props}
                        style={{
                          ...style,
                          backgroundColor: 'rgba(246, 246, 246, 0.3)',
                          borderRadius: '4px'
                        }}
                      />
                    )}
                    renderView={props => (
                      <div {...props} className={podStyles.logData} />
                    )}
                  >
                    <div>
                      {errorMessage ? (
                        <div>{errorMessage}</div>
                      ) : (
                        <JSONPretty id="json-pretty" json={logs} />
                      )}
                    </div>
                  </Scrollbars>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  renderStatus = () => {
    const { getStatusReducer } = this.props;

    if (
      !getStatusReducer.readyStatus ||
      getStatusReducer.readyStatus === GET_STATUS_INVALID ||
      getStatusReducer.readyStatus === GET_STATUS_REQUESTING
    ) {
      return (
        <img
          src={require('../../images/billing-main.svg')}
          style={{ marginTop: '28px', width: '100%' }}
          alt="billing"
        />
      );
    }

    if (getStatusReducer.readyStatus === GET_STATUS_FAILURE) {
      return <p>Oops, Failed to load data of Settings!</p>;
    }

    return (
      <div
        style={{
          marginBottom: 50,
          borderBottom: '1px solid #f6f6f6'
        }}
      >
        <div
          className={globalStyles.blockItem}
          style={{
            marginBottom: 20
          }}
        >
          <div className={globalStyles.blockItemTitle}>Settings</div>
          <div className="row">
            <div className="col-md-10">
              <div
                className={globalStyles.textLight}
                style={{ fontSize: 20 }}
                id="status"
              >
                Status of services
              </div>
            </div>
          </div>
          <div className="row">
            <div style={{ marginTop: 30 }}>
              {getStatusReducer.data.length ? (
                <table
                  className={itemClassName}
                  style={{
                    tableLayout: 'fixed',
                    width: '100%',
                    border: 0,
                    cellspacing: 0,
                    cellpadding: 0,
                    marginBottom: 0
                  }}
                >
                  <thead style={{ height: '30px' }}>
                    <tr>
                      <td
                        className={configmapStyles.td_1_Configmap}
                        style={{ width: 300 }}
                      >
                        Name
                      </td>
                      <td className={configmapStyles.td_2_Configmap}>
                        Version
                      </td>
                      <td className={configmapStyles.td_3_Configmap}>Status</td>
                      <td className={configmapStyles.td_4_Configmap} />
                    </tr>
                  </thead>
                  <tbody>
                    {getStatusReducer.data.map(status => {
                      const demo = status.details
                        ? Object.keys(status.details).map(detail => (
                            <li>{status.details[detail]}</li>
                          ))
                        : null;
                      return (
                        <Tooltip
                          placement="bottomRight"
                          trigger={['hover']}
                          // visible
                          overlay={
                            <span>
                              <ul
                                style={{
                                  margin: 0,
                                  padding: '0 0 0 10px',
                                  maxWidth: 230,
                                  listStyleType: 'square'
                                }}
                              >
                                {demo || null}
                              </ul>
                            </span>
                          }
                          overlayClassName={
                            status.details ? '' : 'rc-tooltip-hidden'
                          }
                        >
                          <tr
                            className={containerClassNameTable}
                            style={{
                              margin: 0
                            }}
                            key={status.name}
                          >
                            <td className={configmapStyles.td_1_Configmap}>
                              {status.name}
                            </td>
                            <td className={configmapStyles.td_2_Configmap}>
                              {status.version ? status.version : '-'}
                            </td>
                            <td className={configmapStyles.td_3_Configmap}>
                              <img
                                src={status.ok ? successImg : warningImg}
                                alt="status"
                                style={{
                                  width: 20,
                                  marginRight: 10
                                }}
                              />
                              {status.ok ? 'Ok' : 'Error'}
                            </td>
                            <td className={configmapStyles.td_4_Configmap} />
                          </tr>
                        </Tooltip>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <table
                  className={itemClassName}
                  style={{
                    tableLayout: 'fixed',
                    width: '100%',
                    border: 0,
                    cellspacing: 0,
                    cellpadding: 0,
                    marginLeft: 20
                  }}
                >
                  <thead>
                    <tr>
                      <td className={configmapStyles.td_5_Configmap}>
                        Not found information about any services
                      </td>
                    </tr>
                  </thead>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    );
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
      <div
        id="ips"
        style={{
          marginBottom: 50,
          borderBottom: '1px solid #f6f6f6'
        }}
      >
        <SettingsViewList
          getDomainsReducer={getDomainsReducer.data}
          handleDeleteIP={this.handleDeleteIP}
        />
        <form
          style={{ margin: 30 }}
          onSubmit={this.handleSubmitAddIP}
          className={globalStyles.blockItem}
          id="addIP"
        >
          <div className={globalStyles.textLight} style={{ fontSize: 20 }}>
            Add IP
          </div>
          {/* <div className={globalStyles.blockItemTitle}>Add IP</div> */}
          <div className="row">
            <div className="col-md-4">
              <InputControl
                value={this.state.ip}
                id="domain"
                type="text"
                pattern="^[0-9][0-9.]*$"
                required
                title="Example: 192.168.88.210"
                textHelper="Add external IP of your host machine"
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
      <div id="storages">
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
          <div className={globalStyles.textLight} style={{ fontSize: 20 }}>
            Add Storage class
          </div>
          {/* <div className={globalStyles.blockItemTitle}>Add Storage</div> */}
          <div className="row">
            <div className="col-md-4">
              <InputControl
                value={this.state.name}
                id="name"
                type="text"
                pattern="^[-._a-zA-Z0-9]+$"
                required
                title="Example: gluster-heketi"
                textHelper="To turn on volumes, add storage classes you have in kubernetes"
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
    const {
      deleteDomainReducer,
      addDomainReducer,
      addStorageReducer,
      deleteStorageReducer
    } = this.props;
    const {
      status: statusDomainDelete,
      method: methodDomainDelete,
      ips: ipDomainDelete,
      err: errDomainDelete
    } = deleteDomainReducer;
    const {
      status: statusDomainAdd,
      method: methodDomainAdd,
      ips: ipDomainAdd,
      err: errDomainAdd
    } = addDomainReducer;
    const {
      status: statusStorageDelete,
      method: methodStorageDelete,
      name: nameStorageDelete,
      err: errStorageDelete
    } = deleteStorageReducer;
    const {
      status: statusStorageAdd,
      method: methodStorageAdd,
      name: nameStorageAdd,
      err: errStorageAdd
    } = addStorageReducer;
    return (
      <div>
        <Helmet title="Settings" />
        <Notification
          status={statusDomainDelete}
          name={ipDomainDelete}
          method={methodDomainDelete}
          errorMessage={errDomainDelete}
        />
        <Notification
          status={statusDomainAdd}
          name={ipDomainAdd}
          method={methodDomainAdd}
          errorMessage={errDomainAdd}
        />
        <Notification
          status={statusStorageDelete}
          name={nameStorageDelete}
          method={methodStorageDelete}
          errorMessage={errStorageDelete}
        />
        <Notification
          status={statusStorageAdd}
          name={nameStorageAdd}
          method={methodStorageAdd}
          errorMessage={errStorageAdd}
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
                    {this.renderImportLogs()}
                    {this.renderStatus()}
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
    getProfileReducer,
    getDomainsReducer,
    deleteDomainReducer,
    addDomainReducer,
    getStoragesReducer,
    addStorageReducer,
    deleteStorageReducer,
    getStatusReducer
  }: ReduxState) => ({
    getProfileReducer,
    getDomainsReducer,
    deleteDomainReducer,
    addDomainReducer,
    getStoragesReducer,
    addStorageReducer,
    deleteStorageReducer,
    getStatusReducer
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
      dispatch(actionDeleteStorage.fetchDeleteStorageIfNeeded(name)),
    fetchGetStatusIfNeeded: () =>
      dispatch(actionGetStatus.fetchGetStatusIfNeeded())
  })
);

export default connector(Settings);
