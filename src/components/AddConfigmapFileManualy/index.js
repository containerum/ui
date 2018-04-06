import React from 'react';
import Tooltip from 'rc-tooltip';
import InputControl from '../../components/InputControl';

type Props = {
  fileName: string,
  onHandleChangeFileName: (value: string) => void,
  handleChangeTextArea: (e: Object) => void,
  textArea: string,
  id: Number,
  files: Array,
  handleDeleteFilesManualy: () => void
};

const AddConfigMapFileManualy = ({
  fileName,
  onHandleChangeFileName,
  handleChangeTextArea,
  textArea,
  id,
  files,
  handleDeleteFilesManualy
}: Props) => (
  <div>
    <div className="row row__cfm-add-file">
      <Tooltip
        placement="left"
        trigger={files.length > 0 ? ['hover'] : ''}
        overlay={<span>You can use only one additing method</span>}
      >
        <div className="container no-back container__cfm-add-file">
          <InputControl
            value={fileName}
            id={fileName}
            type="text"
            pattern="^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
            required
            baseClassName="form-group__input-text form-group__input-text_configmap form-control customInput"
            baseClassNameLabel={`form-group__label ${fileName &&
              'form-group__label-always-onfocus'}`}
            labelText="File name"
            baseClassNameHelper="form-group__helper"
            handleChangeInput={e => onHandleChangeFileName(e.target.value)}
            disabled={files.length > 0}
          />
        </div>
      </Tooltip>
      {(fileName || textArea) && (
        <div
          className="dropzone-item "
          style={{ background: 'none' }}
          onClick={handleDeleteFilesManualy}
        >
          <i className="material-icons" role="presentation">
            delete
          </i>
        </div>
      )}
    </div>
    <div className="row" style={{ paddingTop: '30px' }}>
      <div className="container no-back">
        <div className="input-group">
          <Tooltip
            placement="topRight"
            trigger={files.length > 0 ? ['hover'] : ''}
            overlay={<span>You can use only one additing method</span>}
          >
            <textarea
              id={id}
              name="textArea"
              className="form-control form-control__configmap"
              value={textArea}
              onChange={e => handleChangeTextArea(e)}
              placeholder="Type config here"
              rows="5"
              disabled={files.length > 0}
              required
            >
              {' '}
            </textarea>
          </Tooltip>
        </div>
      </div>
    </div>
  </div>
);

export default AddConfigMapFileManualy;
