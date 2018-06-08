/* @flow */

import React from 'react';

import InputControl from '../InputControl';
import globalStyles from '../../theme/global.scss';

type Props = {
  type: string,
  label: string,
  cpu: number,
  memory: number,
  maxExtServices: number,
  maxIntServices: number,
  maxTraffic: number,
  handleChangeInput: (type: string, value: string) => void
};

const CreateCustomNamespaceInfo = ({
  type,
  label,
  cpu,
  memory,
  maxExtServices,
  maxIntServices,
  maxTraffic,
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
            <span className={globalStyles.containerTitleText}>project</span>
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
          <div className="containerSubTitle">Enter Project name</div>
          <InputControl
            value={label}
            id="deploymentName"
            type="text"
            pattern="^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
            required
            baseClassName="form-group__input-text form-control customInput"
            baseClassNameLabel={`form-group__label ${label &&
              'form-group__label-always-onfocus'}`}
            labelText="Name"
            textHelper="Project name can only contain letters, numbers and characters"
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
      <div className="col-md-5 myColumn">
        <InputControl
          value={cpu}
          id="cpu"
          type="number"
          pattern="(3000|[12][0-9]{3}|[1-9][0-9]{1,2})"
          required
          min="10"
          max="3000"
          baseClassName="form-group__input-text form-control customInput"
          baseClassNameLabel={`form-group__label ${
            cpu || cpu === 0 ? 'form-group__label-always-onfocus' : ''
          }`}
          labelText="CPU"
          title="Range: 10 - 3000"
          textHelper="Range: 10 - 3000"
          baseClassNameHelper="form-group__helper"
          handleChangeInput={e => {
            const cpuValue = parseInt(e.target.value, 10);
            handleChangeInput(
              'cpu',
              Number.isInteger(cpuValue) ? cpuValue : ''
            );
          }}
        />
      </div>
      <div className="col-md-5 myColumn">
        <InputControl
          value={memory}
          id="memory"
          type="number"
          pattern="(8000|[1-7][0-9]{3}|[1-9][0-9]{1,2})"
          required
          min="10"
          max="8000"
          baseClassName="form-group__input-text form-control customInput"
          baseClassNameLabel={`form-group__label ${
            memory || memory === 0 ? 'form-group__label-always-onfocus' : ''
          }`}
          labelText="RAM"
          title="Range: 10 - 8000"
          textHelper="Range: 10 - 8000"
          baseClassNameHelper="form-group__helper"
          handleChangeInput={e => {
            const cpuValue = parseInt(e.target.value, 10);
            handleChangeInput(
              'memory',
              Number.isInteger(cpuValue) ? cpuValue : ''
            );
          }}
        />
      </div>

      <div className="col-md-4 myColumnColMd4">
        <InputControl
          value={maxExtServices}
          id="maxExtServices"
          type="number"
          pattern="(1000|[12][0-9]{3}|[1-9][0-9]{1,2})"
          required
          min="1"
          max="1000"
          baseClassName="form-group__input-text form-control customInput"
          baseClassNameLabel={`form-group__label ${
            maxExtServices || maxExtServices === 0
              ? 'form-group__label-always-onfocus'
              : ''
          }`}
          labelText="Max Ext Services"
          title="Range: 10 - 3000"
          textHelper="Range: 10 - 3000"
          baseClassNameHelper="form-group__helper"
          handleChangeInput={e => {
            const maxExtServicesValue = parseInt(e.target.value, 10);
            handleChangeInput(
              'maxExtServices',
              Number.isInteger(maxExtServicesValue) ? maxExtServicesValue : ''
            );
          }}
        />
      </div>
      <div className="col-md-4 myColumnColMd4">
        <InputControl
          value={maxIntServices}
          id="maxIntServices"
          type="number"
          pattern="(1000|[12][0-9]{3}|[1-9][0-9]{1,2})"
          required
          min="1"
          max="1000"
          baseClassName="form-group__input-text form-control customInput"
          baseClassNameLabel={`form-group__label ${
            maxIntServices || maxIntServices === 0
              ? 'form-group__label-always-onfocus'
              : ''
          }`}
          labelText="Max Int Services"
          title="Range: 10 - 8000"
          textHelper="Range: 10 - 8000"
          baseClassNameHelper="form-group__helper"
          handleChangeInput={e => {
            const maxIntServicesValue = parseInt(e.target.value, 10);
            handleChangeInput(
              'maxIntServices',
              Number.isInteger(maxIntServicesValue) ? maxIntServicesValue : ''
            );
          }}
        />
      </div>
      <div className="col-md-4 myColumnColMd4">
        <InputControl
          value={maxTraffic}
          id="maxTraffic"
          type="number"
          pattern="(8000|[12][0-9]{3}|[1-9][0-9]{1,2})"
          required
          min="1"
          max="8000"
          baseClassName="form-group__input-text form-control customInput"
          baseClassNameLabel={`form-group__label ${
            maxTraffic || maxTraffic === 0
              ? 'form-group__label-always-onfocus'
              : ''
          }`}
          labelText="Max Traffic"
          title="Range: 10 - 8000"
          textHelper="Range: 10 - 8000"
          baseClassNameHelper="form-group__helper"
          handleChangeInput={e => {
            const cpuValue = parseInt(e.target.value, 10);
            handleChangeInput(
              'maxTraffic',
              Number.isInteger(cpuValue) ? cpuValue : ''
            );
          }}
        />
      </div>
    </div>
  </div>
);

export default CreateCustomNamespaceInfo;
