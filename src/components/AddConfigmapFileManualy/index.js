import React from 'react';
import InputControl from '../../components/InputControl';

type Props = {
  fileName: string,
  onHandleChangeFileName: (value: string) => void,
  handleChangeTextArea: (e: Object) => void,
  textArea: string
};

const AddConfigMapFileManualy = ({
  fileName,
  onHandleChangeFileName,
  handleChangeTextArea,
  textArea
}: Props) => (
  <div>
    <div className="row">
      <div className="container no-back">
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
        />
      </div>
    </div>
    <div className="row" style={{ paddingTop: '30px' }}>
      <div className="container no-back">
        <div className="input-group">
          <textarea
            name="textArea"
            className="form-control form-control__configmap"
            value={textArea}
            onChange={e => handleChangeTextArea(e)}
            placeholder="Type config here"
            rows="5"
            required
          >
            {' '}
          </textarea>
        </div>
      </div>
    </div>
  </div>
);

export default AddConfigMapFileManualy;
