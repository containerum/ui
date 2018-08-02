/* @flow */

import React from 'react';

import InputControl from '../InputControl';
import globalStyles from '../../theme/global.scss';

type Props = {
  type: string,
  label: string,
  storage: number,
  handleChangeInput: (type: string, value: string) => void
};

const CreateCustomNamespaceInfo = ({
  type,
  label,
  storage,
  handleChangeInput
}: Props) => (
  <div>
    <div
      className="row rowLine"
      style={{ borderBottom: 'none', paddingBottom: 0 }}
      id="name"
    >
      {type === 'update' ? (
        <div className="col-md-7">
          <div className={globalStyles.containerTitle}>
            {label}{' '}
            <span className={globalStyles.containerTitleText}>volume</span>
          </div>
        </div>
      ) : (
        <div className="col-md-7">
          <div className="containerTitle">
            <span>*</span> Name
            {/* <Tooltip */}
            {/* placement='top' */}
            {/* trigger={['hover']} */}
            {/* overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>} */}
            {/* > */}
            {/* <span className="myTooltip" data-toggle="tooltip">?</span> */}
            {/* </Tooltip> */}
          </div>
          <div className="containerSubTitle" style={{ marginBottom: 20 }}>
            Enter Volume name
          </div>
          <InputControl
            value={label}
            id="name"
            type="text"
            pattern="^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
            required
            baseClassName="form-group__input-text form-control customInput"
            baseClassNameLabel={`form-group__label ${label &&
              'form-group__label-always-onfocus'}`}
            labelText="Name"
            textHelper="Volume name can only contain letters, numbers and characters"
            baseClassNameHelper="form-group__helper"
            handleChangeInput={e => handleChangeInput('label', e.target.value)}
          />
        </div>
      )}
    </div>
    <div className="row rowLine" id="parameters">
      <div className="col-md-12">
        <div className="containerTitle containerBlockTitle">
          <span>*</span> Parameters
          {/* <Tooltip */}
          {/* placement='top' */}
          {/* trigger={['hover']} */}
          {/* overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>} */}
          {/* > */}
          {/* <span className="myTooltip" data-toggle="tooltip">?</span> */}
          {/* </Tooltip> */}
        </div>
      </div>
      <div className="col-md-5 myColumn" style={{ marginBottom: 20 }}>
        <InputControl
          value={storage}
          id="storage"
          type="number"
          required
          min="1"
          baseClassName="form-group__input-text form-control customInput"
          baseClassNameLabel={`form-group__label ${
            storage || storage === 0 ? 'form-group__label-always-onfocus' : ''
          }`}
          labelText="Storage"
          handleChangeInput={e => {
            const storageValue = parseInt(e.target.value, 10);
            handleChangeInput(
              'storage',
              Number.isInteger(storageValue) ? storageValue : ''
            );
          }}
        />
      </div>
    </div>
  </div>
);

export default CreateCustomNamespaceInfo;
