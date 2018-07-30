import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';
import toastr from 'toastr';
import { Base64 } from 'js-base64';
import cookie from 'react-cookies';

import { routerLinks } from '../../config';
import type { Dispatch, ReduxState } from '../../types';
import * as actionGetNamespaces from '../../actions/namespacesActions/getNamespaces';
import * as actionGetConfigMapsByNS from '../../actions/configMapActions/getConfigMapsByNS';
import * as actionCreateConfigMap from '../../actions/configMapActions/createConfigMap';
import * as actionDeleteConfigMap from '../../actions/configMapActions/deleteConfigMap';
import Notification from '../Notification';
import ConfigMapByNSListView from '../../components/ConfigMapByNSList';
import {
  GET_CONFIG_MAPS_BY_NS_FAILURE,
  GET_CONFIG_MAPS_BY_NS_INVALID,
  GET_CONFIG_MAPS_BY_NS_REQUESTING,
  GET_CONFIG_MAPS_BY_NS_SUCCESS
} from '../../constants/configMapConstants/getConfigMapsByNS';
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
import globalStyles from '../../theme/global.scss';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';

type Props = {
  history: Object,
  match: Object,
  getProfileReducer: Object,
  getNamespacesReducer: Object,
  getConfigMapsByNSReducer: Object,
  fetchGetNamespacesIfNeeded: () => void,
  fetchGetConfigMapsByNSIfNeeded: (idName: string) => void,
  deleteConfigMapReducer: Object,
  fetchDeleteConfigMapIfNeeded: (idName: string, configMapName: string) => void,
  createConfigMapReducer: Object,
  fetchCreateConfigMapIfNeeded: (idName: string, data: Object) => void
};

