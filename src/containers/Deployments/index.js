/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import className from 'classnames/bind';
import cookie from 'react-cookies';

import { routerLinks } from '../../config';
import type { Dispatch, ReduxState } from '../../types';
import * as actionGetDeployments from '../../actions/deploymentsActions/getDeployments';
import * as actionDeleteDeployment from '../../actions/deploymentActions/deleteDeployment';
import {
  GET_DEPLOYMENTS_INVALID,
  GET_DEPLOYMENTS_REQUESTING,
  GET_DEPLOYMENTS_FAILURE,
  GET_DEPLOYMENTS_SUCCESS
} from '../../constants/deploymentsConstants/getDeployments';
import {
  DELETE_DEPLOYMENT_SUCCESS,
  DELETE_DEPLOYMENT_REQUESTING
} from '../../constants/deploymentConstants/deleteDeployment';
import DeploymentsList from '../../components/DeploymentsList';
import Notification from '../Notification';
import DeleteModal from '../../components/CustomerModal/DeleteModal';

import globalStyles from '../../theme/global.scss';
import {
  GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING
} from '../../constants/namespacesConstants/getNamespaces';

const globalClass = className.bind(globalStyles);

const contentClassName = globalClass(
  'contentBlockContent',
  'contentBlockContentFull'
);

type Props = {
  history: Object,
  match: Object,
  getDeploymentsReducer: Object,
  getNamespacesReducer: Object,
  deleteDeploymentReducer: Object,
  fetchGetDeploymentsIfNeeded: (idName: string) => void,
  fetchDeleteDeploymentIfNeeded: (idName: string, idDep: string) => void
};

export class Deployments extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      inputName: '',
      idDep: null,
      isOpened: false,
      displayedDeployments: []
    };
  }
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentDidMount() {
    const { fetchGetDeploymentsIfNeeded, match } = this.props;
    fetchGetDeploymentsIfNeeded(match.params.idName);
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getDeploymentsReducer.readyStatus !==
        nextProps.getDeploymentsReducer.readyStatus &&
      nextProps.getDeploymentsReducer.readyStatus === GET_DEPLOYMENTS_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedDeployments: nextProps.getDeploymentsReducer.data
      });
    }
    if (
      this.props.deleteDeploymentReducer.readyStatus !==
        nextProps.deleteDeploymentReducer.readyStatus &&
      nextProps.deleteDeploymentReducer.readyStatus ===
        DELETE_DEPLOYMENT_SUCCESS
    ) {
      const displayedDep = this.state.displayedDeployments.filter(
        deployment =>
          nextProps.deleteDeploymentReducer.idDep !== deployment.name
      );
      this.setState({
        ...this.state,
        displayedDeployments: displayedDep
      });
    }
  }
  onHandleDelete = idDep => {
    const { fetchDeleteDeploymentIfNeeded, match } = this.props;
    fetchDeleteDeploymentIfNeeded(match.params.idName, idDep);
  };
  handleDeleteDeployment = idDep => {
    this.setState({
      ...this.state,
      idDep,
      isOpened: true
    });
  };
  handleInputName = inputName => {
    this.setState({
      ...this.state,
      inputName
    });
  };
  handleOpenCloseModal = () => {
    this.setState({
      ...this.state,
      isOpened: !this.state.isOpened,
      idDep: null,
      inputName: ''
    });
  };

  renderDeploymentsList = () => {
    const {
      getDeploymentsReducer,
      getNamespacesReducer,
      deleteDeploymentReducer,
      match
    } = this.props;

    if (
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING ||
      !getDeploymentsReducer.readyStatus ||
      getDeploymentsReducer.readyStatus === GET_DEPLOYMENTS_INVALID ||
      getDeploymentsReducer.readyStatus === GET_DEPLOYMENTS_REQUESTING ||
      deleteDeploymentReducer.readyStatus === DELETE_DEPLOYMENT_REQUESTING
    ) {
      return (
        <div
          style={{
            height: '270px',
            margin: '0 30px',
            borderRadius: '2px',
            backgroundColor: '#f6f6f6'
          }}
        />
      );
    }

    if (
      getNamespacesReducer.readyStatus === GET_NAMESPACES_FAILURE ||
      getDeploymentsReducer.readyStatus === GET_DEPLOYMENTS_FAILURE
    ) {
      return <p>Oops, Failed to load data of Deployments!</p>;
    }

    return (
      <DeploymentsList
        data={this.state.displayedDeployments}
        dataNamespace={getNamespacesReducer.data.find(
          namespace => namespace.id === match.params.idName
        )}
        handleDeleteDeployment={idDep => this.handleDeleteDeployment(idDep)}
        history={this.props.history}
        idName={match.params.idName}
      />
    );
  };

  render() {
    const { status, idDep, err } = this.props.deleteDeploymentReducer;
    const { inputName, isOpened, idDep: currentIdDep } = this.state;
    let currentDepl;
    if (
      this.props.getDeploymentsReducer.readyStatus === GET_DEPLOYMENTS_SUCCESS
    ) {
      currentDepl = this.props.getDeploymentsReducer.data.find(
        depl => depl.name === currentIdDep
      );
    }
    return (
      <div>
        <Notification status={status} name={idDep} errorMessage={err} />
        {currentDepl && (
          <DeleteModal
            type="Deployment"
            inputName={inputName}
            name={inputName}
            typeName={currentDepl.name}
            isOpened={isOpened}
            minLengthName={1}
            handleInputName={this.handleInputName}
            handleOpenCloseModal={this.handleOpenCloseModal}
            onHandleDelete={this.onHandleDelete}
          />
        )}
        <div className={contentClassName}>
          <div className="tab-content">
            <div className="tab-pane active">
              {this.renderDeploymentsList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getDeploymentsReducer,
    getNamespacesReducer,
    deleteDeploymentReducer
  }: ReduxState) => ({
    getDeploymentsReducer,
    getNamespacesReducer,
    deleteDeploymentReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetDeploymentsIfNeeded: (idName: string) =>
      dispatch(actionGetDeployments.fetchGetDeploymentsIfNeeded(idName)),
    fetchDeleteDeploymentIfNeeded: (idName: string, idDep: string) =>
      dispatch(
        actionDeleteDeployment.fetchDeleteDeploymentIfNeeded(idName, idDep)
      )
  })
);

export default connector(Deployments);
