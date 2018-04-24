import React from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router';
// import Tooltip from 'rc-tooltip';

import icon from '../../images/icon-create-dep.svg';
import InputControl from '../InputControl';

type Props = {
  externalSrvNameValue: string,
  internalSrvNameValue: string,
  handleChangeServiceNameValue: (e: Object, type: string) => void,
  externalSrvObject: Array,
  internalSrvObject: Array,
  isActiveInternal: boolean,
  isActiveExternal: boolean,
  service: string,
  handleChangeActivityInternal: () => void,
  handleChangeActivityExternal: () => void,
  handleClickAddInternalPort: () => void,
  handleClickAddExternalPort: () => void,
  handleClickRemoveInternalPort: (id: string) => void,
  handleClickRemoveExternalPort: (id: string) => void,
  handleChangeService: (
    e: Object,
    id: string,
    index: number,
    type: string,
    inputType: string
  ) => void
};

const ServiceForm = ({
  externalSrvNameValue,
  internalSrvNameValue,
  handleChangeServiceNameValue,
  internalSrvObject,
  externalSrvObject,
  isActiveInternal,
  isActiveExternal,
  service,
  handleClickAddInternalPort,
  handleClickAddExternalPort,
  handleChangeActivityInternal,
  handleChangeActivityExternal,
  handleClickRemoveInternalPort,
  handleClickRemoveExternalPort,
  handleChangeService
}: Props) => (
  <div>
    <div className="blockContainer blockContainerPadin" id="internal-service">
      <div className="row">
        <div className="col-md-9">
          <div className="containerTitle marLeft20" id="port">
            {service ? (
              <div>
                {service}{' '}
                <span className="containerTitleText">internal service</span>
              </div>
            ) : (
              <div>
                <span className="isHidden">*</span> Internal Service
              </div>
            )}
          </div>
        </div>
        <div className="col-md-3">
          <div
            className={
              isActiveInternal
                ? 'serviceSwitcher serviceSwitcherOn'
                : 'serviceSwitcher'
            }
            onClick={handleChangeActivityInternal}
            onKeyPress={handleChangeActivityInternal}
            role="presentation"
          />
        </div>
      </div>
      {isActiveInternal && (
        <div className="serviceWrapper">
          <div className="row rowLine">
            <div className="col-md-6">
              <div className="has-float-label marTop40">
                <InputControl
                  value={internalSrvNameValue}
                  id="internalSrvNameValue"
                  type="text"
                  required
                  baseClassName="form-group__input-text form-control customInput"
                  baseClassNameLabel={`form-group__label ${internalSrvNameValue &&
                    'form-group__label-always-onfocus'}`}
                  labelText="Service Name"
                  textHelper="Your Internal Name is the same as the name of Deployment"
                  baseClassNameHelper="helperText"
                  handleChangeInput={e =>
                    handleChangeServiceNameValue(e, 'internalSrvNameValue')
                  }
                />
              </div>
            </div>
          </div>
          <div className="row rowWithoutLine">
            <div className="col-md-12">
              <div className="containerTitle containerBlockTitle">
                <span>*</span> Ports
                {/* <Tooltip */}
                {/* placement='top' */}
                {/* trigger={['hover']} */}
                {/* overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>} */}
                {/* > */}
                {/* <span className="myTooltip" data-toggle="tooltip">?</span> */}
                {/* </Tooltip> */}
              </div>
            </div>
            {internalSrvObject.map((item, index) => {
              const { id } = item;
              const {
                internalSrvName,
                internalSrvPort,
                internalSrvTargetPort,
                intServiceType
              } = internalSrvObject[index];
              return (
                <div style={{ display: 'flex', width: '96%' }} key={id}>
                  <div className="col-md-3">
                    <div className="has-float-label">
                      <InputControl
                        value={internalSrvName}
                        id={`${id}internalSrvName`}
                        type="text"
                        required
                        baseClassName="form-group__input-text form-control customInput"
                        baseClassNameLabel={`form-group__label ${internalSrvName &&
                          'form-group__label-always-onfocus'}`}
                        labelText="Name"
                        textHelper={
                          index === 0 && 'The port name of Internal Service'
                        }
                        baseClassNameHelper="helperText"
                        handleChangeInput={e =>
                          handleChangeService(
                            e,
                            id,
                            index,
                            'internalSrvObject',
                            'internalSrvName'
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="has-float-label">
                      <InputControl
                        value={internalSrvPort}
                        id={`${id}internalSrvPort`}
                        type="number"
                        required
                        min="1"
                        max="65535"
                        baseClassName="form-group__input-text form-control customInput"
                        baseClassNameLabel={`form-group__label ${internalSrvPort &&
                          'form-group__label-always-onfocus'}`}
                        labelText="Port"
                        textHelper={
                          index === 0 && 'The port of Internal Service'
                        }
                        baseClassNameHelper="helperText"
                        handleChangeInput={e =>
                          handleChangeService(
                            e,
                            id,
                            index,
                            'internalSrvObject',
                            'internalSrvPort'
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="has-float-label">
                      <InputControl
                        value={internalSrvTargetPort}
                        id={`${id}internalSrvTargetPort`}
                        type="number"
                        required
                        min="1"
                        max="65535"
                        baseClassName="form-group__input-text form-control customInput"
                        baseClassNameLabel={`form-group__label ${internalSrvTargetPort &&
                          'form-group__label-always-onfocus'}`}
                        labelText="Target Port"
                        textHelper={
                          index === 0 && 'The target port into your Container'
                        }
                        baseClassNameHelper="helperText"
                        handleChangeInput={e =>
                          handleChangeService(
                            e,
                            id,
                            index,
                            'internalSrvObject',
                            'internalSrvTargetPort'
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <div className="select-wrapper">
                        <div className="select-arrow-3" />
                        <div className="select-arrow-3" />
                        <select
                          name="deployment"
                          className="selectCustom selectGreyColor"
                          value={intServiceType}
                          onChange={e =>
                            handleChangeService(
                              e,
                              id,
                              index,
                              'internalSrvObject',
                              'intServiceType'
                            )
                          }
                          required
                        >
                          <option value="TCP">TCP</option>
                          <option value="UDP">UDP</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-1"
                    onKeyPress={() => handleClickRemoveInternalPort(id)}
                    onClick={() => handleClickRemoveInternalPort(id)}
                    role="presentation"
                  >
                    <img
                      src={icon}
                      alt="delete"
                      className="iconBasket"
                      style={{ marginTop: '30px' }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="col-md-12">
              <div
                className="addBlockBtn marLeft"
                onKeyPress={() => handleClickAddInternalPort()}
                onClick={() => handleClickAddInternalPort()}
                role="presentation"
              >
                + Add Port
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <div className="blockContainer blockContainerPadin" id="external-service">
      <div className="row">
        <div className="col-md-9">
          <div className="containerTitle marLeft20">
            {service ? (
              <div>
                {service}{' '}
                <span className="containerTitleText">external Service</span>
              </div>
            ) : (
              <div>
                <span className="isHidden">*</span> External Service
              </div>
            )}
          </div>
        </div>
        <div className="col-md-3">
          <div
            className={
              isActiveExternal
                ? 'serviceSwitcher serviceSwitcherOn'
                : 'serviceSwitcher'
            }
            onClick={handleChangeActivityExternal}
            onKeyPress={handleChangeActivityExternal}
            role="presentation"
          >
            {' '}
          </div>
        </div>
      </div>
      {isActiveExternal && (
        <div className="serviceWrapper">
          <div className="row rowLine">
            <div className="col-md-6">
              <div className="has-float-label marTop40">
                <InputControl
                  value={externalSrvNameValue}
                  id="externalSrvNameValue"
                  type="text"
                  required
                  baseClassName="form-group__input-text form-control customInput"
                  baseClassNameLabel={`form-group__label ${externalSrvNameValue &&
                    'form-group__label-always-onfocus'}`}
                  labelText="Service Name"
                  textHelper="Your External Name is the same as the name of Deployment"
                  baseClassNameHelper="helperText"
                  handleChangeInput={e =>
                    handleChangeServiceNameValue(e, 'externalSrvNameValue')
                  }
                />
              </div>
            </div>
          </div>
          <div className="row rowWithoutLine">
            <div className="col-md-12">
              <div className="containerTitle containerBlockTitle">
                <span>*</span> Ports
                {/* <Tooltip */}
                {/* placement='top' */}
                {/* trigger={['hover']} */}
                {/* overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>} */}
                {/* > */}
                {/* <span className="myTooltip" data-toggle="tooltip">?</span> */}
                {/* </Tooltip> */}
              </div>
            </div>
            {externalSrvObject.map((item, index) => {
              const { id } = item;
              const {
                externalSrvName,
                externalSrvTargetPort,
                extServiceType
              } = externalSrvObject[index];
              return (
                <div style={{ display: 'flex', width: '100%' }} key={id}>
                  <div className="col-md-3">
                    <div className="has-float-label">
                      <InputControl
                        value={externalSrvName}
                        id={`${id}externalSrvName`}
                        type="text"
                        required
                        baseClassName="form-group__input-text form-control customInput"
                        baseClassNameLabel={`form-group__label ${externalSrvName &&
                          'form-group__label-always-onfocus'}`}
                        labelText="Name"
                        textHelper={
                          index === 0 && 'The port name of Internal Service'
                        }
                        baseClassNameHelper="helperText"
                        handleChangeInput={e =>
                          handleChangeService(
                            e,
                            id,
                            index,
                            'externalSrvObject',
                            'externalSrvName'
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="has-float-label">
                      <InputControl
                        value={externalSrvTargetPort}
                        id={`${id}externalSrvTargetPort`}
                        type="number"
                        required
                        min="1"
                        max="65535"
                        baseClassName="form-group__input-text form-control customInput"
                        baseClassNameLabel={`form-group__label ${externalSrvTargetPort &&
                          'form-group__label-always-onfocus'}`}
                        labelText="Target Port"
                        textHelper={
                          index === 0 && 'The target port into your Container'
                        }
                        baseClassNameHelper="helperText"
                        handleChangeInput={e =>
                          handleChangeService(
                            e,
                            id,
                            index,
                            'externalSrvObject',
                            'externalSrvTargetPort'
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <div className="select-wrapper">
                        <div className="select-arrow-3" />
                        <div className="select-arrow-3" />
                        <select
                          name="deployment"
                          className="selectCustom selectGreyColor"
                          value={extServiceType}
                          onChange={e =>
                            handleChangeService(
                              e,
                              id,
                              index,
                              'externalSrvObject',
                              'extServiceType'
                            )
                          }
                          required
                        >
                          <option value="TCP">TCP</option>
                          <option value="UDP">UDP</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-1"
                    onKeyPress={() => handleClickRemoveExternalPort(id)}
                    onClick={() => handleClickRemoveExternalPort(id)}
                    role="presentation"
                  >
                    <img
                      src={icon}
                      alt="delete"
                      className="iconBasket"
                      style={{ marginTop: '30px' }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="col-md-12">
              <div
                className="addBlockBtn marLeft"
                onKeyPress={() => handleClickAddExternalPort()}
                onClick={() => handleClickAddExternalPort()}
                role="presentation"
              >
                + Add Port
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default ServiceForm;
