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
import type { Dispatch, ReduxState } from '../../types';
import Notification from '../Notification';
import ProfileSidebar from '../../components/ProfileSidebar';
import SettingsViewList from '../../components/SettingsViewList';
import InputControl from '../../components/InputControl';
import LoadButton from '../../components/LoadButton';
import globalStyles from '../../theme/global.scss';
import accountStyles from '../Account/index.scss';
import { DELETE_DOMAIN_SUCCESS } from '../../constants/domainConstants/deleteDomain';
import { ADD_DOMAIN_SUCCESS } from '../../constants/domainConstants/addDomain';
import inputStyles from '../../components/InputControl/index.scss';
import buttonsStyles from '../../theme/buttons.scss';

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
  fetchGetDomainsIfNeeded: () => void,
  fetchDeleteDomainIfNeeded: (id: string, ip: string) => void,
  fetchAddDomainIfNeeded: (id: Array) => void
};

export class Settings extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = { ip: '' };
  }
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentDidMount() {
    const { fetchGetDomainsIfNeeded } = this.props;
    fetchGetDomainsIfNeeded();
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
  }
  handleDeleteIP = (id, ip) => {
    this.props.fetchDeleteDomainIfNeeded(id, ip);
  };
  handleChangeIPInput = value => {
    const regexp = /^[0-9][0-9.]*$|^$/;
    if (value.search(regexp) !== -1) {
      this.setState({
        ...this.state,
        ip: value
      });
    }
  };
  handleSubmitAddIP = e => {
    e.preventDefault();
    this.props.fetchAddDomainIfNeeded([this.state.ip]);
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
  renderProfileInfo = () => {
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
      <div className={`${containerClassName} container`}>
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
                  this.handleChangeIPInput(e.target.value)
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
    getDomainsReducer,
    deleteDomainReducer,
    addDomainReducer
  }: ReduxState) => ({
    getDomainsReducer,
    deleteDomainReducer,
    addDomainReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetDomainsIfNeeded: () =>
      dispatch(actionGetDomains.fetchGetDomainsIfNeeded()),
    fetchDeleteDomainIfNeeded: (id: string, ip: string) =>
      dispatch(actionDeleteDomain.fetchDeleteDomainIfNeeded(id, ip)),
    fetchAddDomainIfNeeded: (ip: Array) =>
      dispatch(actionAddDomain.fetchAddDomainIfNeeded(ip))
  })
);

export default connector(Settings);
