/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';

import { routerLinks } from '../../config';
import InputControl from '../InputControl';
import globalStyles from '../../theme/global.scss';

const globalClass = className.bind(globalStyles);
const selectClassName = globalClass('selectCustom', 'selectGreyColor');

type Props = {
  type: string,
  linkedStorage: Array<Object>,
  currentStorage: string,
  label: string,
  storage: number,
  handleChangeInput: (type: string, value: string) => void,
  handleChange: (e: Object) => void
};

const CreateCustomNamespaceInfo = ({
  type,
  linkedStorage,
  label,
  currentStorage,
  storage,
  handleChangeInput,
  handleChange
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
    <div
      className="row rowLine"
      id="parameters"
      style={{ borderBottom: 'none' }}
    >
      <div className="col-md-12">
        <div className="containerTitle containerBlockTitle">
          <span>*</span> Parameters
        </div>
      </div>
      <div className="col-md-7" style={{ marginBottom: 20 }}>
        {currentStorage ? (
          <div className={globalStyles.selectWrapper}>
            <div className={globalStyles.selectArrow} />
            <div className={globalStyles.selectArrow} />
            <select
              name="storage"
              className={selectClassName}
              value={currentStorage}
              onChange={e => handleChange(e)}
              disabled={!handleChange}
              required
            >
              {linkedStorage.map(item => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className={globalStyles.selectWrapper}>
            <Link
              className="blue-btn depl-btn"
              to={routerLinks.settings}
              style={{
                margin: 0,
                width: 160
              }}
            >
              Create Storage
            </Link>
          </div>
        )}
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
