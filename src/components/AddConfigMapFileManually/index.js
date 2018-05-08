import React from 'react';
import Tooltip from 'rc-tooltip';
import className from 'classnames/bind';

import InputControl from '../../components/InputControl';

import globalStyles from '../../theme/global.scss';

type Props = {
  files: Array,
  filesManually: Array<Object>,
  handleDeleteFileManually: (id: number) => void,
  handleChangeInputFileManually: (
    index: number,
    value: string,
    type: string
  ) => void
};

const globalClass = className.bind(globalStyles);

const containerClassName = globalClass(
  'container',
  'containerNoBackground',
  'containerConfigmpAddFile'
);
const container2ClassName = globalClass('container', 'containerNoBackground');
const formClassName = globalClass('formControl', 'formControlConfigmap');

const AddConfigMapFileManually = ({
  filesManually,
  handleChangeInputFileManually,
  files,
  handleDeleteFileManually
}: Props) => (
  <div>
    {filesManually.map((file, index) => {
      const { id } = file;
      return (
        <div key={id}>
          <div className={`${globalStyles.rowConfigmapAddFile} row`}>
            <Tooltip
              placement="top"
              trigger={files.length > 0 ? ['hover'] : ''}
              overlay={<span>You can use only one additing method</span>}
            >
              <div className={`${containerClassName} container`}>
                <InputControl
                  value={file.fileName}
                  id={`fileName${id}`}
                  type="text"
                  pattern="^[-._a-zA-Z0-9]+$"
                  title="Valid file name must consist of alphanumeric characters, '-', '_' or '.'"
                  required
                  baseClassName="form-group__input-text form-group__input-text_configmap form-control customInput"
                  baseClassNameLabel={`form-group__label ${file.fileName &&
                    'form-group__label-always-onfocus'}`}
                  labelText="File name"
                  baseClassNameHelper="form-group__helper"
                  handleChangeInput={e =>
                    handleChangeInputFileManually(
                      index,
                      e.target.value,
                      'fileName'
                    )
                  }
                  disabled={files.length > 0}
                />
              </div>
            </Tooltip>
            {(file.fileName || file.textArea || filesManually.length > 1) && (
              <div
                className="dropzone-item "
                style={{ background: 'none' }}
                onClick={() => handleDeleteFileManually(id)}
              >
                <i className="material-icons" role="presentation">
                  delete
                </i>
              </div>
            )}
          </div>
          <div className="row" style={{ paddingTop: '30px' }}>
            <div className={`${container2ClassName} container`}>
              <div className={globalStyles.inputGroup}>
                <Tooltip
                  placement="top"
                  trigger={files.length > 0 ? ['hover'] : ''}
                  overlay={<span>You can use only one additing method</span>}
                >
                  <textarea
                    id={`textArea${id}`}
                    name="textArea"
                    className={`${formClassName} form-control`}
                    value={file.textArea}
                    onChange={e =>
                      handleChangeInputFileManually(
                        index,
                        e.target.value,
                        'textArea'
                      )
                    }
                    onKeyUp={e => {
                      e.target.style.height = '93px';
                      e.target.style.height = `${25 + e.target.scrollHeight}px`;
                    }}
                    style={{ overflow: 'hidden' }}
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
    })}
  </div>
);

export default AddConfigMapFileManually;
