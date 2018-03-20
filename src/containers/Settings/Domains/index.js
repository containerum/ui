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
// import { DELETE_DOMAIN_SUCCESS } from '../../../constants/serviceConstants/deleteDomain';
import ImagesTokenList from '../../../components/ImagesTokenList';
// import Notification from '../../Notification';
// import LoadButton from '../../../components/LoadButton';
// import InputControl from '../../../components/InputControl';

type Props = {
  getDomainsReducer: Object,
  // deleteDomainReducer: Object,
  match: Object,
  fetchGetDomainsIfNeeded: (idName: string) => void,
  fetchDeleteDomainIfNeeded: (label: string) => void
};

// Export this for unit testing more easily
export class Domains extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      displayedTokens: [],
      label: '',
      regexp: '.*'
    };
  }
  componentDidMount() {
    const { fetchGetDomainsIfNeeded, match } = this.props;
    console.log(match);
    fetchGetDomainsIfNeeded(match.params.idName);
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getDomainsReducer.readyStatus !==
        nextProps.getDomainsReducer.readyStatus &&
      nextProps.getDomainsReducer.readyStatus === GET_DOMAINS_SUCCESS
    ) {
      console.log(nextProps.getDomainsReducer);
      this.setState({
        ...this.state,
        displayedTokens: nextProps.getDomainsReducer.data
      });
    }
    // if (
    //   this.props.deleteDomainReducer.readyStatus !==
    //     nextProps.deleteDomainReducer.readyStatus &&
    //   nextProps.deleteDomainReducer.readyStatus === DELETE_IMAGE_TOKEN_SUCCESS
    // ) {
    //   const displayedTokens = this.state.displayedTokens.filter(
    //     namespace => nextProps.deleteDomainReducer.label !== namespace.label
    //   );
    //   this.setState({
    //     ...this.state,
    //     displayedTokens
    //   });
    // }
  }
  handleDeleteImageToken = label => {
    this.props.fetchDeleteDomainIfNeeded(label);
  };
  // handleChangeWebHookLabel = value => {
  //   this.setState({
  //     ...this.state,
  //     label: value
  //   });
  // };
  // handleChangeWebHookRegexp = value => {
  //   this.setState({
  //     ...this.state,
  //     regexp: value
  //   });
  // };

  renderImagesTokenList = () => {
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
      return <p>Oops, Failed to load data of Tokens!</p>;
    }

    return (
      <ImagesTokenList
        data={this.state.displayedTokens}
        handleDeleteImageToken={label => this.handleDeleteImageToken(label)}
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
            <div className="container no-back" style={{ height: '150px' }}>
              <table
                className="content-block__table_domains dashboard-table table"
                style={{
                  tableLayout: 'fixed',
                  width: '100%',
                  border: 0,
                  cellspacing: 0,
                  cellpadding: 0,
                  marginTop: '30px'
                }}
              >
                <thead style={{ height: '30px' }}>
                  <tr>
                    <td className="td-1-domains">Domains</td>
                    <td className="td-2-domains">Service</td>
                    <td className="td-3-domains">Namspace</td>
                    <td className="td-4-domains" />
                  </tr>
                </thead>
                <tbody className="domains">
                  <tr
                    className="content-block-container card-container hover-action"
                    style={{ margin: 0 }}
                  >
                    <td className="td-1-domains">sdfdsfsdf</td>
                    <td className="td-2-domains">dsfsdfdsf</td>
                    <td className="td-3-domains">vvv</td>
                    <td className="td-4-domains dropdown no-arrow">
                      <i
                        className="content-block-table__more ion-more dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      />
                      <ul
                        className="dropdown-menu dropdown-menu-right"
                        role="menu"
                      >
                        <li className="dropdown-item">Resize</li>
                      </ul>
                    </td>
                  </tr>
                  <tr
                    className="content-block-container card-container hover-action"
                    style={{ margin: 0 }}
                  >
                    <td className="td-1-domains">sdfdsfsdf</td>
                    <td className="td-2-domains">dsfsdfdsf</td>
                    <td className="td-3-domains">vvv</td>
                    <td className="td-4-domains dropdown no-arrow">
                      <i
                        className="content-block-table__more ion-more dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      />
                      <ul
                        className="dropdown-menu dropdown-menu-right"
                        role="menu"
                      >
                        <li className="dropdown-item">Resize</li>
                      </ul>
                    </td>
                  </tr>
                  <tr
                    className="content-block-container card-container hover-action"
                    style={{ margin: 0 }}
                  >
                    <td className="td-1-domains">sdfdsfsdf</td>
                    <td className="td-2-domains">dsfsdfdsf</td>
                    <td className="td-3-domains">vvv</td>
                    <td className="td-4-domains dropdown no-arrow">
                      <i
                        className="content-block-table__more ion-more dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      />
                      <ul
                        className="dropdown-menu dropdown-menu-right"
                        role="menu"
                      >
                        <li className="dropdown-item">Resize</li>
                      </ul>
                    </td>
                  </tr>
                  <tr
                    className="content-block-container card-container hover-action"
                    style={{ margin: 0 }}
                  >
                    <td className="td-1-domains">sdfdsfsdf</td>
                    <td className="td-2-domains">dsfsdfdsf</td>
                    <td className="td-3-domains">vvv</td>
                    <td className="td-4-domains dropdown no-arrow">
                      <i
                        className="content-block-table__more ion-more dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      />
                      <ul
                        className="dropdown-menu dropdown-menu-right"
                        role="menu"
                      >
                        <li className="dropdown-item">Resize</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
    fetchGetDomainsIfNeeded: (idName: string) =>
      dispatch(actionGetDomains.fetchGetDomainsIfNeeded(idName)),
    fetchDeleteDomainIfNeeded: (label: string) =>
      dispatch(actionDeleteDomain.fetchDeleteDomainIfNeeded(label))
  })
);

export default connector(Domains);
