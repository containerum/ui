/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import className from 'classnames/bind';
import cookie from 'react-cookies';

import { routerLinks } from '../../config';
import type { Dispatch, ReduxState } from '../../types';
import * as actionGetSecrets from '../../actions/secretsActions/getSecrets';
import * as actionDeleteSecret from '../../actions/secretActions/deleteSecret';
import {
  DELETE_SECRET_SUCCESS,
  DELETE_SECRET_REQUESTING
} from '../../constants/secretConstants/deleteSecret';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';
import SecretsList from '../../components/SecretsList';
import Notification from '../Notification';

import globalStyles from '../../theme/global.scss';
import {
  GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING
} from '../../constants/namespacesConstants/getNamespaces';
import {
  GET_SECRETS_FAILURE,
  GET_SECRETS_INVALID,
  GET_SECRETS_REQUESTING,
  GET_SECRETS_SUCCESS
} from '../../constants/secretsConstants/getSecrets';

const globalClass = className.bind(globalStyles);
const contentClassName = globalClass(
  'contentBlockContent',
  'contentBlockContentFull'
);

type Props = {
  history: Object,
  match: Object,
  getProfileReducer: Object,
  getSecretsReducer: Object,
  getNamespacesReducer: Object,
  deleteSecretReducer: Object,
  fetchGetSecretsIfNeeded: (idName: string) => void,
  fetchDeleteSecretIfNeeded: (idName: string, idSecret: string) => void
};

export class Secrets extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      role: '',
      displayedSecrets: []
    };
  }
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentDidMount() {
    const { fetchGetSecretsIfNeeded, match } = this.props;
    fetchGetSecretsIfNeeded(match.params.idName);
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getSecretsReducer.readyStatus !==
        nextProps.getSecretsReducer.readyStatus &&
      nextProps.getSecretsReducer.readyStatus === GET_SECRETS_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedSecrets: nextProps.getSecretsReducer.data
      });
    }
    if (
      this.props.getProfileReducer.readyStatus !==
        nextProps.getProfileReducer.readyStatus &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      this.setState({
        ...this.state,
        role: nextProps.getProfileReducer.data.role
      });
    }
    if (
      this.props.deleteSecretReducer.readyStatus !==
        nextProps.deleteSecretReducer.readyStatus &&
      nextProps.deleteSecretReducer.readyStatus === DELETE_SECRET_SUCCESS
    ) {
      const displayedDep = this.state.displayedSecrets.filter(
        secret => nextProps.deleteSecretReducer.idSecret !== secret.name
      );
      this.setState({
        ...this.state,
        displayedSecrets: displayedDep
      });
    }
  }

  onHandleDelete = idSecret => {
    const { fetchDeleteSecretIfNeeded, match } = this.props;
    fetchDeleteSecretIfNeeded(match.params.idName, idSecret);
  };

  renderSecretsList = () => {
    const {
      getSecretsReducer,
      getNamespacesReducer,
      deleteSecretReducer,
      match
    } = this.props;

    if (
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING ||
      !getSecretsReducer.readyStatus ||
      getSecretsReducer.readyStatus === GET_SECRETS_INVALID ||
      getSecretsReducer.readyStatus === GET_SECRETS_REQUESTING ||
      deleteSecretReducer.readyStatus === DELETE_SECRET_REQUESTING
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
      getSecretsReducer.readyStatus === GET_SECRETS_FAILURE
    ) {
      return <p>Oops, Failed to load data of Secrets!</p>;
    }

    return (
      <SecretsList
        data={this.state.displayedSecrets}
        dataNamespace={getNamespacesReducer.data.find(
          namespace => namespace.id === match.params.idName
        )}
        handleDeleteSecret={idSecret => this.onHandleDelete(idSecret)}
        history={this.props.history}
        role={this.state.role}
        idName={match.params.idName}
      />
    );
  };

  render() {
    const { status, idSecret, err } = this.props.deleteSecretReducer;
    return (
      <div>
        <Notification status={status} name={idSecret} errorMessage={err} />
        <div className={contentClassName}>
          <div className="tab-content">
            <div className="tab-pane active">{this.renderSecretsList()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getSecretsReducer,
    getNamespacesReducer,
    deleteSecretReducer,
    getProfileReducer
  }: ReduxState) => ({
    getSecretsReducer,
    getNamespacesReducer,
    deleteSecretReducer,
    getProfileReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetSecretsIfNeeded: (idName: string) =>
      dispatch(actionGetSecrets.fetchGetSecretsIfNeeded(idName)),
    fetchDeleteSecretIfNeeded: (idName: string, idSecret: string) =>
      dispatch(actionDeleteSecret.fetchDeleteSecretIfNeeded(idName, idSecret))
  })
);

export default connector(Secrets);
