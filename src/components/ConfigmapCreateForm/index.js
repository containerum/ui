import React from 'react';
import ReactFileReader from 'react-file-reader';
import Tooltip from 'rc-tooltip';
import InputControl from '../../components/InputControl';
import AddConfigMapFileManualyView from '../../components/AddConfigmapFileManualy';

type Props = {
  name: string,
  fileName: string,
  onHandleChangeName: (value: string) => void,
  onHandleChangeFileName: (value: string) => void,
  handleFiles: (files: Array) => void,
  files: Array,
  textArea: string,
  filesManualyCount: Number,
  handleDeleteFilesManualy: () => void,
  handleChangeFilesManualyCount: () => void,
  handleDeleteImage: (fileName: string) => void,
  handleChangeTextArea: (e: Object) => void
};

const ConfigmapCreateForm = ({
  name,
  fileName,
  onHandleChangeName,
  onHandleChangeFileName,
  handleFiles,
  files,
  handleDeleteFilesManualy,
  textArea,
  handleChangeFilesManualyCount,
  handleChangeTextArea,
  handleDeleteImage,
  filesManualyCount
}: Props) => (
  <form>
    <div className="row">
      <div className="container no-back">
        <InputControl
          value={name}
          id="configMapName"
          type="text"
          pattern="^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
          required
          baseClassName="form-group__input-text form-group__input-text_configmap form-control customInput"
          baseClassNameLabel={`form-group__label ${name &&
            'form-group__label-always-onfocus'}`}
          labelText="ConfigMap name"
          textHelper="Name of ConfigMap"
          baseClassNameHelper="form-group__helper"
          handleChangeInput={e => onHandleChangeName(e.target.value)}
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
        1. Add ConfigMap file via Download
      </div>
    </div>
    <div className="row" style={{ paddingLeft: '15px' }}>
      <ReactFileReader
        fileTypes={['application/json', 'application/pdf']}
        base64
        multipleFiles
        handleFiles={arrFiles => handleFiles(arrFiles)}
      >
        <button
          className={
            textArea || fileName
              ? 'btn btn-secondary configmap-add-btn'
              : 'button_blue btn btn-outline-primary configmap-add-btn'
          }
          disabled={textArea || fileName}
        >
          Add File
        </button>
      </ReactFileReader>
      <div style={{ marginLeft: '30px' }}>
        {files.length ? (
          <aside className="dropzone-item__configmap">
            {files.map(file => (
              <div key={file.name} className="dropzone-item ">
                <span className="dropzone-item-span">{file.name}</span>
                <i
                  onClick={() => handleDeleteImage(file.name)}
                  onKeyPress={() => handleDeleteImage(file.name)}
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
        2. Or Add file manualy
      </div>
    </div>
    <div className="row">
      <div className="container ">
        {new Array(filesManualyCount)
          .fill()
          .map(number => (
            <AddConfigMapFileManualyView
              key={number}
              id={number}
              files={files}
              onHandleChangeFileName={onHandleChangeFileName}
              fileName={fileName}
              handleChangeTextArea={handleChangeTextArea}
              textArea={textArea}
              handleDeleteFilesManualy={handleDeleteFilesManualy}
            />
          ))}
      </div>
    </div>
    <div className="row">
      <div className="container">
        <Tooltip
          placement="bottom"
          trigger={files.length > 0 ? ['hover'] : ''}
          overlay={
            <span style={{ colo: 'black' }}>
              You can use only one additing method
            </span>
          }
        >
          <div
            onClick={files.length > 0 ? '' : handleChangeFilesManualyCount}
            className="btn btn-link "
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
      <button className="btn btn-primary" style={{ width: '212px' }}>
        Create Config Map
      </button>
    </div>
  </form>
);

export default ConfigmapCreateForm;
