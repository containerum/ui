/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';

import * as actionGetVolumesTariffs from '../../actions/volumesActions/getVolumesTariffs';
import * as actionResizeVolume from '../../actions/volumeActions/resizeVolume';
import * as actionGetVolume from '../../actions/volumeActions/getVolume';
import {
  GET_VOLUMES_TARIFFS_INVALID,
  GET_VOLUMES_TARIFFS_REQUESTING,
  GET_VOLUMES_TARIFFS_FAILURE
  // GET_VOLUMES_TARIFFS_SUCCESS
} from '../../constants/volumesConstants/getVolumesTariffs';
import {
  GET_VOLUME_INVALID,
  GET_VOLUME_REQUESTING,
  GET_VOLUME_FAILURE
  // GET_VOLUME_SUCCESS
} from '../../constants/volumeConstants/getVolume';
import type { Dispatch, ReduxState } from '../../types';
import TariffsVolumesList from '../../components/TariffsVolumesList';
import ResizeModal from '../../components/CustomerModal/ResizeModal';
import Notification from '../Notification';

type Props = {
  getVolumesTariffsReducer: Object,
  resizeVolumeReducer: Object,
  getVolumeReducer: Object,
  fetchGetVolumesTariffsIfNeeded: () => void,
  fetchResizeVolumeIfNeeded: (idVol: string, tariff: string) => void,
  fetchGetVolumeIfNeeded: (idVol: string) => void,
  match: Object
};

// Export this for unit testing more easily
export class ResizeVolume extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      isOpened: false,
      VolTariffName: null,
      VolTariffVolume: null,
      VolTariffPrice: null,
      VolTariffStorageLimit: null,
      VolTariffPricePerDay: null
    };
  }
  componentDidMount() {
    const { match } = this.props;
    this.props.fetchGetVolumesTariffsIfNeeded();
    this.props.fetchGetVolumeIfNeeded(match.params.idVol);
  }
  handleOpenCloseModal = () => {
    this.setState({
      ...this.state,
      isOpened: !this.state.isOpened
    });
  };
  handleSelectTariff = tariff => {
    const { label, volumeSize, price, storageLimit, pricePerDay } = tariff;
    this.setState({
      ...this.state,
      isOpened: true,
      VolTariffName: label,
      VolTariffVolume: volumeSize,
      VolTariffPrice: price,
      VolTariffStorageLimit: storageLimit,
      VolTariffPricePerDay: pricePerDay
    });
  };

  renderTariffsVolumesList = () => {
    const { getVolumesTariffsReducer, getVolumeReducer } = this.props;
    if (
      !getVolumesTariffsReducer.readyStatus ||
      getVolumesTariffsReducer.readyStatus === GET_VOLUMES_TARIFFS_INVALID ||
      getVolumesTariffsReducer.readyStatus === GET_VOLUMES_TARIFFS_REQUESTING ||
      (!getVolumeReducer.readyStatus ||
        getVolumeReducer.readyStatus === GET_VOLUME_INVALID ||
        getVolumeReducer.readyStatus === GET_VOLUME_REQUESTING)
    ) {
      return (
        <div className="row">
          {new Array(8).fill().map(() => (
            <div key={_.uniqueId()} className="col-md-3">
              <div className="namespace-plan-block-placeholder">
                <img
                  src={require('../../images/add-vol-block.svg')}
                  style={{ width: '104%' }}
                  alt="add-vol"
                />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (
      getVolumesTariffsReducer.readyStatus === GET_VOLUMES_TARIFFS_FAILURE ||
      getVolumeReducer.readyStatus === GET_VOLUME_FAILURE
    ) {
      return <p>Oops, Failed to load data of VOL!</p>;
    }

    return (
      <TariffsVolumesList
        data={getVolumesTariffsReducer.data}
        VolTariffName={this.state.VolTariffName}
        active={getVolumeReducer.data ? getVolumeReducer.data.tariff : null}
        handleSelectTariff={tariff => this.handleSelectTariff(tariff)}
      />
    );
  };

  render() {
    const {
      resizeVolumeReducer,
      fetchResizeVolumeIfNeeded,
      match
    } = this.props;
    const {
      VolTariffName,
      VolTariffVolume,
      VolTariffPrice,
      VolTariffPricePerDay,
      VolTariffStorageLimit,
      isOpened
    } = this.state;
    const { status, idVol, method, err } = resizeVolumeReducer;
    return (
      <div>
        <Notification
          status={status}
          name={idVol}
          method={method}
          errorMessage={err}
        />
        <ResizeModal
          type="Volume"
          tariff={VolTariffName}
          name={match.params.idVol}
          data={{
            volume: VolTariffVolume,
            price: VolTariffPrice,
            storageLimit: VolTariffStorageLimit,
            pricePerDay: VolTariffPricePerDay
          }}
          isOpened={isOpened}
          handleOpenCloseModal={this.handleOpenCloseModal}
          onHandleResize={fetchResizeVolumeIfNeeded}
        />
        <Helmet title={`Resize Volume - ${match.params.idVol}`} />
        <div className="content-block">
          <div className="content-block-container container no-back mt-0 no-padding">
            <div className="content-block-content mt-0">
              <div className="namespace-plan mt-0">
                <div className="namespace-plan-title">
                  choose a volume size for{' '}
                  <span className="namespace-plan-first-step-blue">
                    {match.params.idVol}
                  </span>
                </div>
              </div>
              {this.renderTariffsVolumesList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getVolumesTariffsReducer,
    resizeVolumeReducer,
    getVolumeReducer
  }: ReduxState) => ({
    getVolumesTariffsReducer,
    resizeVolumeReducer,
    getVolumeReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetVolumesTariffsIfNeeded: () =>
      dispatch(actionGetVolumesTariffs.fetchGetVolumesTariffsIfNeeded()),
    fetchResizeVolumeIfNeeded: (idVol: string, tariff: string) =>
      dispatch(actionResizeVolume.fetchResizeVolumeIfNeeded(idVol, tariff)),
    fetchGetVolumeIfNeeded: (idVol: string) =>
      dispatch(actionGetVolume.fetchGetVolumeIfNeeded(idVol))
  })
);

export default connector(ResizeVolume);
