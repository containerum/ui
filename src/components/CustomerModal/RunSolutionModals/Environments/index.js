/* @flow */

import React from 'react';
import className from 'classnames/bind';

import InputControl from '../../../InputControl';
import globalStyles from '../../../../theme/global.scss';
import inputStyles from '../../../../components/InputControl/index.scss';

const globalClass = className.bind(globalStyles);
const formClassName = globalClass('formInputText', 'formControl');

type Props = {
  envs: Object,
  handleChangeInputEnvironment: (value: string, env: string) => void
};

const Environments = ({ envs, handleChangeInputEnvironment }: Props) => (
  <div>
    {Object.keys(envs).map((env, index) => (
      <div
        className="row ml-0"
        key={env}
        style={{ width: '100%', marginTop: 16 }}
      >
        <div className="col-md-5">
          <InputControl
            value={env}
            id={`envKey${env}${index}`}
            type="text"
            pattern="[-._a-zA-Z][-._a-zA-Z0-9]*|^$"
            disabled
            baseClassName={`${formClassName} ${inputStyles.inputCustom}`}
            baseClassNameLabel={`${globalStyles.formGroupLabel} ${env &&
              globalStyles.formGroupLabelOnFocus}`}
            labelText="Key"
            baseClassNameHelper={globalStyles.formGroupHelper}
            title={`The Environment instruction sets the environment variable ${`<key>`} to the value ${`<value>`}`}
            textHelper={
              index === 0 &&
              `The Environment instruction sets the environment variable ${`<key>`} to the value ${`<value>`}`
            }
          />
        </div>
        <div className="col-md-5">
          <InputControl
            value={envs[env]}
            id={`envValue${env}${index}`}
            type={
              env.includes('RAM') || env.includes('CPU') ? 'number' : 'text'
            }
            pattern="[-._a-zA-Z][-._a-zA-Z0-9]*|^$"
            baseClassName={`${formClassName} ${inputStyles.inputCustom}`}
            baseClassNameLabel={`${globalStyles.formGroupLabel} ${envs[env] &&
              globalStyles.formGroupLabelOnFocus}`}
            labelText="Value"
            baseClassNameHelper={globalStyles.formGroupHelper}
            title="Value can only contain letters, numbers and characters"
            handleChangeInput={e =>
              handleChangeInputEnvironment(e.target.value, env)
            }
          />
        </div>
      </div>
    ))}
  </div>
);

export default Environments;
