import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';
// import { Base64 } from 'js-base64';
import cookie from 'react-cookies';

import type { Dispatch, ReduxState } from '../../types';
import { routerLinks } from '../../config';
import * as actionGetConfigMap from '../../actions/configMapActions/getConfigMap';
import ConfigMapFile from '../../components/ConfigMapFile';
import {
  GET_CONFIG_MAP_FAILURE,
  GET_CONFIG_MAP_INVALID,
  GET_CONFIG_MAP_REQUESTING
} from '../../constants/configMapConstants/getConfigMap';
import ConfigMapFilesSidebar from '../../components/ConfigMapFilesSidebar';
import arrow from '../../images/arrowBack.svg';

type Props = {
  history: Object,
  match: Object,
  getConfigMapReducer: Object,
  fetchGetConfigMapIfNeeded: (idName: string, idCnf: string) => void
};

class ConfigMaps extends PureComponent<Props> {
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentDidMount() {
    const { fetchGetConfigMapIfNeeded, match } = this.props;
    fetchGetConfigMapIfNeeded(match.params.idName, match.params.idCnf);
  }
  renderConfigMapSideBar = () => {
    const { getConfigMapReducer, match } = this.props;

    if (
      !getConfigMapReducer.readyStatus ||
      getConfigMapReducer.readyStatus === GET_CONFIG_MAP_INVALID ||
      getConfigMapReducer.readyStatus === GET_CONFIG_MAP_REQUESTING
    ) {
      return (
        <div>
          <img
            src={require('../../images/profile-sidebar-big.svg')}
            style={{ width: '100%', marginBotton: 25 }}
            alt="sidebar"
          />
          {new Array(4)
            .fill()
            .map(() => (
              <img
                key={_.uniqueId()}
                src={require('../../images/profile-sidebar-small.svg')}
                style={{ marginTop: 25, float: 'right' }}
                alt="sidebar"
              />
            ))}
        </div>
      );
    }

    if (getConfigMapReducer.readyStatus === GET_CONFIG_MAP_FAILURE) {
      return <p>Oops, Failed to load data of ConfigMaps Files!</p>;
    }

    return (
      <ConfigMapFilesSidebar
        configMapsFileData={getConfigMapReducer.data.data}
        currentNamespace={match.params.idName}
        idCnf={match.params.idCnf}
        currentConfigMapName={match.params.idCnf}
      />
    );
  };
  renderConfigMapFile = () => {
    const { getConfigMapReducer, match } = this.props;

    if (
      !getConfigMapReducer.readyStatus ||
      getConfigMapReducer.readyStatus === GET_CONFIG_MAP_INVALID ||
      getConfigMapReducer.readyStatus === GET_CONFIG_MAP_REQUESTING
    ) {
      return (
        <div>
          <div
            style={{
              height: '30px',
              borderRadius: '2px',
              backgroundColor: '#f6f6f6'
            }}
          />
          <div
            style={{
              height: '30px',
              borderRadius: '2px',
              backgroundColor: '#fff'
            }}
          />
          <div
            style={{
              height: '300px',
              borderRadius: '2px',
              backgroundColor: '#f6f6f6'
            }}
          />
        </div>
      );
    }

    if (getConfigMapReducer.readyStatus === GET_CONFIG_MAP_FAILURE) {
      return <p>Oops, Failed to load data of ConfigMaps Files!</p>;
    }

    return (
      <ConfigMapFile
        configMapsFileData={getConfigMapReducer.data.data}
        currentFile={match.params.idFile}
      />
    );
  };

  render() {
    const { match } = this.props;
    return (
      <div>
        <Helmet
          title={`ConfigMap file ${match.params.idFile} in ${
            match.params.idName
          }`}
        />
        <Link
          to={routerLinks.getConfigMapsLink(match.params.idName)}
          style={{
            cursor: 'pointer'
          }}
        >
          <div className="header" style={{ zIndex: '-100' }}>
            <div className="header-top">
              <div
                className="header-top-container container"
                style={{
                  color: '#29abe2',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <div className="arrow-back">
                  <img src={arrow} alt="arrow-back" />
                </div>
                <div style={{ height: '27px' }}>CONFIGMAP LIST</div>
              </div>
            </div>
          </div>
        </Link>
        <div className="content-block">
          <div className="container no-back">
            <div className="row double two-columns">
              <div className="col-md-3 col-lg-3 col-xl-2">
                <div className="content-block account-info">
                  <div
                    className="content-block-container container no-back pl-0 pr-0 container-fluid"
                    style={{ paddingTop: '1px' }}
                  >
                    {this.renderConfigMapSideBar()}
                  </div>
                </div>
              </div>
              <div className="col-md-9 col-lg-9 col-xl-10">
                <div className="content-block">
                  <div className="content-block-container content-block-container__configmap-view container container-fluid">
                    {this.renderConfigMapFile()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ getConfigMapReducer }: ReduxState) => ({
    getConfigMapReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetConfigMapIfNeeded: (idName: string, idCnf: string) =>
      dispatch(actionGetConfigMap.fetchGetConfigMapIfNeeded(idName, idCnf))
  })
);

export default connector(ConfigMaps);
