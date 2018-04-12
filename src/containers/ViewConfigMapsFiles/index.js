import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
// import { Base64 } from 'js-base64';

import type { Dispatch, ReduxState } from '../../types';
import * as actionGetConfigMap from '../../actions/configMapActions/getConfigMap';
import ConfigMapFile from '../../components/ConfigMapFile';
import {
  GET_CONFIG_MAP_FAILURE,
  GET_CONFIG_MAP_INVALID,
  GET_CONFIG_MAP_REQUESTING
} from '../../constants/configMapConstants/getConfigMap';

type Props = {
  getConfigMapReducer: Object,
  fetchGetConfigMapIfNeeded: (idName: string, idCnf: string) => void,
  match: Object
};

class ConfigMaps extends PureComponent<Props> {
  componentDidMount() {
    const { fetchGetConfigMapIfNeeded, match } = this.props;
    fetchGetConfigMapIfNeeded(match.params.idName, match.params.idCnf);
  }
  renderConfigMapList = () => {
    const { getConfigMapReducer } = this.props;

    if (
      !getConfigMapReducer.readyStatus ||
      getConfigMapReducer.readyStatus === GET_CONFIG_MAP_INVALID ||
      getConfigMapReducer.readyStatus === GET_CONFIG_MAP_REQUESTING
    ) {
      return (
        <div
          style={{
            height: '100px',
            margin: '20px 30px',
            borderRadius: '2px',
            backgroundColor: '#f6f6f6'
          }}
        />
      );
    }

    if (getConfigMapReducer.readyStatus === GET_CONFIG_MAP_FAILURE) {
      return <p>Oops, Failed to load data of ConfigMaps Files!</p>;
    }

    return (
      <ConfigMapFile configMapsFileData={this.props.getConfigMapReducer.data} />
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
        <div className="container no-back">
          <div className="content-block">
            <div className="row double two-columns">
              <div className="col-md-3 col-lg-3 col-xl-2" />
              <div className="col-md-9 col-lg-9 col-xl-10">
                <div className="container container__webhook">
                  <div className="block-item">
                    <div>
                      <div className="block-item__title">Add ConfigMap</div>
                      <div className="row">
                        <div className="col-md-10">
                          <div className="light-text">
                            Here you can configure a ConfigMap to decouple
                            configuration artifacts from image content
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">{this.renderConfigMapList()}</div>
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
