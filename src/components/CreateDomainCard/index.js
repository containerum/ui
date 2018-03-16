/* @flow */

import React from 'react';

import InputControl from '../InputControl/index';

type Props = {
  currentService: string,
  serviceList: Array<Object>
  // serviceList: (value: string) => void
};

const CreateDomainCard = ({ currentService, serviceList }: Props) => (
  <div className="blockContainer blockAddContainerPadin" id="target-deployment">
    <div className="row rowLine">
      <div className="col-md-6">
        <div className="containerTitle">Target Service</div>
        <div style={{ margin: '30px 0px 5px' }} className="containerSubTitle">
          External Service Name
        </div>

        <div className="select-wrapper">
          <div className="select-arrow-3" />
          <div className="select-arrow-3" />
          <select
            name="deployment"
            className="selectCustom selectGreyColor"
            value={currentService}
            onChange={e => this.handleChange(e)}
            required
          >
            {serviceList.map(item => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="helperText isHidden">
          Select the deployment for which the Service applies
        </div>
      </div>
    </div>
    <div className="row rowLine">
      <div className="col-md-7">
        <div className="containerTitle containerBlockTitle">
          <span>*</span> Domains
        </div>
        <InputControl
          // value={name}
          // id={`containerName${id}`}
          type="text"
          required
          pattern="[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*"
          baseClassName="form-group__input-text form-control customInput"
          // baseClassNameLabel={`form-group__label ${name &&
          // 'form-group__label-always-onfocus'}`}
          labelText="Domain"
          // handleChangeInput={e =>
          //   handleChangeInputCommon(e.target.value, id, index, 'name')
          // }
          alwaysVisiblePlaceholder="customAlwaysVisiblePlaceholder"
        />
        <InputControl
          // value={image}
          // id={`dockerImage${id}`}
          type="text"
          required
          pattern="(?:.+/)?([^:]+)(?::.+)?*"
          baseClassName="form-group__input-text form-control customInput"
          // baseClassNameLabel={`form-group__label ${image &&
          // 'form-group__label-always-onfocus'}`}
          labelText="Docker Image"
          title="Example: redis or redis:latest or redis:4.0.7-alpine"
          textHelper="Example: redis or redis:latest or redis:4.0.7-alpine"
          baseClassNameHelper="form-group__helper"
          // handleChangeInput={e =>
          //   handleChangeInputCommon(e.target.value, id, index, 'image')
          // }
        />
      </div>
    </div>
  </div>
);

export default CreateDomainCard;
