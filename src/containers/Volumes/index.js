/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';

import * as actionGetVolumes from '../../actions/volumesActions/getVolumes';
import * as actionDeleteVolumes from '../../actions/volumeActions/deleteVolume';
import {
  GET_VOLUMES_INVALID,
  GET_VOLUMES_REQUESTING,
  GET_VOLUMES_FAILURE,
  GET_VOLUMES_SUCCESS
} from '../../constants/volumesConstants/getVolumes';
import {
  DELETE_VOLUME_SUCCESS,
  DELETE_VOLUME_REQUESTING
} from '../../constants/volumeConstants/deleteVolume';
import type { Dispatch, ReduxState } from '../../types';
import Notification from '../Notification';
import DeleteModal from '../../components/CustomerModal/DeleteModal';
import VolumesList from '../../components/VolumesList';
import HeaderPage from '../Header';
import FooterPage from '../Footer';
import ns from '../../images/ns-1.svg';

type Props = {
  getVolumesReducer: Object,
  deleteVolumeReducer: Object,
  fetchGetVolumesIfNeeded: () => void,
  fetchDeleteVolumeIfNeeded: (idVol: string) => void
};

// Export this for unit testing more easily
export class Volumes extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      inputName: '',
      idVol: null,
      isOpened: false,
      displayedVolumes: []
    };
  }
  componentDidMount() {
    this.props.fetchGetVolumesIfNeeded();
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getVolumesReducer.readyStatus !==
        nextProps.getVolumesReducer.readyStatus &&
      nextProps.getVolumesReducer.readyStatus === GET_VOLUMES_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedVolumes: nextProps.getVolumesReducer.data
      });
    }
    if (
      this.props.deleteVolumeReducer.readyStatus !==
        nextProps.deleteVolumeReducer.readyStatus &&
      nextProps.deleteVolumeReducer.readyStatus === DELETE_VOLUME_SUCCESS
    ) {
      // console.log(nextProps.deleteVolumeReducer.idVol);
      const displayedNS = this.state.displayedVolumes.filter(
        volume => nextProps.deleteVolumeReducer.idVol !== volume.name
      );
      this.setState({
        ...this.state,
        displayedVolumes: displayedNS
      });
    }
  }
  handleOpenCloseModal = () => {
    this.setState({
      ...this.state,
      isOpened: !this.state.isOpened,
      idVol: null,
      inputName: ''
    });
  };
  handleInputName = inputName => {
    this.setState({
      ...this.state,
      inputName
    });
  };
  handleDeleteVolume = idVol => {
    this.setState({
      ...this.state,
      idVol,
      isOpened: true
    });
  };

  renderVolumesList = () => {
    const { getVolumesReducer, deleteVolumeReducer } = this.props;

    if (
      !getVolumesReducer.readyStatus ||
      getVolumesReducer.readyStatus === GET_VOLUMES_INVALID ||
      getVolumesReducer.readyStatus === GET_VOLUMES_REQUESTING ||
      deleteVolumeReducer.readyStatus === DELETE_VOLUME_REQUESTING
    ) {
      return (
        <div className="row double">
          {new Array(3).fill().map(() => (
            <div key={_.uniqueId()} className="col-md-4 align-middle">
              <img className="content-block-container-img" src={ns} alt="ns" />
            </div>
          ))}
        </div>
      );
    }

    if (getVolumesReducer.readyStatus === GET_VOLUMES_FAILURE) {
      return <p>Oops, Failed to load data of NS!</p>;
    }

    return (
      <VolumesList
        data={this.state.displayedVolumes}
        handleDeleteVolume={idVol => this.handleDeleteVolume(idVol)}
      />
    );
  };

  render() {
    // console.log('state', this.state.displayedVolumes);
    const { status, idVol, err } = this.props.deleteVolumeReducer;
    const { fetchDeleteVolumeIfNeeded } = this.props;
    const { inputName, isOpened, idVol: currentIdVol } = this.state;
    return (
      <div>
        <Helmet title="Volumes" />
        <Notification status={status} name={idVol} errorMessage={err} />
        <DeleteModal
          type="Volume"
          name={inputName}
          typeName={currentIdVol}
          isOpened={isOpened}
          handleInputName={this.handleInputName}
          handleOpenCloseModal={this.handleOpenCloseModal}
          onHandleDelete={fetchDeleteVolumeIfNeeded}
        />
        <HeaderPage />
        <div className="content-block">
          <div className="container no-back">{this.renderVolumesList()}</div>
        </div>
        <FooterPage />
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ getVolumesReducer, deleteVolumeReducer }: ReduxState) => ({
    getVolumesReducer,
    deleteVolumeReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetVolumesIfNeeded: () =>
      dispatch(actionGetVolumes.fetchGetVolumesIfNeeded()),
    fetchDeleteVolumeIfNeeded: (idVol: string) =>
      dispatch(actionDeleteVolumes.fetchDeleteVolumeIfNeeded(idVol))
  })
);

export default connector(Volumes);
