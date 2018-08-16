/* @flow */

import React from 'react';
import className from 'classnames/bind';

import InputControl from '../InputControl';
import globalStyles from '../../theme/global.scss';
import buttonsStyles from '../../theme/buttons.scss';
import inputStyles from '../../components/InputControl/index.scss';
import icon from '../../images/icon-create-dep.svg';

const globalClass = className.bind(globalStyles);
const titleClassName = globalClass('containerTitle', 'containerTitleBlock');
const formClassName = globalClass('formInputText', 'formControl');

type Props = {
  type: string,
  label: string,
  url: string,
  records: Array,
  handleChangeInput: (type: string, value: string) => void,
  handleClickAddRecord: () => void,
  handleClickRemoveRecord: (id: string) => void,
  handleChangeInputRecord: (value: string, id: string, type: string) => void
};

const CreateUpdateSecretInfo = ({
  type,
  label,
  url,
  records,
  handleChangeInput,
  handleClickAddRecord,
  handleClickRemoveRecord,
  handleChangeInputRecord
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
            <span className={globalStyles.containerTitleText}>secret</span>
          </div>
        </div>
      ) : (
        <div className="col-md-7">
          <div className="containerTitle" style={{ marginBottom: 30 }}>
            Create Secret
          </div>
          <InputControl
            value={label}
            id="secretName"
            type="text"
            pattern="^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
            required
            baseClassName="form-group__input-text form-control customInput"
            baseClassNameLabel={`form-group__label ${label &&
              'form-group__label-always-onfocus'}`}
            labelText="Name"
            textHelper="Secret name can only contain letters, numbers and characters"
            baseClassNameHelper="form-group__helper"
            handleChangeInput={e => handleChangeInput('label', e.target.value)}
          />
          <br />
          <InputControl
            value={url}
            id="secretUrl"
            type="text"
            pattern="^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?$"
            title="Example: https://registry.containerum.net"
            maxLength={150}
            required
            baseClassName="form-group__input-text form-control customInput"
            baseClassNameLabel={`form-group__label ${url &&
              'form-group__label-always-onfocus'}`}
            labelText="Url"
            textHelper="Example: https://registry.containerum.net"
            baseClassNameHelper="form-group__helper"
            handleChangeInput={e => handleChangeInput('url', e.target.value)}
          />
        </div>
      )}
    </div>
    <div className={`${globalStyles.rowLine} row`} id="container-records">
      <div className="col-md-12">
        <div className={titleClassName}>Parameters</div>
      </div>
      {records.map((item, index) => {
        const { id, key, value } = item;
        return (
          <div className="row ml-0" key={id} style={{ width: '100%' }}>
            <div className={`${globalStyles.columnCustom} col-md-5`}>
              <InputControl
                value={key}
                id={`recordName${id}`}
                type="text"
                pattern="[-._a-zA-Z][-._a-zA-Z0-9]*|^$"
                baseClassName={`${formClassName} ${inputStyles.inputCustom}`}
                baseClassNameLabel={`${globalStyles.formGroupLabel} ${key &&
                  globalStyles.formGroupLabelOnFocus}`}
                labelText="Name"
                baseClassNameHelper={globalStyles.formGroupHelper}
                title={`The Record instruction sets the record variable ${`<key>`} to the value ${`<value>`}`}
                textHelper={
                  index === 0 &&
                  `The Record instruction sets the record variable ${`<key>`} to the value ${`<value>`}`
                }
                handleChangeInput={e =>
                  handleChangeInputRecord(e.target.value, index, 'key')
                }
              />
            </div>
            <div className={`${globalStyles.columnCustom} col-md-5`}>
              <InputControl
                value={value}
                id={`recordValue${id}`}
                type="text"
                baseClassName={`${formClassName} ${inputStyles.inputCustom}`}
                baseClassNameLabel={`${globalStyles.formGroupLabel} ${value &&
                  globalStyles.formGroupLabelOnFocus}`}
                labelText="Value"
                title="Value can only contain letters, numbers and characters"
                maxLength={150}
                handleChangeInput={e =>
                  handleChangeInputRecord(e.target.value, index, 'value')
                }
              />
            </div>
            <div
              className="col-md-1"
              onClick={() => handleClickRemoveRecord(id)}
            >
              <img
                src={icon}
                alt="delete"
                className={globalStyles.iconBasket}
              />
            </div>
          </div>
        );
      })}
      <div className="col-md-12">
        <div
          className={`${buttonsStyles.buttonUIAddBlock} ml-0`}
          onClick={handleClickAddRecord}
        >
          + Add Record
        </div>
      </div>
    </div>
  </div>
);

export default CreateUpdateSecretInfo;
