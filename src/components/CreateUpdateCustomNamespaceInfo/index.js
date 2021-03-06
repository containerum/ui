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
          <div className="containerSubTitle" style={{ marginBottom: 20 }}>
            Enter Project name
          </div>
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
    <div
      className="row rowLine"
      id="parameters"
      style={{ borderBottom: 'none' }}
    >
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
          value={cpu}
          id="cpu"
          type="number"
          required
          min="1"
          baseClassName="form-group__input-text form-control customInput"
          baseClassNameLabel={`form-group__label ${
            cpu || cpu === 0 ? 'form-group__label-always-onfocus' : ''
          }`}
          labelText="CPU"
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
          required
          min="1"
          baseClassName="form-group__input-text form-control customInput"
          baseClassNameLabel={`form-group__label ${
            memory || memory === 0 ? 'form-group__label-always-onfocus' : ''
          }`}
          labelText="RAM"
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
          required
          min="1"
          baseClassName="form-group__input-text form-control customInput"
          baseClassNameLabel={`form-group__label ${
            maxExtServices || maxExtServices === 0
              ? 'form-group__label-always-onfocus'
              : ''
          }`}
          labelText="Max Ext Services"
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
          required
          min="1"
          baseClassName="form-group__input-text form-control customInput"
          baseClassNameLabel={`form-group__label ${
            maxIntServices || maxIntServices === 0
              ? 'form-group__label-always-onfocus'
              : ''
          }`}
          labelText="Max Int Services"
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
          required
          min="1"
          baseClassName="form-group__input-text form-control customInput"
          baseClassNameLabel={`form-group__label ${
            maxTraffic || maxTraffic === 0
              ? 'form-group__label-always-onfocus'
              : ''
          }`}
          labelText="Max Traffic"
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
