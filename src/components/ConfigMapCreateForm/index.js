import React from 'react';
import { Link } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import Tooltip from 'rc-tooltip';
import _ from 'lodash/fp';
import className from 'classnames/bind';

import { routerLinks, sourceType } from '../../config';
import LoadButton from '../../components/LoadButton';
import InputControl from '../../components/InputControl';
import AddConfigMapFileManuallyView from '../../components/AddConfigMapFileManually';
import styles from '../../containers/ConfigMaps/index.scss';
import globalStyles from '../../theme/global.scss';
import buttonsStyles from '../../theme/buttons.scss';
import inputStyles from '../../components/InputControl/index.scss';

type Props = {
  role: string,
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
  createConfigMapReducer: Object
};

const globalClass = className.bind(globalStyles);

const formClassName = globalClass(
  'formInputText',
  'formControl',
  'formInputTextConfigmap'
);
const selectCustomClassNames = globalClass('selectCustom', 'selectGreyColor');
const itemTitleClassName = globalClass(
  'blockItemTitle',
  'blockItemTitleConfigmap'
);
const itemClassName = globalClass(
  'blockItemTitle',
  'blockItemTitleConfigmap',
  'blockItemTitleNoUppercase'
);
const lightText = globalClass('textLight', 'textLightConfigmap');
const isOnline = sourceType === 'ONLINE';

const ConfigMapCreateForm = ({
  role,
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
  createConfigMapReducer
}: Props) => (
  <form onSubmit={handleSubmitCreateConfigMap}>
    <div className="row">
      <div
        className={`${globalStyles.containerNoBackground} container`}
        style={{
          marginBottom: 20
        }}
      >
        {namespacesData.length ? (
          <div
            className={`${globalStyles.formGroup} col-md-8`}
            style={{
              display: 'inline-block',
              paddingLeft: 0,
              paddingTop: 0,
              marginBottom: 5
            }}
          >
            <div
              style={{ margin: '10px 0px 15px' }}
              className={globalStyles.containerSubTitle}
            >
              Namespace Name
            </div>
            <div className={globalStyles.selectWrapper}>
              <div className={globalStyles.selectArrow} />
              <div className={globalStyles.selectArrow} />
              <select
                name="services"
                className={selectCustomClassNames}
                onChange={e => handleSelectNamespace(e.target.value)}
                value={currentNamespace.label}
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
          <div>
            {isOnline &&
              role === 'user' && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ marginBottom: 10 }}>
                    You have no active Namespace yet.
                  </div>
                  <Link
                    to={routerLinks.createNamespace}
                    className={`${
                      buttonsStyles.buttonUIDeployDashboard
                    } btn btn-outline-primary`}
                  >
                    Create Namespace
                  </Link>
                </div>
              )}
            {role === 'admin' && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ marginBottom: 10 }}>
                  You have no active Namespace yet.
                </div>
                <Link
                  to={routerLinks.createCustomNamespace}
                  className={`${
                    buttonsStyles.buttonUIDeployDashboard
                  } btn btn-outline-primary`}
                >
                  Create Namespace
                </Link>
              </div>
            )}
          </div>
        )}
        {!isOnline &&
          !namespacesData.length &&
          role === 'user' && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ marginBottom: 10 }}>
                You don`t have permission to namespaces. <br />
                Contact the administrator to obtain permission.
              </div>
            </div>
          )}
        <InputControl
          value={configMapName}
          id="configMapName"
          type="text"
          pattern="^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
          required
          baseClassName={`${formClassName} ${inputStyles.inputCustom}`}
          baseClassNameLabel={`${globalStyles.formGroupLabel} ${configMapName &&
            globalStyles.formGroupLabelOnFocus}`}
          labelText="ConfigMap name"
          textHelper="Name of ConfigMap"
          baseClassNameHelper={globalStyles.formGroupHelper}
          handleChangeInput={e => handleChangeConfigMapName(e.target.value)}
        />
      </div>
    </div>
    <div className="row">
      <div className={itemTitleClassName}>ADD FILE</div>
    </div>
    <div className="row">
      <div className={itemClassName}>1. Upload ConfigMap file</div>
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
        <div className={styles.fileForm}>
          <div className={styles.selectBtn}>Add File</div>
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
        <div className={`${globalStyles.container} container`}>
          <div className={lightText}>Any number of files you want</div>
        </div>
      ) : (
        ''
      )}
    </div>
    <div className="row" style={{ paddingTop: '40px' }}>
      <div className={itemClassName}>2. Or add file manually</div>
    </div>
    <div className="row">
      <div className={`${globalStyles.container} container`}>
        <AddConfigMapFileManuallyView
          files={files}
          filesManually={filesManually}
          handleDeleteFileManually={handleDeleteFileManually}
          handleChangeInputFileManually={handleChangeInputFileManually}
        />
      </div>
    </div>
    <div className="row">
      <div className={`${globalStyles.container} container`}>
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
            className={`${buttonsStyles.buttonUIAddFile} btn btn-link`}
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
        baseClassButton={`${buttonsStyles.buttonUIFeedbackSubmit} btn`}
        disabled={!namespacesData.length}
        style={{ width: '235px' }}
      />
    </div>
  </form>
);

export default ConfigMapCreateForm;
