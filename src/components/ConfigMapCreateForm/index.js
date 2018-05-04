import React from 'react';
import { Link } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import Tooltip from 'rc-tooltip';
import _ from 'lodash/fp';

import LoadButton from '../../components/LoadButton';
import InputControl from '../../components/InputControl';
import AddConfigMapFileManuallyView from '../../components/AddConfigMapFileManually';
import styles from '../../containers/ConfigMaps/index.scss';
import globalStyles from '../../theme/global.scss';

type Props = {
  namespacesData: Array<Object>,
  currentNamespace: Object,
  configMapName: string,
  handleSelectNamespace: (value: string) => void,
  handleChangeConfigMapName: (value: string) => void,
  files: Array,
  handleAddFiles: (files: Array) => void,
  handleDeleteFile: (fileName: string) => void,
  filesManually: Array<Object>,
  handleAddFileManually: () => void,
  handleDeleteFileManually: () => void,
  handleChangeInputFileManually: (
    index: number,
    value: string,
    type: string
  ) => void,
  handleSubmitCreateConfigMap: (e: string) => void,
  createConfigMapReducer: Object,
  match: Object
};

const ConfigMapCreateForm = ({
  namespacesData,
  configMapName,
  currentNamespace,
  handleChangeConfigMapName,
  handleSelectNamespace,
  files,
  handleAddFiles,
  handleDeleteFile,
  filesManually,
  handleAddFileManually,
  handleDeleteFileManually,
  handleChangeInputFileManually,
  handleSubmitCreateConfigMap,
  createConfigMapReducer,
  match
}: Props) => (
  <form onSubmit={handleSubmitCreateConfigMap}>
    <div className="row">
      <div
        className="container no-back"
        style={{
          marginBottom: 20
        }}
      >
        {namespacesData.length ? (
          <div
            className="col-md-8 form-group"
            style={{
              display: 'inline-block',
              paddingLeft: 0,
              paddingTop: 0,
              marginBottom: 5
            }}
          >
            <div
              style={{ margin: '10px 0px 15px' }}
              className="containerSubTitleBlack"
            >
              Namespace Name
            </div>
            <div className="select-wrapper">
              <div className="select-arrow-3" />
              <div className="select-arrow-3" />
              <select
                name="services"
                className="selectCustom selectGreyColor"
                onChange={e => handleSelectNamespace(e.target.value)}
                defaultValue={
                  match.params.idName
                    ? match.params.idName
                    : currentNamespace.label
                }
                required
              >
                {namespacesData.map(ns => (
                  <option key={ns.label} value={ns.label}>
                    {ns.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: 10 }}>
            <div style={{ marginBottom: 10 }}>
              You have no active Namespace yet.
            </div>
            <Link
              to="/createNamespace"
              className="button_blue btn btn-outline-primary"
            >
              Create Namespace
            </Link>
          </div>
        )}
        <InputControl
          value={configMapName}
          id="configMapName"
          type="text"
          pattern="^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
          required
          baseClassName="form-group__input-text form-group__input-text_configmap form-control customInput"
          baseClassNameLabel={`form-group__label ${configMapName &&
            'form-group__label-always-onfocus'}`}
          labelText="ConfigMap name"
          textHelper="Name of ConfigMap"
          baseClassNameHelper="form-group__helper"
          handleChangeInput={e => handleChangeConfigMapName(e.target.value)}
        />
      </div>
    </div>
    <div className="row">
      <div className="block-item__title block-item__title_configmap-block">
        ADD FILE
      </div>
    </div>
    <div className="row">
      <div className="block-item__title block-item__title_configmap-block block-item__title_no-uppercase">
        1. Upload ConfigMap file
      </div>
    </div>
    <div className="row" style={{ paddingLeft: '15px' }}>
      {filesManually[0].textArea || filesManually[0].fileName ? (
        <button
          type="button"
          className="btn btn-secondary configmap-add-btn"
          disabled={filesManually[0].textArea || filesManually[0].fileName}
        >
          Add File
        </button>
      ) : (
        <div className="fileform">
          <div className="selectbutton">Add File</div>
          <FileBase64 multiple onDone={arrFiles => handleAddFiles(arrFiles)} />
        </div>
      )}
      <div style={{ marginLeft: '30px' }}>
        {files.length ? (
          <aside>
            {files.map(file => (
              <div
                key={_.uniqueId()}
                className={`${globalStyles.dropZoneItem} ${
                  styles.dropZoneItemConfig
                }`}
              >
                <span>{file.name}</span>
                <i
                  onClick={() => handleDeleteFile(file.name)}
                  onKeyPress={() => handleDeleteFile(file.name)}
                  className="material-icons"
                  role="presentation"
                >
                  delete
                </i>
              </div>
            ))}
          </aside>
        ) : (
          ''
        )}
      </div>
    </div>
    <div className="row" style={{ paddingTop: '6px' }}>
      {!files.length ? (
        <div className="container">
          <div className="light-text light-text__configmap">
            Any number of files you want
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
    <div className="row" style={{ paddingTop: '40px' }}>
      <div className="block-item__title block-item__title_configmap-block block-item__title_no-uppercase">
        2. Or add file manually
      </div>
    </div>
    <div className="row">
      <div className="container ">
        <AddConfigMapFileManuallyView
          files={files}
          filesManually={filesManually}
          handleDeleteFileManually={handleDeleteFileManually}
          handleChangeInputFileManually={handleChangeInputFileManually}
        />
      </div>
    </div>
    <div className="row">
      <div className="container">
        <Tooltip
          placement="top"
          trigger={['hover']}
          overlay={<span>You can use only one additing method</span>}
          overlayClassName={files.length > 0 ? '' : 'display-none'}
        >
          <div
            onClick={
              files.length === 0 ? () => handleAddFileManually() : undefined
            }
            className="btn btn-link"
            style={{ paddingLeft: '0', color: '#1baae4' }}
            disabled={files.length > 0}
          >
            <h5>+ FILE</h5>
          </div>
        </Tooltip>
      </div>
    </div>
    <div
      className="row"
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '90px'
      }}
    >
      <LoadButton
        type="submit"
        buttonText="Create ConfigMap"
        isFetching={createConfigMapReducer.isFetching}
        baseClassButton="btn feedback-form__submit"
        disabled={!namespacesData.length}
        style={{ width: '235px' }}
      />
    </div>
  </form>
);

export default ConfigMapCreateForm;
