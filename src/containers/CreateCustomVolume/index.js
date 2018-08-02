/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
// import _ from 'lodash/fp';
import Scrollspy from 'react-scrollspy';
import cookie from 'react-cookies';

import scrollById from '../../functions/scrollById';
import { routerLinks } from '../../config';
import * as actionCreateCustomVolume from '../../actions/volumeActions/createCustomVolume';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';
// import { CREATE_CUSTOM_NAMESPACE_SUCCESS } from '../../constants/namespaceConstants/createCustomVolume';
import type { Dispatch, ReduxState } from '../../types';
import NavigationHeaderItem from '../NavigationHeader';
import LoadButton from '../../components/LoadButton';
import Notification from '../Notification';
import CreateCustomVolumeInfo from '../../components/CreateUpdateCustomVolumeInfo';
// import Name from '../../components/CreateNamespaceCards/Name';
import globalStyles from '../../theme/global.scss';

type Props = {
  match: Object,
  history: Object,
  getProfileReducer: Object,
  createCustomVolumeReducer: Object,
  fetchCreateCustomVolumeIfNeeded: (idName: string, data: Object) => void
};

export class CreateCustomVolume extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      storage: 500
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
    const { label, storage } = this.state;
    return (
      <CreateCustomVolumeInfo
        label={label}
        storage={storage}
        handleChangeInput={(type, value) => this.handleChangeInput(type, value)}
      />
    );
  };

  render() {
    const { createCustomVolumeReducer } = this.props;
    return (
      <div>
        <Helmet title="Create Custom Volume" />
        <div className="container-fluid breadcrumbNavigation">
          <NavigationHeaderItem IdCreate="volume" idName="new" />
        </div>
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
  ({ createCustomVolumeReducer, getProfileReducer }: ReduxState) => ({
    createCustomVolumeReducer,
    getProfileReducer
  }),
  (dispatch: Dispatch) => ({
    fetchCreateCustomVolumeIfNeeded: (idName: string, data: Object) =>
      dispatch(
        actionCreateCustomVolume.fetchCreateCustomVolumeIfNeeded(idName, data)
      )
  })
);

export default connector(CreateCustomVolume);
