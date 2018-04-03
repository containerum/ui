import React from 'react';
import InputControl from '../../components/InputControl';

type Props = {
  name: string,
  onHandleChangeName: (value: string) => void,
  valid: boolean
};

const ConfigmapCreateForm = ({ name, onHandleChangeName, valid }: Props) => (
  <div className="row">
    <div className="container no-back">
      <InputControl
        value={name}
        id="configMapName"
        type="text"
        valid={valid}
        pattern="^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
        required
        baseClassName="form-group__input-text form-control customInput"
        baseClassNameLabel={`form-group__label ${name &&
          'form-group__label-always-onfocus'}`}
        labelText="ConfigMap name"
        textHelper="Name of ConfigMap"
        baseClassNameHelper="form-group__helper"
        handleChangeInput={e => onHandleChangeName(e.target.value)}
      />
    </div>
  </div>
);

export default ConfigmapCreateForm;
