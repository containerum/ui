/* @flow */

import React from 'react';
import className from 'classnames/bind';
import _ from 'lodash/fp';

import globalStyles from '../../theme/global.scss';
import InputControl from '../InputControl';
import inputStyles from '../../components/InputControl/index.scss';

const globalClass = className.bind(globalStyles);
const titleClassName = globalClass('containerTitle', 'containerTitleBlock');
const formClassName = globalClass('formInputText', 'formControl');

type Props = {
  dataSecret: Object,
  idSecret: string,
  handleDeleteSecret: (idSecret: string) => void
};

const SecretInfo = ({ dataSecret, idSecret, handleDeleteSecret }: Props) => {
  const { data } = dataSecret;
  const { auths } = JSON.parse(data['.dockerconfigjson']);
  const url = Object.keys(auths)[0];
  return (
    <div>
      <div
        className={`${
          globalStyles.contentBlockHeaderExtraPanel
        } dropdown no-arrow`}
      >
        <i
          className={`${globalStyles.contentBlockHeaderEllipsis} ${
            globalStyles.dropdownToggle
          } ${globalStyles.ellipsisRoleMore} ion-more `}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        />
        <ul
          className={` dropdown-menu dropdown-menu-right ${
            globalStyles.dropdownMenu
          }`}
          role="menu"
        >
          <button
            className={`dropdown-item ${globalStyles.dropdownItem} text-danger`}
            onClick={() => handleDeleteSecret(idSecret)}
          >
            Delete
          </button>
        </ul>
      </div>
      <div className="row" id="container-records">
        <div className="col-md-12">
          <div className={titleClassName} style={{ marginTop: 0 }}>
            Records
          </div>
        </div>
        {Object.keys(auths[url]).map((auth, index) => (
          <div
            className="row ml-0"
            key={_.uniqueId()}
            style={{ width: '100%' }}
          >
            <div className={`${globalStyles.columnCustom} col-md-5`}>
              <InputControl
                value={auth}
                type="text"
                pattern="[-._a-zA-Z][-._a-zA-Z0-9]*|^$"
                baseClassName={`${formClassName} ${inputStyles.inputCustom}`}
                baseClassNameLabel={`${globalStyles.formGroupLabel} ${auth &&
                  globalStyles.formGroupLabelOnFocus}`}
                labelText="Name"
                disabled
                baseClassNameHelper={globalStyles.formGroupHelper}
                title={`The Record instruction sets the record variable ${`<key>`} to the value ${`<value>`}`}
                textHelper={
                  index === 0 &&
                  `The Record instruction sets the record variable ${`<key>`} to the value ${`<value>`}`
                }
              />
            </div>
            <div className={`${globalStyles.columnCustom} col-md-5`}>
              <InputControl
                value={auths[url][auth]}
                type="text"
                baseClassName={`${formClassName} ${inputStyles.inputCustom}`}
                baseClassNameLabel={`${globalStyles.formGroupLabel} ${auths[
                  url
                ][auth] && globalStyles.formGroupLabelOnFocus}`}
                disabled
                labelText="Value"
                title="Value can only contain letters, numbers and characters"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecretInfo;
