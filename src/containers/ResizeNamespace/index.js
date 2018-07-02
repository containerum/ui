/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import className from 'classnames/bind';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';

import * as actionGetNamespacesTariffs from '../../actions/namespacesActions/getNamespacesTariffs';
import * as actionGetNamespace from '../../actions/namespaceActions/getNamespace';
import * as actionGetNamespaceUsersAccess from '../../actions/namespaceActions/getNamespaceUsersAccess';
import * as actionResizeNamespace from '../../actions/namespaceActions/resizeNamespace';
import {
  GET_NAMESPACES_TARIFFS_INVALID,
  GET_NAMESPACES_TARIFFS_REQUESTING,
  GET_NAMESPACES_TARIFFS_FAILURE
} from '../../constants/namespacesConstants/getNamespacesTariffs';
import {
  GET_NAMESPACE_INVALID,
  GET_NAMESPACE_REQUESTING,
  GET_NAMESPACE_FAILURE
} from '../../constants/namespaceConstants/getNamespace';
import {
  GET_NAMESPACE_USERS_ACCESS_INVALID,
  GET_NAMESPACE_USERS_ACCESS_REQUESTING,
  GET_NAMESPACE_USERS_ACCESS_FAILURE
} from '../../constants/namespaceConstants/getNamespaceUsersAccess';
import type {
  Namespaces as NamespacesType,
  Dispatch,
  ReduxState
} from '../../types';
import TariffsNamespacesList from '../../components/TariffsNamespacesList';
import ResizeModal from '../../components/CustomerModal/ResizeModal';
import Notification from '../Notification';

import globalStyles from '../../theme/global.scss';
import styles from '../CreateNamespace/index.scss';

const globalClass = className.bind(globalStyles);

const containerClassName = globalClass(
  'contentBlockContainer',
  'container',
  'containerNoBackground',
  'paddingX0'
);

type Props = {
  getNamespacesTariffsReducer: NamespacesType,
  getNamespaceReducer: Object,
  getNamespaceUsersAccessReducer: Object,
  resizeNamespaceReducer: Object,
  fetchGetNamespacesTariffsIfNeeded: () => void,
  fetchGetNamespaceIfNeeded: (idName: string) => void,
  fetchGetNamespaceUsersAccessIfNeeded: (idName: string) => void,
  fetchResizeNamespaceIfNeeded: (idName: string, tariff: string) => void,
  match: Object
};

