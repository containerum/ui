/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';

import globalStyles from '../../theme/global.scss';
import styles from './index.scss';

import * as actionGetNamespaces from '../../actions/namespacesActions/getNamespaces';
import * as actionDeleteNamespaces from '../../actions/namespaceActions/deleteNamespace';
import {
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING,
  GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_SUCCESS
} from '../../constants/namespacesConstants/getNamespaces';
import {
  GET_PROFILE_FAILURE,
  GET_PROFILE_INVALID,
  GET_PROFILE_REQUESTING
} from '../../constants/profileConstants/getProfile';
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
import { sourceType } from '../../config';

type Props = {
  history: Object,
  getNamespacesReducer: NamespacesType,
  deleteNamespaceReducer: NamespaceType,
  getProfileReducer: Object,
  fetchGetNamespacesIfNeeded: () => void,
  fetchDeleteNamespaceIfNeeded: (idName: string) => void,
  createExternalServiceReducer: Object,
  createInternalServiceReducer: Object
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
  handleChangeInputSearchNamespace = name => {
    const nameToLowerCase = name.toLowerCase();
    const { data } = this.props.getNamespacesReducer;
    if (nameToLowerCase.length > 1) {
      const displayedNS = data.filter(
        namespace =>
          namespace.label
            ? namespace.label.includes(nameToLowerCase)
            : namespace.name.includes(nameToLowerCase)
      );
      this.setState({
        ...this.state,
        displayedNamespaces: displayedNS
      });
    } else {
      this.setState({
        ...this.state,
        displayedNamespaces: data
      });
    }
  };

  renderNamespacesList = () => {
    const {
      getNamespacesReducer,
      getProfileReducer,
      deleteNamespaceReducer
    } = this.props;

    if (
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING ||
      !getProfileReducer.readyStatus ||
      getProfileReducer.readyStatus === GET_PROFILE_INVALID ||
      getProfileReducer.readyStatus === GET_PROFILE_REQUESTING ||
      deleteNamespaceReducer.readyStatus === DELETE_NAMESPACE_REQUESTING
    ) {
      return (
        <div className="row double">
          {new Array(3).fill().map(() => (
            <div key={_.uniqueId()} className="col-md-4 align-middle">
              <img
                className={globalStyles.contentBlockContainerImg}
                src={ns}
                alt="ns"
              />
            </div>
          ))}
        </div>
      );
    }

    if (
      getNamespacesReducer.readyStatus === GET_NAMESPACES_FAILURE ||
      getProfileReducer.readyStatus === GET_PROFILE_FAILURE
    ) {
      return <p>Oops, Failed to load data of Namespaces!</p>;
    }

    return (
      <div>
        {sourceType !== 'ONLINE' &&
          getProfileReducer.data.role === 'admin' && (
            <div
              className="row double"
              style={{
                marginBottom: 0,
                marginTop: 30
              }}
            >
              <div className={`col-md-4 ${styles.formSearchNames}`}>
                <input
                  type="search"
                  className={styles.searchNamesInput}
                  placeholder="Search..."
                  onChange={e =>
                    this.handleChangeInputSearchNamespace(e.target.value)
                  }
                />
              </div>
            </div>
          )}
        <NamespacesList
          data={this.state.displayedNamespaces}
          role={getProfileReducer.data.role}
          handleDeleteNamespace={idName => this.handleDeleteNamespace(idName)}
          history={this.props.history}
        />
      </div>
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
        <div className={globalStyles.contentBlock}>
          <div className={`container ${globalStyles.containerNoBackground}`}>
            {this.renderNamespacesList()}
          </div>
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
    createInternalServiceReducer,
    getProfileReducer
  }: ReduxState) => ({
    getNamespacesReducer,
    deleteNamespaceReducer,
    createExternalServiceReducer,
    createInternalServiceReducer,
    getProfileReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetNamespacesIfNeeded: () =>
      dispatch(actionGetNamespaces.fetchGetNamespacesIfNeeded()),
    fetchDeleteNamespaceIfNeeded: (idName: string) =>
      dispatch(actionDeleteNamespaces.fetchDeleteNamespaceIfNeeded(idName))
  })
);

export default connector(Namespaces);
