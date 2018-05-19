/* @flow */

import React from 'react';
import className from 'classnames/bind';

import InputControl from '../InputControl';
import CheckBoxControl from '../CheckBoxControl';

import globalStyles from '../../theme/global.scss';
import inputStyles from '../../components/InputControl/index.scss';

const globalClass = className.bind(globalStyles);

const formClassName = globalClass('formInputText', 'formControl');

type Props = {
  currentService: Object,
  servicesList: Array<Object>,
  currentPort: Object,
  portsList: Array<Object>,
  domainName: string,
  domainPath: string,
  isEnabledSSL: boolean,
  handleChangeSelectService: (value: string) => void,
  handleChangeSelectPort: (value: string) => void,
  handleChangeInput: (value: string, type: string) => void,
  handleChangeCheckBox: () => void
};

const CreateDomainCard = ({
  currentService,
  servicesList,
  currentPort,
  portsList,
  domainName,
  domainPath,
  isEnabledSSL,
  handleChangeSelectService,
  handleChangeSelectPort,
  handleChangeInput,
  handleChangeCheckBox
}: Props) => (
  <div className="blockContainer blockAddContainerPadin" id="target-deployment">
    <div className="row rowLine">
      <div className="col-md-12">
        <div className="containerTitle" style={{ display: 'block' }}>
          Target Service
        </div>

        <div
          className="col-md-4"
          style={{ display: 'inline-block', paddingLeft: 0 }}
        >
          <div style={{ margin: '30px 0px 5px' }} className="containerSubTitle">
            External Service Name
          </div>
          <div className="select-wrapper">
            <div className="select-arrow-3" />
            <div className="select-arrow-3" />
            <select
              name="services"
              className="selectCustom selectGreyColor"
              value={currentService && currentService.name}
              onChange={e => handleChangeSelectService(e.target.value)}
              required
              disabled
            >
              {servicesList.map(item => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          className="col-md-4"
          style={{ display: 'inline-block', marginLeft: '20px' }}
        >
          <div style={{ margin: '30px 0px 5px' }} className="containerSubTitle">
            Target port
          </div>
          <div className="select-wrapper">
            <div className="select-arrow-3" />
            <div className="select-arrow-3" />
            <select
              name="ports"
              className="selectCustom selectGreyColor"
              value={currentPort && currentPort.port}
              onChange={e => handleChangeSelectPort(e.target.value)}
              required
            >
              {portsList.map(
                port =>
                  port.protocol === 'TCP' && (
                    <option key={port.port} value={port.port}>
                      {port.port}
                    </option>
                  )
              )}
            </select>
          </div>
        </div>

        <div className="helperText isHidden">
          Select the deployment for which the Service applies
        </div>
      </div>
    </div>
    <div
      className="row rowLine"
      style={{ borderBottom: 'none', paddingBottom: '20px' }}
    >
      <div className="col-md-7">
        <div className="containerTitle containerBlockTitle">
          <span>*</span> Domains
        </div>
        <InputControl
          value={domainName}
          id="domainName"
          type="text"
          required
          baseClassName={`${formClassName} ${inputStyles.Domain}`}
          baseClassNameLabel={`${globalStyles.formGroupLabel} ${domainName &&
            globalStyles.formGroupLabelOnFocus}`}
          labelText="Domain"
          baseClassNameHelper={globalStyles.formGroupHelper}
          handleChangeInput={e => {
            // e.target.setSelectionRange(-domainName.length, -domainName.length);
            handleChangeInput(e.target.value, 'domainName');
          }}
          alwaysVisiblePlaceholder="customAlwaysVisiblePlaceholder"
        />
        <InputControl
          value={domainPath}
          id="domainPath"
          type="text"
          baseClassName={`${formClassName} ${inputStyles.Domain}`}
          baseClassNameLabel={`${globalStyles.formGroupLabel} ${domainPath &&
            globalStyles.formGroupLabelOnFocus}`}
          labelText="Path"
          title="Path that the External Service watches to route traffic"
          textHelper="Path that the External Service watches to route traffic"
          baseClassNameHelper={globalStyles.formGroupHelper}
          handleChangeInput={e =>
            handleChangeInput(e.target.value, 'domainPath')
          }
          alwaysVisiblePlaceholder="customAlwaysVisibleInputPathPlaceholder"
        />
        <div style={{ marginTop: '40px' }}>
          <div
            className="col-md-6"
            style={{ display: 'inline-block', paddingLeft: 0 }}
          >
            <CheckBoxControl
              id="ssl"
              value={isEnabledSSL}
              labelText="Enable SSL Security"
              labelClassName="customLabel"
              handleChangeCheckBox={handleChangeCheckBox}
            />
          </div>
          {isEnabledSSL && (
            <div
              className="col-md-6 select-wrapper"
              style={{ display: 'inline-block' }}
            >
              <div className="select-arrow-3" />
              <div className="select-arrow-3" />
              <select
                name="encrypt"
                className="selectCustom selectGreyColor"
                value="Let`s Encrypt"
                disabled
                onChange={() => console.log('Let`s Encrypt')}
              >
                <option key="Let`s Encrypt" value="Let`s Encrypt">
                  Let`s Encrypt
                </option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default CreateDomainCard;
