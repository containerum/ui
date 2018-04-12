import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';
import toastr from 'toastr';
import { Base64 } from 'js-base64';

import type { Dispatch, ReduxState } from '../../types';
import * as actionGetNamespaces from '../../actions/namespacesActions/getNamespaces';
import * as actionGetConfigMaps from '../../actions/configMapActions/getConfigMaps';
import * as actionCreateConfigMap from '../../actions/configMapActions/createConfigMap';
import * as actionDeleteConfigMap from '../../actions/configMapActions/deleteConfigMap';
import Notification from '../Notification';
import ConfigMapListView from '../../components/ConfigMapList';
import ConfigMapForm from '../../components/ConfigMapCreateForm';
import {
  GET_CONFIG_MAPS_FAILURE,
  GET_CONFIG_MAPS_INVALID,
  GET_CONFIG_MAPS_REQUESTING,
  GET_CONFIG_MAPS_SUCCESS
} from '../../constants/configMapConstants/getConfigMaps';
import {
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING,
  GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_SUCCESS
} from '../../constants/namespacesConstants/getNamespaces';
import {
  DELETE_CONFIG_MAP_REQUESTING,
  DELETE_CONFIG_MAP_SUCCESS
} from '../../constants/configMapConstants/deleteConfigMap';

type Props = {
  getProfileReducer: Object,
  getNamespacesReducer: Object,
  getConfigMapsReducer: Object,
  fetchGetNamespacesIfNeeded: () => void,
  fetchGetConfigMapsIfNeeded: () => void,
  deleteConfigMapReducer: Object,
  fetchDeleteConfigMapIfNeeded: (idName: string, configMapName: string) => void,
  createConfigMapReducer: Object,
  fetchCreateConfigMapIfNeeded: (idName: string, data: Object) => void,
  // history: Object,
  match: Object
};

