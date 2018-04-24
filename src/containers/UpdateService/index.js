/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';
import Scrollspy from 'react-scrollspy';

import scrollById from '../../functions/scrollById';
import * as actionGetService from '../../actions/serviceActions/getService';
import * as actionUpdateInternalService from '../../actions/serviceActions/updateInternalService';
import * as actionUpdateExternalService from '../../actions/serviceActions/updateExternalService';
import {
  GET_SERVICE_INVALID,
  GET_SERVICE_REQUESTING,
  GET_SERVICE_FAILURE,
  GET_SERVICE_SUCCESS
} from '../../constants/serviceConstants/getService';
import type { Dispatch, ReduxState } from '../../types';
import NavigationHeaderItem from '../NavigationHeader';
import UpdateServiceCardItem from './CreateServiceCard';
import LoadButton from '../../components/LoadButton';
import Notification from '../Notification';

type Props = {
  getServiceReducer: Object,
  updateExternalServiceReducer: Object,
  updateInternalServiceReducer: Object,
  match: Object,
  fetchGetServiceIfNeeded: (idName: string, idSrv: string) => void,
  fetchUpdateInternalServiceIfNeeded: (idName: string, data: Object) => void,
  fetchUpdateExternalServiceIfNeeded: (idName: string, data: Object) => void
};

