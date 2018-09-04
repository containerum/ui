/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import Scrollspy from 'react-scrollspy';
import cookie from 'react-cookies';

import scrollById from '../../functions/scrollById';
import { routerLinks } from '../../config';
import * as actionGetVolume from '../../actions/volumeActions/getVolume';
import * as actionUpdateCustomVolume from '../../actions/volumeActions/updateCustomVolume';
import {
  GET_VOLUME_INVALID,
  GET_VOLUME_REQUESTING,
  GET_VOLUME_FAILURE,
  GET_VOLUME_SUCCESS
} from '../../constants/volumeConstants/getVolume';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';
import type { Dispatch, ReduxState } from '../../types';
import NavigationHeaderItem from '../NavigationHeader';
import LoadButton from '../../components/LoadButton';
import Notification from '../Notification';
import UpdateCustomVolumeInfo from '../../components/CreateUpdateCustomVolumeInfo';
import globalStyles from '../../theme/global.scss';

type Props = {
  match: Object,
  history: Object,
  getVolumeReducer: Object,
  getProfileReducer: Object,
  updateCustomVolumeReducer: Object,
  fetchGetVolumeIfNeeded: (idName: string, idVol: string) => void,
  fetchUpdateCustomVolumeIfNeeded: (data: Object, idName: string) => void
};

export class UpdateCustomVolume extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
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
    const { fetchGetVolumeIfNeeded, match } = this.props;
    fetchGetVolumeIfNeeded(match.params.idName, match.params.idVol);
  }
  componentWillUpdate(nextProps) {
    const { getProfileReducer, getVolumeReducer, history } = this.props;
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
      getVolumeReducer.readyStatus !== nextProps.getVolumeReducer.readyStatus &&
      nextProps.getVolumeReducer.readyStatus === GET_VOLUME_SUCCESS
    ) {
      const {
        capacity,
        name,
        storage_name: storageName
      } = nextProps.getVolumeReducer.data;
      this.setState({
        ...this.state,
        label: name,
        currentStorage: storageName,
        storage: capacity
      });
    }
  }

  handleSubmitUpdateCustomVolume = e => {
    e.preventDefault();
    const { fetchUpdateCustomVolumeIfNeeded, match } = this.props;
    fetchUpdateCustomVolumeIfNeeded(this.state, match.params.idName);
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

  renderUpdateCustomVolumeSidebar = () => {
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
  renderUpdateCustomVolume = () => {
    const { getVolumeReducer } = this.props;
    if (
      !getVolumeReducer.readyStatus ||
      getVolumeReducer.readyStatus === GET_VOLUME_INVALID ||
      getVolumeReducer.readyStatus === GET_VOLUME_REQUESTING
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

    if (getVolumeReducer.readyStatus === GET_VOLUME_FAILURE) {
      return <p>Oops, Failed to load data of Volume!</p>;
    }

    const { label, currentStorage, storage } = this.state;
    return (
      <UpdateCustomVolumeInfo
        type="update"
        label={label}
        linkedStorage={[{ name: currentStorage }]}
        currentStorage={currentStorage}
        storage={storage}
        handleChangeInput={(type, value) => this.handleChangeInput(type, value)}
      />
    );
  };

  render() {
    const { updateCustomVolumeReducer, match } = this.props;
    return (
      <div>
        <Helmet title="Update Custom Volume" />
        <div className="container-fluid breadcrumbNavigation">
          <NavigationHeaderItem
            idName={match.params.idName}
            IdUpdate="volume"
          />
        </div>
        <Notification
          status={updateCustomVolumeReducer.status}
          name={updateCustomVolumeReducer.idDep}
          method={updateCustomVolumeReducer.method}
          errorMessage={updateCustomVolumeReducer.err}
        />
        <div className={globalStyles.contentBlock}>
          <div className={`container ${globalStyles.containerNoBackground}`}>
            <div className="row pageWidth">
              <div
                className="col-md-3 sideMenu"
                style={{ padding: '20px 0px' }}
              >
                {this.renderUpdateCustomVolumeSidebar()}
              </div>
              <div className="col-md-9 pageContent">
                <form onSubmit={e => this.handleSubmitUpdateCustomVolume(e)}>
                  <div className="blockContainer blockAddContainerPadin">
                    <div className="col-md-12">
                      {this.renderUpdateCustomVolume()}
                    </div>
                  </div>
                  <LoadButton
                    type="submit"
                    buttonText="Update volume"
                    isFetching={updateCustomVolumeReducer.isFetching}
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
    updateCustomVolumeReducer,
    getVolumeReducer,
    getProfileReducer,
    getStoragesReducer
  }: ReduxState) => ({
    updateCustomVolumeReducer,
    getVolumeReducer,
    getProfileReducer,
    getStoragesReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetVolumeIfNeeded: (idName: string, idVol: string) =>
      dispatch(actionGetVolume.fetchGetVolumeIfNeeded(idName, idVol)),
    fetchUpdateCustomVolumeIfNeeded: (data: Object, idName: string) =>
      dispatch(
        actionUpdateCustomVolume.fetchUpdateCustomVolumeIfNeeded(data, idName)
      )
  })
);

export default connector(UpdateCustomVolume);