export class ResizeNamespace extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      isOpened: false,
      NSTariffId: null,
      NSTariffName: null,
      NSTariffCpu: null,
      NSTariffMemory: null,
      NSTariffVolume: null,
      NSTariffPrice: null,
      NSTariffPricePerDay: null
    };
  }
  componentDidMount() {
    const {
      match,
      fetchGetNamespacesTariffsIfNeeded,
      fetchGetNamespaceIfNeeded,
      fetchGetNamespaceUsersAccessIfNeeded
    } = this.props;
    fetchGetNamespacesTariffsIfNeeded();
    fetchGetNamespaceIfNeeded(match.params.idName);
    fetchGetNamespaceUsersAccessIfNeeded(match.params.idName);
  }
  handleOpenCloseModal = () => {
    this.setState({
      ...this.state,
      isOpened: !this.state.isOpened
    });
  };
  handleSelectTariff = tariff => {
    const {
      id,
      label,
      cpuLimit,
      memoryLimit,
      volumeSize,
      price,
      pricePerDay
    } = tariff;
    this.setState({
      ...this.state,
      isOpened: true,
      NSTariffId: id,
      NSTariffName: label,
      NSTariffCpu: cpuLimit,
      NSTariffMemory: memoryLimit,
      NSTariffVolume: volumeSize,
      NSTariffPrice: price,
      NSTariffPricePerDay: pricePerDay
    });
  };

  renderTariffsNamespacesList = () => {
    const {
      getNamespacesTariffsReducer,
      getNamespaceReducer,
      getNamespaceUsersAccessReducer
    } = this.props;
    if (
      !getNamespacesTariffsReducer.readyStatus ||
      getNamespacesTariffsReducer.readyStatus ===
        GET_NAMESPACES_TARIFFS_INVALID ||
      getNamespacesTariffsReducer.readyStatus ===
        GET_NAMESPACES_TARIFFS_REQUESTING ||
      (!getNamespaceReducer.readyStatus ||
        getNamespaceReducer.readyStatus === GET_NAMESPACE_INVALID ||
        getNamespaceReducer.readyStatus === GET_NAMESPACE_REQUESTING) ||
      (!getNamespaceUsersAccessReducer.readyStatus ||
        getNamespaceUsersAccessReducer.readyStatus ===
          GET_NAMESPACE_USERS_ACCESS_INVALID ||
        getNamespaceUsersAccessReducer.readyStatus ===
          GET_NAMESPACE_USERS_ACCESS_REQUESTING)
    ) {
      return (
        <div className="row">
          {new Array(8).fill().map(() => (
            <div key={_.uniqueId()} className="col-md-3">
              <div className={styles.namespacePlanBlockPlaceholder}>
                <img
                  src={require('../../images/add-ns-block.svg')}
                  alt="add-ns"
                />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (
      getNamespacesTariffsReducer.readyStatus ===
        GET_NAMESPACES_TARIFFS_FAILURE ||
      getNamespaceReducer.readyStatus === GET_NAMESPACE_FAILURE ||
      getNamespaceUsersAccessReducer.readyStatus ===
        GET_NAMESPACE_USERS_ACCESS_FAILURE
    ) {
      return <p>Oops, Failed to load data of Project!</p>;
    }

    return (
      <TariffsNamespacesList
        data={this.props.getNamespacesTariffsReducer.data}
        NSTariffName={this.state.NSTariffName}
        isFullDataOfProfile
        active={
          getNamespaceUsersAccessReducer.data
            ? getNamespaceUsersAccessReducer.data.tariff_id
            : null
        }
        handleSelectTariff={tariff => this.handleSelectTariff(tariff)}
        handleClickSelectTariff={this.handleOpenCloseModal}
      />
    );
  };

  render() {
    const {
      resizeNamespaceReducer,
      getNamespaceUsersAccessReducer,
      fetchResizeNamespaceIfNeeded,
      match
    } = this.props;
    const {
      NSTariffId,
      NSTariffName,
      NSTariffCpu,
      NSTariffMemory,
      NSTariffVolume,
      NSTariffPrice,
      NSTariffPricePerDay,
      isOpened
    } = this.state;

    const {
      status,
      idName,
      method,
      err,
      label: idLabel
    } = resizeNamespaceReducer;
    const label = getNamespaceUsersAccessReducer.data
      ? getNamespaceUsersAccessReducer.data.label
      : idName;
    // let currentNamespace;
    // if (getNamespacesReducer.readyStatus === GET_NAMESPACES_SUCCESS) {
    //   currentNamespace = getNamespacesReducer.data.find(
    //     namespace => namespace.id === IdName
    //   );
    // }
    return (
      <div>
        <Notification
          status={status}
          name={idLabel}
          method={method}
          errorMessage={err}
        />
        <ResizeModal
          label={label}
          type="Project"
          tariff={NSTariffName}
          id={NSTariffId}
          name={match.params.idName}
          data={{
            cpu: NSTariffCpu,
            memory: NSTariffMemory,
            volume: NSTariffVolume,
            price: NSTariffPrice,
            pricePerDay: NSTariffPricePerDay
          }}
          isOpened={isOpened}
          handleOpenCloseModal={this.handleOpenCloseModal}
          onHandleResize={fetchResizeNamespaceIfNeeded}
        />
        <Helmet title={`Resize Project - ${label}`} />
        <div className={globalStyles.contentBlock}>
          <div className={`${containerClassName} mt-0 container`}>
            <div className={`${globalStyles.contentBlockContent} mt-0`}>
              <div className={`${styles.namespacePlan} mt-0`}>
                <div className={styles.namespacePlanTitle}>
                  choose a project size for{' '}
                  <span style={{ color: '#29abe2' }}>{label}</span>
                </div>
              </div>
              {this.renderTariffsNamespacesList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getNamespacesTariffsReducer,
    resizeNamespaceReducer,
    getNamespaceUsersAccessReducer,
    getNamespaceReducer
  }: ReduxState) => ({
    getNamespacesTariffsReducer,
    resizeNamespaceReducer,
    getNamespaceUsersAccessReducer,
    getNamespaceReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetNamespacesTariffsIfNeeded: () =>
      dispatch(actionGetNamespacesTariffs.fetchGetNamespacesTariffsIfNeeded()),
    fetchResizeNamespaceIfNeeded: (
      idName: string,
      tariff: string,
      label: string
    ) =>
      dispatch(
        actionResizeNamespace.fetchResizeNamespaceIfNeeded(
          idName,
          tariff,
          label
        )
      ),
    fetchGetNamespaceIfNeeded: (idName: string) =>
      dispatch(actionGetNamespace.fetchGetNamespaceIfNeeded(idName)),
    fetchGetNamespaceUsersAccessIfNeeded: (idName: string) =>
      dispatch(
        actionGetNamespaceUsersAccess.fetchGetNamespaceUsersAccessIfNeeded(
          idName
        )
      )
  })
);

export default connector(ResizeNamespace);
