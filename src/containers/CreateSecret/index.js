/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import Scrollspy from 'react-scrollspy';
import cookie from 'react-cookies';
import _ from 'lodash/fp';

import scrollById from '../../functions/scrollById';
import { routerLinks } from '../../config';
import * as actionCreateSecret from '../../actions/secretActions/createSecret';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';
import type { Dispatch, ReduxState } from '../../types';
import NavigationHeaderItem from '../NavigationHeader';
import LoadButton from '../../components/LoadButton';
import Notification from '../Notification';
import CreateSecretInfo from '../../components/CreateUpdateSecretInfo';
import globalStyles from '../../theme/global.scss';

type Props = {
  match: Object,
  history: Object,
  getProfileReducer: Object,
  createSecretReducer: Object,
  fetchCreateSecretIfNeeded: (idName: string, data: Object) => void
};

export class CreateSecret extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      url: '',
      records: [{ id: _.uniqueId(), key: '', value: '' }]
    };
  }
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentWillUpdate(nextProps) {
    const { getProfileReducer, history } = this.props;
    if (
      getProfileReducer.readyStatus !==
        nextProps.getProfileReducer.readyStatus &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      if (nextProps.getProfileReducer.data.role !== 'admin') {
        history.push(routerLinks.namespaces);
      }
    }
  }
  handleSubmitCreateSecret = e => {
    e.preventDefault();
    const { match, fetchCreateSecretIfNeeded } = this.props;
    fetchCreateSecretIfNeeded(match.params.idName, this.state);
  };
  handleChangeInput = (type, value) => {
    this.setState({
      ...this.state,
      [`${type}`]: value
    });
  };
  handleClickAddRecord = () => {
    this.setState({
      ...this.state,
      records: [...this.state.records, { id: _.uniqueId(), key: '', value: '' }]
    });
  };
  handleClickRemoveRecord = id => {
    const newRecords = Object.assign([], this.state.records);
    if (newRecords.length > 1) {
      this.setState({
        ...this.state,
        records: newRecords.filter(record => record.id !== id)
      });
    } else {
      this.setState({
        ...this.state,
        records: [{ id: _.uniqueId(), key: '', value: '' }]
      });
    }
  };
  handleChangeInputRecord = (value, index, type) => {
    const newRecords = Object.assign([], this.state.records);
    newRecords[index][`${type}`] = value;
    this.setState({
      ...this.state,
      records: newRecords
    });
  };

  renderCreateSecretSidebar = () => {
    const arrayOfLinks = ['name', 'parameters'];
    return (
      <Scrollspy
        items={arrayOfLinks}
        onUpdate={this.handleUpdateMenu}
        style={{
          padding: '20px 0'
        }}
        currentClassName="active"
      >
        <div className="sideMenuHeader">
          <div
            onClick={() => scrollById('name')}
            onKeyPress={() => scrollById('name')}
            role="presentation"
          >
            name
          </div>
        </div>
        <div className="sideMenuHeader">
          <div
            onClick={() => scrollById('parameters')}
            onKeyPress={() => scrollById('parameters')}
            role="presentation"
          >
            parameters
          </div>
        </div>
      </Scrollspy>
    );
  };
  renderCreateSecret = () => {
    const { label, url, records } = this.state;
    return (
      <CreateSecretInfo
        label={label}
        url={url}
        records={records}
        handleChangeInput={this.handleChangeInput}
        handleClickAddRecord={this.handleClickAddRecord}
        handleClickRemoveRecord={this.handleClickRemoveRecord}
        handleChangeInputRecord={this.handleChangeInputRecord}
      />
    );
  };

  render() {
    const { createSecretReducer, match } = this.props;
    return (
      <div>
        <Helmet title="Create Secret" />
        <div className="container-fluid breadcrumbNavigation">
          <NavigationHeaderItem
            IdCreate="secret"
            idName={match.params.idName}
          />
        </div>
        <Notification
          status={createSecretReducer.status}
          name={createSecretReducer.idVol}
          method={createSecretReducer.method}
          errorMessage={createSecretReducer.err}
        />
        <div className={globalStyles.contentBlock}>
          <div className={`container ${globalStyles.containerNoBackground}`}>
            <div className="row pageWidth">
              <div
                className="col-md-3 sideMenu"
                style={{ padding: '20px 0px' }}
              >
                {this.renderCreateSecretSidebar()}
              </div>
              <div className="col-md-9 pageContent">
                <form onSubmit={e => this.handleSubmitCreateSecret(e)}>
                  <div className="blockContainer blockAddContainerPadin">
                    <div className="col-md-12">{this.renderCreateSecret()}</div>
                  </div>
                  <LoadButton
                    type="submit"
                    buttonText="Create secret"
                    isFetching={createSecretReducer.isFetching}
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
  ({ createSecretReducer, getProfileReducer }: ReduxState) => ({
    createSecretReducer,
    getProfileReducer
  }),
  (dispatch: Dispatch) => ({
    fetchCreateSecretIfNeeded: (idName: string, data: Object) =>
      dispatch(actionCreateSecret.fetchCreateSecretIfNeeded(idName, data))
  })
);

export default connector(CreateSecret);
