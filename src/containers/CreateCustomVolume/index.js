/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import Scrollspy from 'react-scrollspy';
import className from 'classnames/bind';
import cookie from 'react-cookies';

import scrollById from '../../functions/scrollById';
import { routerLinks } from '../../config';
import * as actionCreateCustomVolume from '../../actions/volumeActions/createCustomVolume';
import * as actionGetStorages from '../../actions/storagesActions/getStorages';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';
import type { Dispatch, ReduxState } from '../../types';
import NavigationHeaderItem from '../NavigationHeader';
import LoadButton from '../../components/LoadButton';
import Notification from '../Notification';
import CreateCustomVolumeInfo from '../../components/CreateUpdateCustomVolumeInfo';
import globalStyles from '../../theme/global.scss';
import {
  GET_STORAGES_FAILURE,
  GET_STORAGES_INVALID,
  GET_STORAGES_REQUESTING,
  GET_STORAGES_SUCCESS
} from '../../constants/storagesConstants/getStorages';
import InfoMessageItem from '../../components/InfoMessage';

const globalClass = className.bind(globalStyles);
const containerClassName = globalClass(
  'containerFluid',
  'breadcrumbsNavigation'
);

type Props = {
  match: Object,
  history: Object,
  getProfileReducer: Object,
  getStoragesReducer: Object,
  createCustomVolumeReducer: Object,
  fetchCreateCustomVolumeIfNeeded: (idName: string, data: Object) => void,
  fetchGetStoragesIfNeeded: () => void
};

export class CreateCustomVolume extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isVisibleMessage: false,
      label: '',
      linkedStorage: [],
      currentStorage: '',
      storage: 50
    };
  }
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentDidMount() {
    this.props.fetchGetStoragesIfNeeded();
  }
  componentWillUpdate(nextProps) {
    const { getProfileReducer, getStoragesReducer, history } = this.props;
    if (
      getProfileReducer.readyStatus !==
        nextProps.getProfileReducer.readyStatus &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      if (nextProps.getProfileReducer.data.role !== 'admin') {
        history.push(routerLinks.namespaces);
      }
    }
    if (
      getStoragesReducer.readyStatus !==
        nextProps.getStoragesReducer.readyStatus &&
      nextProps.getStoragesReducer.readyStatus === GET_STORAGES_SUCCESS
    ) {
      const storagesReducer = nextProps.getStoragesReducer.data;
      this.setState({
        ...this.state,
        isVisibleMessage: !storagesReducer.length,
        linkedStorage: storagesReducer,
        currentStorage: storagesReducer.length ? storagesReducer[0].name : ''
      });
    }
  }

  handleSubmitCreateCustomVolume = e => {
    e.preventDefault();
    const { match, fetchCreateCustomVolumeIfNeeded } = this.props;
    fetchCreateCustomVolumeIfNeeded(match.params.idName, this.state);
  };
  handleChangeInput = (type, value) => {
    this.setState({
      ...this.state,
      [`${type}`]: value
    });
  };
  handleChange = e => {
    this.setState({
      ...this.state,
      currentStorage: e.target.value
    });
  };

  renderCreateCustomVolumeSidebar = () => {
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
  renderCreateCustomVolume = () => {
    const { getStoragesReducer } = this.props;
    if (
      !getStoragesReducer.readyStatus ||
      getStoragesReducer.readyStatus === GET_STORAGES_INVALID ||
      getStoragesReducer.readyStatus === GET_STORAGES_REQUESTING
    ) {
      return (
        <div className="row">
          <div
            className="col-md-12"
            style={{
              height: '370px',
              backgroundColor: '#f6f6f6'
            }}
          />
        </div>
      );
    }

    if (getStoragesReducer.readyStatus === GET_STORAGES_FAILURE) {
      return <p>Oops, Failed to load data of Project!</p>;
    }

    const { label, linkedStorage, currentStorage, storage } = this.state;
    return (
      <CreateCustomVolumeInfo
        label={label}
        linkedStorage={linkedStorage}
        currentStorage={currentStorage}
        storage={storage}
        handleChangeInput={(type, value) => this.handleChangeInput(type, value)}
        handleChange={this.handleChange}
      />
    );
  };

  render() {
    const { createCustomVolumeReducer, getProfileReducer } = this.props;
    const { isVisibleMessage } = this.state;
    const role = getProfileReducer.data ? getProfileReducer.data.role : null;
    return (
      <div>
        <Helmet title="Create Custom Volume" />
        <div
          className="container-fluid breadcrumbNavigation"
          style={isVisibleMessage ? { marginBottom: 0 } : {}}
        >
          <NavigationHeaderItem IdCreate="volume" idName="new" />
        </div>
        {role &&
          isVisibleMessage && (
            <div className={containerClassName}>
              <InfoMessageItem type="volume" role={role} />
            </div>
          )}
        <Notification
          status={createCustomVolumeReducer.status}
          name={createCustomVolumeReducer.idVol}
          method={createCustomVolumeReducer.method}
          errorMessage={createCustomVolumeReducer.err}
        />
        <div className={globalStyles.contentBlock}>
          <div className={`container ${globalStyles.containerNoBackground}`}>
            <div className="row pageWidth">
              <div
                className="col-md-3 sideMenu"
                style={{ padding: '20px 0px' }}
              >
                {this.renderCreateCustomVolumeSidebar()}
              </div>
              <div className="col-md-9 pageContent">
                <form onSubmit={e => this.handleSubmitCreateCustomVolume(e)}>
                  <div className="blockContainer blockAddContainerPadin">
                    <div className="col-md-12">
                      {this.renderCreateCustomVolume()}
                    </div>
                  </div>
                  <LoadButton
                    type="submit"
                    buttonText="Create volume"
                    isFetching={createCustomVolumeReducer.isFetching}
                    baseClassButton="btnDeployment btnService"
                    disabled={!this.state.currentStorage}
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
    createCustomVolumeReducer,
    getProfileReducer,
    getStoragesReducer
  }: ReduxState) => ({
    createCustomVolumeReducer,
    getProfileReducer,
    getStoragesReducer
  }),
  (dispatch: Dispatch) => ({
    fetchCreateCustomVolumeIfNeeded: (idName: string, data: Object) =>
      dispatch(
        actionCreateCustomVolume.fetchCreateCustomVolumeIfNeeded(idName, data)
      ),
    fetchGetStoragesIfNeeded: () =>
      dispatch(actionGetStorages.fetchGetStoragesIfNeeded())
  })
);

export default connector(CreateCustomVolume);
