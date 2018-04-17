/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';

import * as actionGetNamespaces from '../../actions/namespacesActions/getNamespaces';
import * as actionDeleteNamespaces from '../../actions/namespaceActions/deleteNamespace';
import {
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING,
  GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_SUCCESS
} from '../../constants/namespacesConstants/getNamespaces';
import {
  DELETE_NAMESPACE_SUCCESS,
  DELETE_NAMESPACE_REQUESTING
} from '../../constants/namespaceConstants/deleteNamespace';
import type {
  Namespaces as NamespacesType,
  Namespace as NamespaceType,
  Dispatch,
  ReduxState
} from '../../types';
import Notification from '../Notification';
import DeleteModal from '../../components/CustomerModal/DeleteModal';
import NamespacesList from '../../components/NamespacesList';
import ns from '../../images/ns-1.svg';

type Props = {
  getNamespacesReducer: NamespacesType,
  deleteNamespaceReducer: NamespaceType,
  history: Object,
  fetchGetNamespacesIfNeeded: () => void,
  fetchDeleteNamespaceIfNeeded: (idName: string) => void,
  createExternalServiceReducer: Object,
  createInternalServiceReducer: Object,
  requestInvalidToken: () => void
};

// Export this for unit testing more easily
export class Namespaces extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      inputName: '',
      idName: null,
      isOpened: false,
      displayedNamespaces: []
    };
  }
  componentDidMount() {
    this.props.fetchGetNamespacesIfNeeded();
    setTimeout(() => {
      this.props.requestInvalidToken();
    }, 7000);
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getNamespacesReducer.readyStatus !==
        nextProps.getNamespacesReducer.readyStatus &&
      nextProps.getNamespacesReducer.readyStatus === GET_NAMESPACES_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedNamespaces: nextProps.getNamespacesReducer.data
      });
    }
    if (
      this.props.deleteNamespaceReducer.readyStatus !==
        nextProps.deleteNamespaceReducer.readyStatus &&
      nextProps.deleteNamespaceReducer.readyStatus === DELETE_NAMESPACE_SUCCESS
    ) {
      const displayedNS = this.state.displayedNamespaces.filter(
        namespace => nextProps.deleteNamespaceReducer.idName !== namespace.label
      );
      this.setState({
        ...this.state,
        displayedNamespaces: displayedNS
      });
    }
  }
  handleOpenCloseModal = () => {
    this.setState({
      ...this.state,
      isOpened: !this.state.isOpened,
      idName: null,
      inputName: ''
    });
  };
  handleInputName = inputName => {
    this.setState({
      ...this.state,
      inputName
    });
  };
  handleDeleteNamespace = idName => {
    this.setState({
      ...this.state,
      idName,
      isOpened: true
    });
  };

  renderNamespacesList = () => {
    const { getNamespacesReducer, deleteNamespaceReducer } = this.props;

    if (
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING ||
      deleteNamespaceReducer.readyStatus === DELETE_NAMESPACE_REQUESTING
    ) {
      return (
        <div className="row double">
          {new Array(3).fill().map(() => (
            <div key={_.uniqueId()} className="col-md-4 align-middle">
              <img className="content-block-container-img" src={ns} alt="ns" />
            </div>
          ))}
        </div>
      );
    }

    if (getNamespacesReducer.readyStatus === GET_NAMESPACES_FAILURE) {
      return <p>Oops, Failed to load data of Namespaces!</p>;
    }

    return (
      <NamespacesList
        // data={this.props.getNamespacesReducer.data}
        data={this.state.displayedNamespaces}
        handleDeleteNamespace={idName => this.handleDeleteNamespace(idName)}
        history={this.props.history}
      />
    );
  };

  render() {
    const {
      fetchDeleteNamespaceIfNeeded,
      deleteNamespaceReducer,
      createExternalServiceReducer,
      createInternalServiceReducer
    } = this.props;
    const { status, idName, err } = deleteNamespaceReducer;
    const {
      status: statusExt,
      idSrv: idSrvExt,
      err: errExt
    } = createExternalServiceReducer;
    const {
      status: statusInt,
      idSrv: idSrvInt,
      err: errInt
    } = createInternalServiceReducer;
    const { inputName, isOpened, idName: currentIdName } = this.state;
    return (
      <div>
        <Helmet title="Namespaces" />
        <Notification status={status} name={idName} errorMessage={err} />
        <Notification
          status={statusExt}
          name={idSrvExt}
          errorMessage={errExt}
        />
        <Notification
          status={statusInt}
          name={idSrvInt}
          errorMessage={errInt}
        />
        <DeleteModal
          type="Namespace"
          name={inputName}
          typeName={currentIdName}
          isOpened={isOpened}
          handleInputName={this.handleInputName}
          handleOpenCloseModal={this.handleOpenCloseModal}
          onHandleDelete={fetchDeleteNamespaceIfNeeded}
        />
        <div className="content-block">
          <div className="container no-back">{this.renderNamespacesList()}</div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getNamespacesReducer,
    deleteNamespaceReducer,
    createExternalServiceReducer,
    createInternalServiceReducer
  }: ReduxState) => ({
    getNamespacesReducer,
    deleteNamespaceReducer,
    createExternalServiceReducer,
    createInternalServiceReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetNamespacesIfNeeded: () =>
      dispatch(actionGetNamespaces.fetchGetNamespacesIfNeeded()),
    fetchDeleteNamespaceIfNeeded: (idName: string) =>
      dispatch(actionDeleteNamespaces.fetchDeleteNamespaceIfNeeded(idName)),
    requestInvalidToken: () => dispatch({ type: 'GET_INVALID_TOKEN' })
  })
);

export default connector(Namespaces);