class ConfigMapsInNamespace extends PureComponent<Props> {
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
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentDidMount() {
    const { match, fetchGetConfigMapsByNSIfNeeded } = this.props;
    fetchGetConfigMapsByNSIfNeeded(match.params.idName);
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getProfileReducer.readyStatus !==
        nextProps.getProfileReducer.readyStatus &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      this.props.fetchGetNamespacesIfNeeded(
        nextProps.getProfileReducer.data.role
      );
    }
    if (
      this.props.getConfigMapsByNSReducer.readyStatus !==
        nextProps.getConfigMapsByNSReducer.readyStatus &&
      nextProps.getConfigMapsByNSReducer.readyStatus ===
        GET_CONFIG_MAPS_BY_NS_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedConfigMaps: nextProps.getConfigMapsByNSReducer.data
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
          : {}
      });
    }
    if (
      this.props.deleteConfigMapReducer.readyStatus !==
        nextProps.deleteConfigMapReducer.readyStatus &&
      nextProps.deleteConfigMapReducer.readyStatus === DELETE_CONFIG_MAP_SUCCESS
    ) {
      const displayedConfigMaps = this.state.displayedConfigMaps.filter(
        config => nextProps.deleteConfigMapReducer.configMapName !== config.name
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
    const regexp = /^[-._a-zA-Z0-9]+$/;
    const errorFiles = [];
    const successFiles = Object.assign([], this.state.files);
    // if (this.state.files.length > 0) {
    //   const clonedStateFiles = JSON.parse(JSON.stringify(this.state.files));
    //   successFiles = clonedStateFiles;
    // }
    Object.keys(files).filter(item => {
      if (
        files[item].file.size >= 2000000 ||
        files[item].name.search(regexp) === -1
      ) {
        errorFiles.push(files[item]);
      } else {
        if (successFiles.length) {
          const alreadyUploadedFile = successFiles.filter(
            file => file.name === files[item].name
          );
          if (!alreadyUploadedFile.length) {
            successFiles.push(files[item]);
          }
        } else {
          successFiles.push(files[item]);
        }
        return null;
      }
      return null;
    });

    if (errorFiles.length) {
      const errorFilesByName = [];
      const errorFilesBySize = [];
      errorFiles.map(file => {
        if (file.name.search(regexp) === -1) {
          errorFilesByName.push(file);
        } else {
          errorFilesBySize.push(file);
        }
        return null;
      });

      if (errorFilesByName.length) {
        toastr.error(
          `<div>${errorFilesByName.map(
            file => `
      ${file.name}`
          )}</div>`,
          `The following files were not downloaded because the attachment file name must consist of alphanumeric characters, '-', '_' or '.':`
        );
      }
      if (errorFilesBySize.length) {
        toastr.error(
          `<div>${errorFilesBySize.map(
            file => `
      ${file.name}`
          )}</div>`,
          `The following files were not downloaded because the attachment size (2 MB maximum) was exceeded:`
        );
      }
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
      this.props.fetchCreateConfigMapIfNeeded(currentNamespace.id, dataFiles);
    } else if (filesManually[0].fileName && filesManually[0].textArea) {
      filesManually.map(file => {
        dataFiles.data[file.fileName] = Base64.encode(file.textArea);
        return null;
      });
      this.props.fetchCreateConfigMapIfNeeded(currentNamespace.id, dataFiles);
    }
  };
  handleDeleteConfigMap = (idName, configMapLabel) => {
    this.props.fetchDeleteConfigMapIfNeeded(idName, configMapLabel);
  };

  renderConfigMapList = () => {
    const {
      match,
      getConfigMapsByNSReducer,
      getNamespacesReducer,
      deleteConfigMapReducer
    } = this.props;
    const { params, path } = match;

    if (
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING ||
      !getConfigMapsByNSReducer.readyStatus ||
      getConfigMapsByNSReducer.readyStatus === GET_CONFIG_MAPS_BY_NS_INVALID ||
      getConfigMapsByNSReducer.readyStatus ===
        GET_CONFIG_MAPS_BY_NS_REQUESTING ||
      deleteConfigMapReducer.readyStatus === DELETE_CONFIG_MAP_REQUESTING
    ) {
      return (
        <div
          style={{
            height: 120,
            width: '100%',
            margin: '20px 15px',
            borderRadius: '2px',
            backgroundColor: '#f6f6f6'
          }}
        />
      );
    }

    if (
      getNamespacesReducer.readyStatus === GET_NAMESPACES_FAILURE ||
      getConfigMapsByNSReducer.readyStatus === GET_CONFIG_MAPS_BY_NS_FAILURE
    ) {
      return <p>Oops, Failed to load data of ConfigMaps!</p>;
    }

    const { idName } = params;
    const isEqualGetPath = path === routerLinks.getConfigMaps;
    return (
      <ConfigMapByNSListView
        dataNamespace={getNamespacesReducer.data}
        isEqualGetPath={isEqualGetPath}
        handleDeleteConfigMap={this.handleDeleteConfigMap}
        configMapsData={this.state.displayedConfigMaps}
        currentIdName={idName}
      />
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
    const isEqualGetPath = path === routerLinks.getConfigMapsByNS;
    return (
      <div>
        <Helmet title="ConfigMaps" />
        <Notification status={status} name={configMapName} errorMessage={err} />
        <Notification
          status={deleteStatus}
          name={deleteConfigMapName}
          errorMessage={deleteErr}
        />
        <div
          className={!isEqualGetPath ? globalStyles.contentBlock : undefined}
        >
          <div className="row">{this.renderConfigMapList()}</div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getProfileReducer,
    getNamespacesReducer,
    getConfigMapsByNSReducer,
    createConfigMapReducer,
    deleteConfigMapReducer,
    getNamespaceReducer
  }: ReduxState) => ({
    getProfileReducer,
    getNamespacesReducer,
    getConfigMapsByNSReducer,
    createConfigMapReducer,
    deleteConfigMapReducer,
    getNamespaceReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetNamespacesIfNeeded: (role: string) =>
      dispatch(actionGetNamespaces.fetchGetNamespacesIfNeeded(role)),
    fetchGetConfigMapsByNSIfNeeded: (idName: string) =>
      dispatch(actionGetConfigMapsByNS.fetchGetConfigMapsByNSIfNeeded(idName)),
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

export default connector(ConfigMapsInNamespace);
