/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import className from 'classnames/bind';

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
import globalStyles from '../../theme/global.scss';
import {
  GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING
} from '../../constants/namespacesConstants/getNamespaces';

const globalClass = className.bind(globalStyles);
const contentClassName = globalClass(
  'contentBlockContent',
  'contentBlockContentFull'
);

type Props = {
  match: Object,
  getVolumesReducer: Object,
  getNamespacesReducer: Object,
  deleteVolumeReducer: Object,
  fetchGetVolumesIfNeeded: (id: string) => void,
  fetchDeleteVolumeIfNeeded: (idVol: string, idName: string) => void
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
    const { fetchGetVolumesIfNeeded, match } = this.props;
    fetchGetVolumesIfNeeded(match.params.idName);
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
    const {
      getVolumesReducer,
      getNamespacesReducer,
      deleteVolumeReducer,
      match
    } = this.props;

    if (
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING ||
      !getVolumesReducer.readyStatus ||
      getVolumesReducer.readyStatus === GET_VOLUMES_INVALID ||
      getVolumesReducer.readyStatus === GET_VOLUMES_REQUESTING ||
      deleteVolumeReducer.readyStatus === DELETE_VOLUME_REQUESTING
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
      getVolumesReducer.readyStatus === GET_VOLUMES_FAILURE
    ) {
      return <p>Oops, Failed to load data of Volumes!</p>;
    }

    return (
      <VolumesList
        data={this.state.displayedVolumes}
        dataNamespace={getNamespacesReducer.data.find(
          namespace => namespace.id === match.params.idName
        )}
        idName={match.params.idName}
        handleDeleteVolume={idVol => this.handleDeleteVolume(idVol)}
      />
    );
  };

  render() {
    const { status, idVol, err } = this.props.deleteVolumeReducer;
    const { fetchDeleteVolumeIfNeeded, match } = this.props;
    const { inputName, isOpened, idVol: currentIdVol } = this.state;
    return (
      <div>
        <Helmet title="Volumes" />
        <Notification status={status} name={idVol} errorMessage={err} />
        <DeleteModal
          type="Volume"
          inputName={inputName}
          idName={match.params.idName}
          name={currentIdVol}
          typeName={currentIdVol}
          isOpened={isOpened}
          handleInputName={this.handleInputName}
          handleOpenCloseModal={this.handleOpenCloseModal}
          onHandleDelete={fetchDeleteVolumeIfNeeded}
        />

        <div className={contentClassName}>
          <div className="tab-content">
            <div className="tab-pane services active">
              {this.renderVolumesList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getVolumesReducer,
    getNamespacesReducer,
    deleteVolumeReducer
  }: ReduxState) => ({
    getVolumesReducer,
    getNamespacesReducer,
    deleteVolumeReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetVolumesIfNeeded: (id: string) =>
      dispatch(actionGetVolumes.fetchGetVolumesIfNeeded(id)),
    fetchDeleteVolumeIfNeeded: (idVol: string, idName: string) =>
      dispatch(actionDeleteVolumes.fetchDeleteVolumeIfNeeded(idVol, idName))
  })
);

export default connector(Volumes);
