/* @flow */

import React from 'react';
import ReactFileReader from 'react-file-reader';

import LoadButton from '../LoadButton';

type Props = {
  data: Array<Object>,
  isFetching: boolean,
  textArea: string,
  group: string,
  files: Array,
  handleOnSubmit: (e: Object) => void,
  handleChangeTextArea: (e: Object) => void,
  handleChangeGroup: (e: Object) => void,
  handleDeleteImage: (fileName: string) => void,
  handleFiles: (files: Array) => void
};

const SupportList = ({
  data,
  isFetching,
  textArea,
  group,
  files,
  handleOnSubmit,
  handleChangeTextArea,
  handleChangeGroup,
  handleDeleteImage,
  handleFiles
}: Props) => (
  <div className="content-block-content">
    <div className="feedback-form">
      <div className="feedback-form__title title">New support ticket</div>
      <div className="form-group">
        <form onSubmit={e => handleOnSubmit(e)}>
          <div className="input-group select">
            <select
              name="category"
              id="feedback-category"
              className="custom-select"
              value={group}
              onChange={e => handleChangeGroup(e)}
              required
            >
              {Object.keys(data).map(item => {
                if (!Number.isInteger(data[item])) {
                  return (
                    <option
                      key={data[item].group.group_id}
                      value={data[item].group.group_id}
                    >
                      {data[item].group.group_title}
                    </option>
                  );
                }
                return null;
              })}
            </select>
          </div>
          <div className="input-group">
            <textarea
              name="textArea"
              className="form-control"
              value={textArea}
              onChange={e => handleChangeTextArea(e)}
              placeholder="Having a trouble with deployment or need assistance?&#13;&#10;Describe your issue here and we'll get back to you shortly."
              rows="10"
              required
            >
              {' '}
            </textarea>
          </div>
          <section style={{ margin: '15px 0' }}>
            {files.length ? (
              <aside>
                {files.map(file => (
                  <div key={file.name} className="dropzone-item">
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
              <ReactFileReader
                fileTypes={[
                  'image/x-png',
                  'image/gif',
                  'image/jpeg',
                  'application/pdf',
                  'text/plain'
                ]}
                base64
                multipleFiles
                handleFiles={arrFiles => handleFiles(arrFiles)}
              >
                <div className="dropzone">
                  <p className="dropzone-p">
                    <i className="material-icons">cloud_upload</i>Click here to
                    upload file (.png, .gif, .jpeg, .pdf or .txt)
                  </p>
                </div>
              </ReactFileReader>
            )}
          </section>
          <div className="feedback-form__buttons btn-block">
            <LoadButton
              type="submit"
              buttonText="Submit Ticket"
              isFetching={isFetching}
              baseClassButton="feedback-form__submit btn"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default SupportList;
