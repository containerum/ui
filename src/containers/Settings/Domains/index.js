/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';

import * as actionGetDomains from '../../../actions/serviceActions/getDomains';
import * as actionDeleteDomain from '../../../actions/serviceActions/deleteDomain';
import type { Dispatch, ReduxState } from '../../../types/index';
import {
  GET_DOMAINS_INVALID,
  GET_DOMAINS_REQUESTING,
  GET_DOMAINS_SUCCESS,
  GET_DOMAINS_FAILURE
} from '../../../constants/serviceConstants/getDomains';
import { DELETE_DOMAIN_SUCCESS } from '../../../constants/serviceConstants/deleteDomain';
import DomainsList from '../../../components/DomainsList';
// import Notification from '../../Notification';
// import LoadButton from '../../../components/LoadButton';
// import InputControl from '../../../components/InputControl';

type Props = {
  getDomainsReducer: Object,
  deleteDomainReducer: Object,
  fetchGetDomainsIfNeeded: (idName: string) => void,
  fetchDeleteDomainIfNeeded: (idName: string, label: string) => void
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
    const { getDomainsReducer } = this.props;

    if (
      !getDomainsReducer.readyStatus ||
      getDomainsReducer.readyStatus === GET_DOMAINS_INVALID ||
      getDomainsReducer.readyStatus === GET_DOMAINS_REQUESTING
    ) {
      return (
        <div
          className="container"
          style={{
            padding: '0',
            marginTop: '17px',
            marginBottom: '30px',
            backgroundColor: 'transparent'
          }}
        >
          <img
            src={require('../../../images/ns-dep.svg')}
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
        data={this.state.displayedDomains}
        handleDeleteDomain={(idName, label) =>
          this.handleDeleteDomain(idName, label)
        }
      />
    );
  };
  render() {
    return (
      <div className="block-item" id="domains">
        <div className="block-item__title">Domains</div>
        <div className="row">
          <div className="col-md-8">
            <div className="light-text">Your Domains</div>
          </div>
          <div className="content-block">
            <div className="container no-back">{this.renderDomainsList()}</div>
          </div>
          <div className="col-md-8">
            <div className="light-text" style={{ marginTop: '10px' }}>
              To add Domain, please visit Service creation page and add Domain
              in the corresponding section (for External Service only)
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ getDomainsReducer, deleteDomainReducer }: ReduxState) => ({
    getDomainsReducer,
    deleteDomainReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetDomainsIfNeeded: () =>
      dispatch(actionGetDomains.fetchGetDomainsIfNeeded()),
    fetchDeleteDomainIfNeeded: (idName: string, label: string) =>
      dispatch(actionDeleteDomain.fetchDeleteDomainIfNeeded(idName, label))
  })
);

export default connector(Domains);
