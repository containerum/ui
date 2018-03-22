/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';

import * as actionGetDeployment from '../../actions/deploymentActions/getDeployment';
import * as actionDeleteDeployment from '../../actions/deploymentActions/deleteDeployment';
import {
  GET_DEPLOYMENT_FAILURE,
  GET_DEPLOYMENT_INVALID,
  GET_DEPLOYMENT_REQUESTING
} from '../../constants/deploymentConstants/getDeployment';
import {
  DELETE_DEPLOYMENT_SUCCESS,
  DELETE_DEPLOYMENT_REQUESTING
} from '../../constants/deploymentConstants/deleteDeployment';
import type { Dispatch, ReduxState } from '../../types';
import { routerLinks } from '../../config';
import DeploymentInfo from '../../components/DeploymentInfo';
import Notification from '../Notification';
import NavigationHeaderItem from '../NavigationHeader';
import DeleteModal from '../../components/CustomerModal/DeleteModal';
import PodsPage from '../Pods';

type Props = {
  getDeploymentReducer: Object,
  deleteDeploymentReducer: Object,
  fetchGetDeploymentIfNeeded: (idName: string, idDep: string) => void,
  fetchDeleteDeploymentIfNeeded: (idName: string, idDep: string) => void,
  match: Object,
  history: Object
};

// Export this for unit testing more easily
export class Deployment extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      inputName: '',
      idDep: null,
      isOpened: false
    };
  }
  componentDidMount() {
    const { fetchGetDeploymentIfNeeded, match } = this.props;
    fetchGetDeploymentIfNeeded(match.params.idName, match.params.idDep);
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.deleteDeploymentReducer.readyStatus !==
        nextProps.deleteDeploymentReducer.readyStatus &&
      nextProps.deleteDeploymentReducer.readyStatus ===
        DELETE_DEPLOYMENT_SUCCESS
    ) {
      this.props.history.goBack();
    }
  }
  onHandleDelete = idDep => {
    const { fetchDeleteDeploymentIfNeeded, match } = this.props;
    fetchDeleteDeploymentIfNeeded(match.params.idName, idDep);
  };
  handleOpenCloseModal = () => {
    this.setState({
      ...this.state,
      isOpened: !this.state.isOpened,
      idDep: null,
      inputName: ''
    });
  };
  handleInputName = inputName => {
    this.setState({
      ...this.state,
      inputName
    });
  };
  handleDeleteDeployment = idDep => {
    this.setState({
      ...this.state,
      idDep,
      isOpened: true
    });
  };

  renderDeploymentInfo = () => {
    const { getDeploymentReducer, deleteDeploymentReducer, match } = this.props;

    if (
      !getDeploymentReducer.readyStatus ||
      getDeploymentReducer.readyStatus === GET_DEPLOYMENT_INVALID ||
      getDeploymentReducer.readyStatus === GET_DEPLOYMENT_REQUESTING ||
      deleteDeploymentReducer.readyStatus === DELETE_DEPLOYMENT_REQUESTING
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
            src={require('../../images/ns-dep.svg')}
            alt="ns-dep"
            style={{ width: '100%' }}
          />
        </div>
      );
    }

    if (getDeploymentReducer.readyStatus === GET_DEPLOYMENT_FAILURE) {
      return <p>Oops, Failed to load data of Deployment!</p>;
    }

    return (
      <DeploymentInfo
        data={getDeploymentReducer.data}
        handleDeleteDeployment={idDep => this.handleDeleteDeployment(idDep)}
        idName={match.params.idName}
        idDep={match.params.idDep}
      />
    );
  };

  render() {
    const { deleteDeploymentReducer, match } = this.props;
    const { status, idDep, err } = this.props.deleteDeploymentReducer;
    const { inputName, isOpened, idDep: currentIdDep } = this.state;
    return (
      <div>
        <Helmet title={`Deployment - ${match.params.idDep}`} />
        <Notification status={status} name={idDep} errorMessage={err} />
        <DeleteModal
          type="Deployment"
          name={inputName}
          typeName={currentIdDep}
          isOpened={isOpened}
          handleInputName={this.handleInputName}
          handleOpenCloseModal={this.handleOpenCloseModal}
          onHandleDelete={depName => this.onHandleDelete(depName)}
        />
        <NavigationHeaderItem
          idName={match.params.idName}
          idDep={match.params.idDep}
        />
        {this.renderDeploymentInfo()}
        {deleteDeploymentReducer.readyStatus !==
          DELETE_DEPLOYMENT_REQUESTING && (
          <div className="content-block">
            <div className="content-block-container container">
              <div className="content-block-header">
                <div className="content-block-header-nav">
                  <ul
                    className="content-block-menu nav nav-pills"
                    role="tablist"
                  >
                    <li className="content-block-menu__li nav-item">
                      <NavLink
                        activeClassName="active"
                        to={routerLinks.getDeploymentLink(
                          match.params.idName,
                          match.params.idDep
                        )}
                        className="content-block-menu__link"
                      >
                        Pods
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <Switch>
                <Route path={`${match.path}/pods`} exact component={PodsPage} />
                <Route
                  path={`${match.url}`}
                  exact
                  component={() => <Redirect to={`${match.url}/pods`} />}
                />
              </Switch>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ getDeploymentReducer, deleteDeploymentReducer }: ReduxState) => ({
    getDeploymentReducer,
    deleteDeploymentReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetDeploymentIfNeeded: (idName: string, idDep: string) =>
      dispatch(actionGetDeployment.fetchGetDeploymentIfNeeded(idName, idDep)),
    fetchDeleteDeploymentIfNeeded: (idName: string, idDep: string) =>
      dispatch(
        actionDeleteDeployment.fetchDeleteDeploymentIfNeeded(idName, idDep)
      )
  })
);

export default connector(Deployment);
