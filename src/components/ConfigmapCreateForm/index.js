import React from 'react';
import ReactFileReader from 'react-file-reader';
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
  textArea,
  handleChangeTextArea,
  handleDeleteImage
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
        <button className="button_blue btn btn-outline-primary configmap-add-btn">
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
        <AddConfigMapFileManualyView
          onHandleChangeFileName={onHandleChangeFileName}
          fileName={fileName}
          handleChangeTextArea={handleChangeTextArea}
          textArea={textArea}
        />
      </div>
    </div>
    <div className="row">
      <div className="container">
        <div
          className="btn btn-link "
          style={{ paddingLeft: '0', color: '#1baae4' }}
        >
          <h5>+ FILE</h5>
        </div>
      </div>
    </div>
  </form>
);

export default ConfigmapCreateForm;
