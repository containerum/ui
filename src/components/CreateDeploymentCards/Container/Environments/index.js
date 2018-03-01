/* @flow */

import React from 'react';

import InputControl from '../../../InputControl/index';
import icon from '../../../../images/icon-create-dep.svg';

type Props = {
  env: Object,
  index: number,
  handleChangeInputEnvironment: (
    value: string,
    id: string,
    index: number,
    indexEnvironment: number,
    type: string
  ) => void,
  handleClickRemoveEnvironment: (id: string, index: number) => void,
  handleClickAddEnvironment: (index: number) => void
};

const Environments = ({
  env,
  index,
  handleChangeInputEnvironment,
  handleClickRemoveEnvironment,
  handleClickAddEnvironment
}: Props) => (
  <div className="row rowLine" id={`container${index + 1}-environments`}>
    <div className="col-md-12">
      <div className="containerTitle containerBlockTitle">
        Environment
        {/* <Tooltip */}
        {/* placement='top' */}
        {/* trigger={['hover']} */}
        {/* overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>} */}
        {/* > */}
        {/* <span className="myTooltip" data-toggle="tooltip">?</span> */}
        {/* </Tooltip> */}
      </div>
    </div>
    {env.map((item, indexEnvironment) => {
      const { id, name, value } = item;
      return (
        <div className="row marLeft" key={id} style={{ width: '100%' }}>
          <div className="col-md-5 myColumn">
            <InputControl
              value={name}
              id={`envName${id}`}
              type="text"
              pattern="[-._a-zA-Z][-._a-zA-Z0-9]*|^$"
              baseClassName="form-group__input-text form-control customInput"
              baseClassNameLabel={`form-group__label ${name &&
                'form-group__label-always-onfocus'}`}
              labelText="Name"
              baseClassNameHelper="form-group__helper"
              title={`The Environment instruction sets the environment variable ${`<key>`} to the value ${`<value>`}`}
              textHelper={
                indexEnvironment === 0 &&
                `The Environment instruction sets the environment variable ${`<key>`} to the value ${`<value>`}`
              }
              handleChangeInput={e =>
                handleChangeInputEnvironment(
                  e.target.value,
                  id,
                  index,
                  indexEnvironment,
                  'name'
                )
              }
            />
          </div>
          <div className="col-md-5 myColumn">
            <InputControl
              value={value}
              id={`envValue${id}`}
              type="text"
              baseClassName="form-group__input-text form-control customInput"
              baseClassNameLabel={`form-group__label ${value &&
                'form-group__label-always-onfocus'}`}
              labelText="Value"
              title="Value can only contain letters, numbers and characters"
              handleChangeInput={e =>
                handleChangeInputEnvironment(
                  e.target.value,
                  id,
                  index,
                  indexEnvironment,
                  'value'
                )
              }
            />
          </div>
          <div
            className="col-md-1"
            onClick={() => handleClickRemoveEnvironment(id, index)}
            onKeyPress={() => handleClickRemoveEnvironment(id, index)}
            role="presentation"
          >
            <img src={icon} alt="delete" className="iconBasket" />
          </div>
        </div>
      );
    })}
    <div className="col-md-12">
      <div
        className="addBlockBtn marLeft"
        onClick={() => handleClickAddEnvironment(index)}
        onKeyPress={() => handleClickAddEnvironment(index)}
        role="presentation"
      >
        + Add Environment
      </div>
    </div>
  </div>
);

export default Environments;
