/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';

import * as actionGetDomains from '../../actions/serviceActions/getDomains';
import * as actionDeleteDomain from '../../actions/serviceActions/deleteDomain';
import type { Dispatch, ReduxState } from '../../types/index';
import {
  GET_DOMAINS_INVALID,
  GET_DOMAINS_REQUESTING,
  GET_DOMAINS_SUCCESS,
  GET_DOMAINS_FAILURE
} from '../../constants/serviceConstants/getDomains';
import {
  DELETE_DOMAIN_SUCCESS,
  DELETE_DOMAIN_REQUESTING
} from '../../constants/serviceConstants/deleteDomain';
import DomainsList from '../../components/DomainsList';
import Notification from '../Notification';

import globalStyles from '../../theme/global.scss';
import {
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING,
  GET_NAMESPACES_SUCCESS
} from '../../constants/namespacesConstants/getNamespaces';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';

import * as actionGetNamespaces from '../../actions/namespacesActions/getNamespaces';

type Props = {
  getProfileReducer: Object,
  getNamespacesReducer: Object,
  getDomainsReducer: Object,
  deleteDomainReducer: Object,
  fetchGetDomainsIfNeeded: (idName: string) => void,
  fetchDeleteDomainIfNeeded: (idName: string, label: string) => void,
  fetchGetNamespacesIfNeeded: (role: string) => void
};

// Export this for unit testing more easily
export class Domains extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      displayedDomains: {}
    };
  }
  componentDidMount() {
    const { fetchGetDomainsIfNeeded } = this.props;
    fetchGetDomainsIfNeeded();
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getProfileReducer.readyStatus !==
        nextProps.getProfileReducer.readyStatus &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      this.props.fetchGetNamespacesIfNeeded(
        nextProps.getProfileReducer.data.role
      );
    }

    if (
      this.props.getDomainsReducer.readyStatus !==
        nextProps.getDomainsReducer.readyStatus &&
      nextProps.getDomainsReducer.readyStatus === GET_DOMAINS_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedDomains: nextProps.getDomainsReducer.data
      });
    }
    if (
      this.props.deleteDomainReducer.readyStatus !==
        nextProps.deleteDomainReducer.readyStatus &&
      nextProps.deleteDomainReducer.readyStatus === DELETE_DOMAIN_SUCCESS
    ) {
      this.props.fetchGetDomainsIfNeeded();
    }
  }
  handleDeleteDomain = (idName, label) => {
    this.props.fetchDeleteDomainIfNeeded(idName, label);
  };

  renderDomainsList = () => {
    const {
      getDomainsReducer,
      deleteDomainReducer,
      getNamespacesReducer
    } = this.props;
    let namespacesLabels;
    if (getNamespacesReducer.readyStatus === GET_NAMESPACES_SUCCESS) {
      namespacesLabels = getNamespacesReducer.data.namespaces.map(ingress => [
        ingress.id,
        ingress.label
      ]);
    }

    if (
      !getDomainsReducer.readyStatus ||
      getDomainsReducer.readyStatus === GET_DOMAINS_INVALID ||
      getDomainsReducer.readyStatus === GET_DOMAINS_REQUESTING ||
      deleteDomainReducer.readyStatus === DELETE_DOMAIN_REQUESTING ||
      (!getNamespacesReducer.readyStatus ||
        getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
        getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING)
    ) {
      return (
        <div
          className={globalStyles.container}
          style={{
            padding: '0',
            marginTop: '17px',
            marginBottom: '30px',
            backgroundColor: 'transparent'
          }}
        >
          <img
            src={require('../../images/ns-dep.svg')}
            alt="ns-dep"
            style={{ width: '100%' }}
          />
        </div>
      );
    }

    if (getDomainsReducer.readyStatus === GET_DOMAINS_FAILURE) {
      return <p>Oops, Failed to load data of Domains!</p>;
    }

    return (
      <DomainsList
        namespacesLabels={namespacesLabels}
        data={this.state.displayedDomains}
        handleDeleteDomain={(idName, label) =>
          this.handleDeleteDomain(idName, label)
        }
      />
    );
  };
  render() {
    const { status, method, label, err } = this.props.deleteDomainReducer;
    return (
      <div>
        <Helmet title="Domains" />
        <Notification
          status={status}
          name={label}
          method={method}
          errorMessage={err}
        />
        <div className={`container ${globalStyles.containerNoBackground}`}>
          <div className={globalStyles.contentBlcok}>
            <div className="row double two-columns">
              <div className="col-md-3 col-lg-3 col-xl-2" />
              <div className="col-md-9 col-lg-9 col-xl-10">
                <div className={`container ${globalStyles.containerDomains}`}>
                  <div className={globalStyles.blockItem} id="domains">
                    <div className={globalStyles.blockItemTitle}>Domains</div>
                    <div className="row">
                      <div className="col-md-8">
                        <div className={globalStyles.textLight}>
                          Your Domains
                        </div>
                      </div>
                      <div className={globalStyles.contentBlock}>
                        <div
                          className={`container ${
                            globalStyles.containerNoBackground
                          }`}
                        >
                          {this.renderDomainsList()}
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div
                          className={globalStyles.textLight}
                          style={{ margin: '20px 0' }}
                        >
                          To add Domain, please visit Service creation page and
                          add Domain in the corresponding section (for External
                          Service only)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
    getDomainsReducer,
    deleteDomainReducer,
    getNamespacesReducer,
    getProfileReducer
  }: ReduxState) => ({
    getDomainsReducer,
    deleteDomainReducer,
    getNamespacesReducer,
    getProfileReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetNamespacesIfNeeded: (role: string) =>
      dispatch(actionGetNamespaces.fetchGetNamespacesIfNeeded(role)),
    fetchGetDomainsIfNeeded: () =>
      dispatch(actionGetDomains.fetchGetDomainsIfNeeded()),
    fetchDeleteDomainIfNeeded: (idName: string, label: string) =>
      dispatch(actionDeleteDomain.fetchDeleteDomainIfNeeded(idName, label))
  })
);

export default connector(Domains);
