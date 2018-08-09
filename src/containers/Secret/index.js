/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import cookie from 'react-cookies';

import * as actionGetSecret from '../../actions/secretActions/getSecret';
import * as actionDeleteSecret from '../../actions/secretActions/deleteSecret';
import {
  GET_SECRET_FAILURE,
  GET_SECRET_INVALID,
  GET_SECRET_REQUESTING
} from '../../constants/secretConstants/getSecret';
import {
  DELETE_SECRET_SUCCESS,
  DELETE_SECRET_REQUESTING
} from '../../constants/secretConstants/deleteSecret';
import type { Dispatch, ReduxState } from '../../types';
import { routerLinks } from '../../config';
import SecretInfo from '../../components/SecretInfo';
import Notification from '../Notification';
import NavigationHeaderItem from '../NavigationHeader';
import globalStyles from '../../theme/global.scss';
import {
  GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING
} from '../../constants/namespacesConstants/getNamespaces';

type Props = {
  getSecretReducer: Object,
  getNamespacesReducer: Object,
  deleteSecretReducer: Object,
  fetchGetSecretIfNeeded: (idName: string, idSecret: string) => void,
  fetchDeleteSecretIfNeeded: (idName: string, idSecret: string) => void,
  match: Object,
  history: Object
};

export class Secret extends PureComponent<Props> {
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentDidMount() {
    const { fetchGetSecretIfNeeded, match } = this.props;
    fetchGetSecretIfNeeded(match.params.idName, match.params.idSecret);
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.deleteSecretReducer.readyStatus !==
        nextProps.deleteSecretReducer.readyStatus &&
      nextProps.deleteSecretReducer.readyStatus === DELETE_SECRET_SUCCESS
    ) {
      this.props.history.goBack();
    }
  }

  onHandleDelete = idSecret => {
    const { fetchDeleteSecretIfNeeded, match } = this.props;
    fetchDeleteSecretIfNeeded(match.params.idName, idSecret);
  };

  renderSecretInfo = () => {
    const {
      getSecretReducer,
      getNamespacesReducer,
      deleteSecretReducer,
      match
    } = this.props;

    if (
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING ||
      !getSecretReducer.readyStatus ||
      getSecretReducer.readyStatus === GET_SECRET_INVALID ||
      getSecretReducer.readyStatus === GET_SECRET_REQUESTING ||
      deleteSecretReducer.readyStatus === DELETE_SECRET_REQUESTING
    ) {
      return (
        <div
          className={`${globalStyles.container} container`}
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

    if (
      getNamespacesReducer.readyStatus === GET_NAMESPACES_FAILURE ||
      getSecretReducer.readyStatus === GET_SECRET_FAILURE
    ) {
      return <p>Oops, Failed to load data of Secret!</p>;
    }

    return (
      <SecretInfo
        dataSecret={getSecretReducer.data}
        handleDeleteSecret={this.onHandleDelete}
        idName={match.params.idName}
        idSecret={match.params.idSecret}
      />
    );
  };

  render() {
    const { match } = this.props;
    const { status, idSecret, err } = this.props.deleteSecretReducer;
    return (
      <div>
        <Helmet title={`Secret - ${match.params.idSecret}`} />
        <Notification status={status} name={idSecret} errorMessage={err} />
        <NavigationHeaderItem
          idName={match.params.idName}
          idSecret={match.params.idSecret}
        />
        {this.renderSecretInfo()}
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getSecretReducer,
    getNamespacesReducer,
    deleteSecretReducer
  }: ReduxState) => ({
    getSecretReducer,
    getNamespacesReducer,
    deleteSecretReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetSecretIfNeeded: (idName: string, idSecret: string) =>
      dispatch(actionGetSecret.fetchGetSecretIfNeeded(idName, idSecret)),
    fetchDeleteSecretIfNeeded: (idName: string, idSecret: string) =>
      dispatch(actionDeleteSecret.fetchDeleteSecretIfNeeded(idName, idSecret))
  })
);

export default connector(Secret);
