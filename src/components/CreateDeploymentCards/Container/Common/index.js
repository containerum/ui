/* @flow */

import React from 'react';

import InputControl from '../../../InputControl/index';

type Props = {
  item: Object,
  index: number,
  handleChangeInputCommon: (
    value: string,
    id: string,
    index: number,
    type: string
  ) => void
};

const Common = ({ item, index, handleChangeInputCommon }: Props) => {
  const { id, name, image } = item;
  return (
    <div className="row rowLine">
      <div className="col-md-7">
        <div
          className="containerTitle containerBlockTitle"
          id={`container${index + 1}-info`}
        >
          <span>*</span> Common
          {/* <Tooltip */}
          {/* placement='top' */}
          {/* trigger={['hover']} */}
          {/* overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>} */}
          {/* > */}
          {/* <span className="myTooltip" data-toggle="tooltip">?</span> */}
          {/* </Tooltip> */}
        </div>
        <InputControl
          value={name}
          id={`containerName${id}`}
          type="text"
          required
          pattern="[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*"
          baseClassName="form-group__input-text form-control customInput"
          baseClassNameLabel={`form-group__label ${name &&
            'form-group__label-always-onfocus'}`}
          labelText="Container Name"
          title="Container name can only contain letters, numbers and characters"
          textHelper="Container name can only contain letters, numbers and characters"
          baseClassNameHelper="form-group__helper"
          handleChangeInput={e =>
            handleChangeInputCommon(e.target.value, id, index, 'name')
          }
        />
        <InputControl
          value={image}
          id={`dockerImage${id}`}
          type="text"
          required
          pattern="(?:.+/)?([^:]+)(?::.+)?*"
          baseClassName="form-group__input-text form-control customInput"
          baseClassNameLabel={`form-group__label ${image &&
            'form-group__label-always-onfocus'}`}
          labelText="Docker Image"
          title="Example: redis or redis:latest or redis:4.0.7-alpine"
          textHelper="Example: redis or redis:latest or redis:4.0.7-alpine"
          baseClassNameHelper="form-group__helper"
          handleChangeInput={e =>
            handleChangeInputCommon(e.target.value, id, index, 'image')
          }
        />
      </div>
    </div>
  );
};

export default Common;