class ConfigMaps extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      displayedConfigMaps: [],
      currentNamespace: {},
      configMapName: '',
      files: [],
      filesManually: [
        {
          fileName: '',
          textArea: '',
          id: _.uniqueId()
        }
      ]
    };
  }
  componentDidMount() {
    const {
      fetchGetConfigMapsIfNeeded,
      fetchGetNamespacesIfNeeded
    } = this.props;
    fetchGetConfigMapsIfNeeded();
    fetchGetNamespacesIfNeeded();
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getConfigMapsReducer.readyStatus !==
        nextProps.getConfigMapsReducer.readyStatus &&
      nextProps.getConfigMapsReducer.readyStatus === GET_CONFIG_MAPS_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedConfigMaps: nextProps.getConfigMapsReducer.data
      });
    }
    if (
      this.props.getNamespacesReducer.readyStatus !==
        nextProps.getNamespacesReducer.readyStatus &&
      nextProps.getNamespacesReducer.readyStatus === GET_NAMESPACES_SUCCESS
    ) {
      this.setState({
        ...this.state,
        currentNamespace: nextProps.getNamespacesReducer.data.length
          ? nextProps.getNamespacesReducer.data[0]
          : null
      });
    }
    if (
      this.props.deleteConfigMapReducer.readyStatus !==
        nextProps.deleteConfigMapReducer.readyStatus &&
      nextProps.deleteConfigMapReducer.readyStatus === DELETE_CONFIG_MAP_SUCCESS
    ) {
      const displayedConfigMaps = this.state.displayedConfigMaps.filter(
        config =>
          !(
            nextProps.deleteConfigMapReducer.idName === config.idName &&
            nextProps.deleteConfigMapReducer.configMapName ===
              config.configmap.name
          )
      );
      this.setState({
        ...this.state,
        displayedConfigMaps
      });
    }
  }
  handleChangeConfigMapName = value => {
    this.setState({
      ...this.state,
      configMapName: value
    });
  };
  handleSelectNamespace = value => {
    const currentNamespace = this.props.getNamespacesReducer.data.find(
      ns => ns.label === value
    );
    this.setState({
      ...this.state,
      currentNamespace: currentNamespace || null
    });
  };
  handleAddFiles = files => {
    const errorFiles = [];
    const successFiles = [];
    // console.log('files', files);
    Object.keys(files).filter(item => {
      if (files[item].file.size >= 10485760) {
        errorFiles.push(files[item]);
      } else {
        successFiles.push(files[item]);
      }
      return null;
    });

    if (errorFiles.length) {
      toastr.error(
        `<div>${errorFiles.map(
          file => `
    ${file.name}`
        )}</div>`,
        `The following files were not downloaded because the attachment size (10 MB maximum) was exceeded:`
      );
    }
    this.setState({
      ...this.state,
      files: successFiles
    });
  };
  handleDeleteFile = imageName => {
    const newFiles = this.state.files.filter(file => file.name !== imageName);
    this.setState({
      ...this.state,
      files: newFiles
    });
  };
  handleAddFileManually = () => {
    const filesManually = Object.assign([], this.state.filesManually);
    filesManually.push({
      fileName: '',
      textArea: '',
      id: _.uniqueId()
    });
    this.setState({
      ...this.state,
      filesManually
    });
  };
  handleDeleteFileManually = id => {
    if (this.state.filesManually.length > 1) {
      const filesManually = this.state.filesManually.filter(
        file => file.id !== id
      );
      this.setState({
        ...this.state,
        filesManually
      });
    } else {
      this.setState({
        ...this.state,
        filesManually: [
          {
            fileName: '',
            textArea: '',
            id: _.uniqueId()
          }
        ]
      });
    }
  };
  handleChangeInputFileManually = (index, value, type) => {
    const filesManually = Object.assign([], this.state.filesManually);
    filesManually[index][`${type}`] = value;
    this.setState({
      ...this.state,
      filesManually
    });
  };
  handleSubmitCreateConfigMap = e => {
    e.preventDefault();
    const {
      files,
      filesManually,
      configMapName,
      currentNamespace
    } = this.state;
    const dataFiles = {
      name: configMapName,
      owner: this.props.getProfileReducer.data.id,
      data: {}
    };
    if (files.length) {
      files.map(file => {
        dataFiles.data[file.name] = file.base64.substr(
          file.base64.indexOf(';base64,') + 8
        );
        return null;
      });
      this.props.fetchCreateConfigMapIfNeeded(
        currentNamespace.label,
        dataFiles
      );
    } else if (filesManually[0].fileName && filesManually[0].textArea) {
      filesManually.map(file => {
        dataFiles.data[file.fileName] = Base64.encode(file.textArea);
        return null;
      });
      this.props.fetchCreateConfigMapIfNeeded(
        currentNamespace.label,
        dataFiles
      );
    }
  };
  handleDeleteConfigMap = (idName, configMapLabel) => {
    this.props.fetchDeleteConfigMapIfNeeded(idName, configMapLabel);
  };

  renderConfigMapList = () => {
    const { getConfigMapsReducer, deleteConfigMapReducer } = this.props;
    const { params, path } = this.props.match;

    if (
      !getConfigMapsReducer.readyStatus ||
      getConfigMapsReducer.readyStatus === GET_CONFIG_MAPS_INVALID ||
      getConfigMapsReducer.readyStatus === GET_CONFIG_MAPS_REQUESTING ||
      deleteConfigMapReducer.readyStatus === DELETE_CONFIG_MAP_REQUESTING
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

    if (getConfigMapsReducer.readyStatus === GET_CONFIG_MAPS_FAILURE) {
      return <p>Oops, Failed to load data of ConfigMaps!</p>;
    }

    const isEqualGetPath = path === '/namespaces/:idName/configmaps';
    const { idName } = params;
    return (
      <ConfigMapListView
        handleDeleteConfigMap={this.handleDeleteConfigMap}
        configMapsData={this.state.displayedConfigMaps}
        isEqualGetPath={isEqualGetPath}
        currentIdName={idName}
      />
    );
  };
  renderConfigMapForm = () => {
    const { getNamespacesReducer } = this.props;

    if (
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING
    ) {
      return (
        <div
          style={{
            height: '300px',
            margin: '20px 30px',
            borderRadius: '2px',
            backgroundColor: '#f6f6f6'
          }}
        />
      );
    }

    if (getNamespacesReducer.readyStatus === GET_NAMESPACES_FAILURE) {
      return <p>Oops, Failed to load data of Namespaces!</p>;
    }

    const {
      configMapName,
      files,
      filesManually,
      currentNamespace
    } = this.state;
    return (
      <div className="content-block">
        <div className="container no-back">
          <ConfigMapForm
            namespacesData={this.props.getNamespacesReducer.data}
            currentNamespace={currentNamespace}
            handleSelectNamespace={this.handleSelectNamespace}
            handleSubmitCreateConfigMap={this.handleSubmitCreateConfigMap}
            createConfigMapReducer={this.props.createConfigMapReducer}
            configMapName={configMapName}
            handleChangeConfigMapName={this.handleChangeConfigMapName}
            files={files}
            handleAddFiles={fls => this.handleAddFiles(fls)}
            handleDeleteFile={fileName => this.handleDeleteFile(fileName)}
            filesManually={filesManually}
            handleAddFileManually={this.handleAddFileManually}
            handleDeleteFileManually={id => this.handleDeleteFileManually(id)}
            handleChangeInputFileManually={(index, value, type) =>
              this.handleChangeInputFileManually(index, value, type)
            }
          />
        </div>
      </div>
    );
  };

  render() {
    const { status, configMapName, err } = this.props.createConfigMapReducer;
    const { path } = this.props.match;
    const {
      status: deleteStatus,
      configMapName: deleteConfigMapName,
      err: deleteErr
    } = this.props.deleteConfigMapReducer;
    const isEqualGetPath = path === '/namespaces/:idName/configmaps';
    const isEqualCreatePath = path === '/namespace/:idName/createConfigMap';
    return (
      <div>
        <Helmet title="ConfigMap" />
        <Notification status={status} name={configMapName} errorMessage={err} />
        <Notification
          status={deleteStatus}
          name={deleteConfigMapName}
          errorMessage={deleteErr}
        />
        <div className={!isEqualGetPath ? 'container no-back' : undefined}>
          <div className={!isEqualGetPath ? 'content-block' : undefined}>
            <div
              className={!isEqualGetPath ? 'row double two-columns' : undefined}
            >
              <div
                className={
                  !isEqualGetPath ? 'col-md-3 col-lg-3 col-xl-2' : undefined
                }
              />
              <div
                className={
                  !isEqualGetPath ? 'col-md-9 col-lg-9 col-xl-10' : undefined
                }
              >
                <div
                  className={
                    !isEqualGetPath ? 'container container__webhook' : undefined
                  }
                >
                  <div className={!isEqualGetPath ? 'block-item' : undefined}>
                    {!isEqualGetPath && (
                      <div>
                        <div className="block-item__title">
                          {isEqualCreatePath ? 'Add ConfigMap' : 'ConfigMap'}
                        </div>
                        {!isEqualCreatePath && (
                          <div className="row">
                            <div className="col-md-10">
                              <div className="light-text">
                                Here you can configure a ConfigMap to decouple
                                configuration artifacts from image content
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {!isEqualCreatePath && (
                      <div className="row">{this.renderConfigMapList()}</div>
                    )}
                    {!isEqualGetPath && (
                      <div>
                        <div className="row">
                          {!isEqualCreatePath && (
                            <div className="block-item__title block-item__title_configmap-block">
                              Add configMap
                            </div>
                          )}
                        </div>
                        <div className="row">{this.renderConfigMapForm()}</div>
                      </div>
                    )}
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
  ({
    getProfileReducer,
    getNamespacesReducer,
    getConfigMapsReducer,
    createConfigMapReducer,
    deleteConfigMapReducer
  }: ReduxState) => ({
    getProfileReducer,
    getNamespacesReducer,
    getConfigMapsReducer,
    createConfigMapReducer,
    deleteConfigMapReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetNamespacesIfNeeded: () =>
      dispatch(actionGetNamespaces.fetchGetNamespacesIfNeeded()),
    fetchGetConfigMapsIfNeeded: () =>
      dispatch(actionGetConfigMaps.fetchGetConfigMapsIfNeeded()),
    fetchCreateConfigMapIfNeeded: (idName: string, data: Object) =>
      dispatch(
        actionCreateConfigMap.fetchCreateConfigMapIfNeeded(idName, data)
      ),
    fetchDeleteConfigMapIfNeeded: (idName: string, configMapName: string) =>
      dispatch(
        actionDeleteConfigMap.fetchDeleteConfigMapIfNeeded(
          idName,
          configMapName
        )
      )
  })
);

export default connector(ConfigMaps);