// Export this for unit testing more easily
export class UpdateService extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      currentDeployment: '',
      isActiveInternal: false,
      isActiveExternal: false,
      internalSrvObject: [
        {
          internalSrvName: '',
          internalSrvPort: '',
          internalSrvTargetPort: '',
          intServiceType: 'TCP',
          id: _.uniqueId(),
          index: 0
        }
      ],
      externalSrvObject: [
        {
          externalSrvName: '',
          externalSrvTargetPort: '',
          extServiceType: 'TCP',
          id: _.uniqueId(),
          index: 0
        }
      ]
    };
  }
  componentDidMount() {
    const { fetchGetServiceIfNeeded, match } = this.props;
    fetchGetServiceIfNeeded(match.params.idName, match.params.idSrv);
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getServiceReducer.readyStatus !==
        nextProps.getServiceReducer.readyStatus &&
      nextProps.getServiceReducer.readyStatus === GET_SERVICE_SUCCESS
    ) {
      const { deploy, domain, ports } = nextProps.getServiceReducer.data;
      const internalSrvObject = !domain
        ? ports.map((item, index) => ({
            internalSrvName: item.name,
            internalSrvPort: item.port,
            internalSrvTargetPort: item.target_port,
            intServiceType: item.protocol,
            id: _.uniqueId(),
            index
          }))
        : [
            {
              internalSrvName: '',
              internalSrvPort: '',
              internalSrvTargetPort: '',
              intServiceType: 'TCP',
              id: _.uniqueId(),
              index: 0
            }
          ];
      const externalSrvObject = domain
        ? ports.map((item, index) => ({
            externalSrvName: item.name,
            externalSrvTargetPort: item.target_port,
            extServiceType: item.protocol,
            id: _.uniqueId(),
            index
          }))
        : [
            {
              externalSrvName: '',
              externalSrvTargetPort: '',
              extServiceType: 'TCP',
              id: _.uniqueId(),
              index: 0
            }
          ];
      this.setState({
        ...this.state,
        currentDeployment: deploy,
        isActiveInternal: !domain,
        isActiveExternal: domain,
        internalSrvObject,
        externalSrvObject
      });
    }
  }
  handleSubmitUpdateService = e => {
    e.preventDefault();
    const serviceObject = this.state;
    const {
      match,
      fetchUpdateInternalServiceIfNeeded,
      fetchUpdateExternalServiceIfNeeded
    } = this.props;
    if (
      serviceObject.internalSrvObject.length &&
      serviceObject.internalSrvObject[0].internalSrvPort
    ) {
      fetchUpdateInternalServiceIfNeeded(
        match.params.idName,
        match.params.idSrv,
        serviceObject
      );
    }
    if (
      serviceObject.externalSrvObject.length &&
      serviceObject.externalSrvObject[0].externalSrvTargetPort
    ) {
      fetchUpdateExternalServiceIfNeeded(
        match.params.idName,
        match.params.idSrv,
        serviceObject
      );
    }
  };
  handleChangeState = obj => {
    const state = Object.assign({}, this.state, obj);
    this.setState(...this.state, state);
  };
  renderServiceSidebar = () => {
    const { getServiceReducer } = this.props;
    if (
      !getServiceReducer.readyStatus ||
      getServiceReducer.readyStatus === GET_SERVICE_INVALID ||
      getServiceReducer.readyStatus === GET_SERVICE_REQUESTING
    ) {
      return (
        <div style={{ marginTop: '40px', width: '80%' }}>
          {new Array(3)
            .fill()
            .map(() => (
              <img
                key={_.uniqueId()}
                src={require('../../images/profile-sidebar-big.svg')}
                style={{ width: '100%', marginBottom: '20px' }}
                alt="profile-sidebar"
              />
            ))}
        </div>
      );
    }

    return (
      <Scrollspy
        items={['port']}
        style={{
          padding: '50px 0',
          margin: '-40px 0 0'
        }}
        currentClassName="active"
      >
        <div className="sideMenuHeader">
          <div
            onClick={() => scrollById('port')}
            onKeyPress={() => scrollById('port')}
            role="presentation"
          >
            Port
          </div>
        </div>
      </Scrollspy>
    );
  };
  renderUpdateService = () => {
    const { getServiceReducer, match } = this.props;
    if (
      !getServiceReducer.readyStatus ||
      getServiceReducer.readyStatus === GET_SERVICE_INVALID ||
      getServiceReducer.readyStatus === GET_SERVICE_REQUESTING
    ) {
      return (
        <div>
          {new Array(2).fill().map(() => (
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
          ))}
        </div>
      );
    }

    if (getServiceReducer.readyStatus === GET_SERVICE_FAILURE) {
      return <p>Oops, Failed to load data of Service!</p>;
    }

    const {
      isActiveInternal,
      isActiveExternal,
      internalSrvObject,
      externalSrvObject
    } = this.state;
    return (
      <UpdateServiceCardItem
        deploymentsData={getServiceReducer.data}
        idName={match.params.idName}
        idSrv={match.params.idSrv}
        isActiveInternal={isActiveInternal}
        isActiveExternal={isActiveExternal}
        internalSrvObject={internalSrvObject}
        externalSrvObject={externalSrvObject}
        handleSubmitUpdateService={e => this.handleSubmitUpdateService(e)}
        handleChangeState={obj => this.handleChangeState(obj)}
        handleChangeActivityInternal={() =>
          this.setState({
            ...this.state,
            isActiveInternal: !isActiveInternal,
            internalSrvObject: [
              {
                internalSrvName: '',
                internalSrvPort: '',
                internalSrvTargetPort: '',
                intServiceType: 'TCP',
                id: _.uniqueId(),
                index: 0
              }
            ]
          })
        }
        handleChangeActivityExternal={() =>
          this.setState({
            ...this.state,
            isActiveExternal: !isActiveExternal,
            externalSrvObject: [
              {
                externalSrvName: '',
                externalSrvTargetPort: '',
                extServiceType: 'TCP',
                id: _.uniqueId(),
                index: 0
              }
            ]
          })
        }
      />
    );
  };

  render() {
    const {
      match,
      updateExternalServiceReducer,
      updateInternalServiceReducer
    } = this.props;
    // console.log(this.props);
    return (
      <div>
        <Helmet
          title={`Update Service ${match.params.idSrv} in ${
            match.params.idName
          }`}
        />
        <div className="container-fluid breadcrumbNavigation">
          <NavigationHeaderItem
            idName={match.params.idName}
            IdUpdate="service"
            typeOfUpdateService={
              this.state.isActiveInternal ? 'Internal' : 'External'
            }
          />
        </div>
        <Notification
          status={updateInternalServiceReducer.status}
          name={updateInternalServiceReducer.idSrv}
          method={updateInternalServiceReducer.method}
          errorMessage={updateInternalServiceReducer.err}
        />
        <Notification
          status={updateExternalServiceReducer.status}
          name={updateExternalServiceReducer.idSrv}
          method={updateExternalServiceReducer.method}
          errorMessage={updateExternalServiceReducer.err}
        />
        <div className="content-block">
          <div className="container no-back">
            <div className="row pageWidth">
              <div
                className="col-md-3 sideMenu"
                style={{ padding: '20px 0px' }}
              >
                {this.renderServiceSidebar()}
              </div>
              <div className="col-md-9 pageContent">
                <form onSubmit={e => this.handleSubmitUpdateService(e)}>
                  {this.renderUpdateService()}
                  <LoadButton
                    type="submit"
                    buttonText="Update service"
                    isFetching={
                      updateExternalServiceReducer.isFetching ||
                      updateInternalServiceReducer.isFetching
                    }
                    baseClassButton="btnDeployment btnService"
                  />
                </form>
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
    getServiceReducer,
    updateExternalServiceReducer,
    updateInternalServiceReducer
  }: ReduxState) => ({
    getServiceReducer,
    updateExternalServiceReducer,
    updateInternalServiceReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetServiceIfNeeded: (idName: string, idSrv: string) =>
      dispatch(actionGetService.fetchGetServiceIfNeeded(idName, idSrv)),
    fetchUpdateInternalServiceIfNeeded: (
      idName: string,
      idSrv: string,
      data: Object
    ) =>
      dispatch(
        actionUpdateInternalService.fetchUpdateInternalServiceIfNeeded(
          idName,
          idSrv,
          data
        )
      ),
    fetchUpdateExternalServiceIfNeeded: (
      idName: string,
      idSrv: string,
      data: Object
    ) =>
      dispatch(
        actionUpdateExternalService.fetchUpdateExternalServiceIfNeeded(
          idName,
          idSrv,
          data
        )
      )
  })
);

export default connector(UpdateService);
