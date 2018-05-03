/* @flow */

import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import type { Connector } from 'react-redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';

// import { routerLinks } from '../../config';
import NavigationHeaderItem from '../NavigationHeader';
import type { Dispatch, ReduxState } from '../../types';
import * as actionGetService from '../../actions/serviceActions/getService';
import {
  GET_SERVICE_FAILURE,
  GET_SERVICE_INVALID,
  GET_SERVICE_REQUESTING
} from '../../constants/serviceConstants/getService';
import globalStyles from '../../theme/global.scss';

type Props = {
  match: Object,
  getServiceReducer: Object,
  fetchGetServiceIfNeeded: (idName: string, idSrv: string) => void
};

// Export this for unit testing more easily
export class CreatedExternalServiceSuccessful extends PureComponent<Props> {
  componentDidMount() {
    const { fetchGetServiceIfNeeded, match } = this.props;
    fetchGetServiceIfNeeded(match.params.idName, match.params.idSrv);
  }

  renderCreateDomain = () => {
    const { getServiceReducer, match } = this.props;
    if (
      !getServiceReducer.readyStatus ||
      getServiceReducer.readyStatus === GET_SERVICE_INVALID ||
      getServiceReducer.readyStatus === GET_SERVICE_REQUESTING
    ) {
      return (
        <img
          key={_.uniqueId()}
          src={require('../../images/create-dep-serv.svg')}
          style={{
            marginTop: '-2px',
            marginBottom: '30px',
            width: '100%'
          }}
          alt="create service"
        />
      );
    }

    if (getServiceReducer.readyStatus === GET_SERVICE_FAILURE) {
      return <p>Oops, Failed to load data of NS!</p>;
    }

    return (
      <div>
        <div
          className="blockContainer blockContainerPadin"
          id="target-deployment"
        >
          <div
            className="col-md-3"
            style={{
              display: 'inline-block',
              verticalAlign: 'top',
              marginLeft: '35px'
            }}
          >
            <div
              className={globalStyles.successMessageText}
              style={{ color: '#333', textTransform: 'uppercase' }}
            >
              Success
            </div>
          </div>
          <div
            className="col-md-9"
            style={{
              display: 'inline-block',
              marginLeft: '-35px',
              color: '#333'
            }}
          >
            <div
              className="containerSubTitle"
              style={{
                margin: '0 0 10px 0',
                color: '#333'
              }}
            >
              Ok, new Service {match.params.idSrv} was Created
            </div>
            <div className="containerSubTitle" style={{ margin: '0 0 40px 0' }}>
              Well, now you can additionally create a Domain for this
              <br />
              External Service and enable SSL.
            </div>
            <div className="documentation-link">
              Would you like to create a Domain?
            </div>
          </div>
        </div>
        <div className="text-right">
          <NavLink
            to={`/namespaces/${match.params.idName}`}
            className="btnTransparency btnService"
            style={{
              width: '250px',
              display: 'inline-block',
              marginRight: '20px'
            }}
          >
            Go to namespace
          </NavLink>
          <NavLink
            to={`/namespace/${match.params.idName}/service/${
              match.params.idSrv
            }/createDomain`}
            className="btnDeployment btnService"
            style={{ width: '200px', display: 'inline-block' }}
          >
            Create domain
          </NavLink>
        </div>
      </div>
    );
  };
  render() {
    const { match } = this.props;
    return (
      <div>
        <Helmet
          title={`Created external Service successfully in ${
            match.params.idName
          }`}
        />
        <div className="container-fluid breadcrumbNavigation">
          <NavigationHeaderItem
            idName={match.params.idName}
            IdCreate="service"
          />
        </div>
        <div className={globalStyles.contentBlock}>
          <div className={`container ${globalStyles.containerNoBackground}`}>
            <div className="row pageWidth">
              <div className="col-md-3 sideMenu" />
              <div className="col-md-9 pageContent">
                {this.renderCreateDomain()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ getServiceReducer }: ReduxState) => ({
    getServiceReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetServiceIfNeeded: (idName: string, idSrv: string) =>
      dispatch(actionGetService.fetchGetServiceIfNeeded(idName, idSrv))
  })
);

export default connector(CreatedExternalServiceSuccessful);
