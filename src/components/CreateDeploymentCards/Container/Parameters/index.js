/* @flow */

import React from 'react';

import InputControl from '../../../InputControl/index';

type Props = {
  item: Object,
  index: number,
  handleChangeInputParameters: (
    value: string,
    id: string,
    index: number,
    type: string
  ) => void
};

// const patternOne = new RegExp('^d+(.d+)?m$');
// const patternTwo = new RegExp('/^0.d/');
// const pattern = '/^(0.d|^d+(.d+)?m$)$';
const Parameters = ({ item, index, handleChangeInputParameters }: Props) => {
  const { id, limits } = item;
  return (
    <div className="row rowLine" id={`container${index + 1}-parameters`}>
      <div className="col-md-12">
        <div className="containerTitle containerBlockTitle">
          <span>*</span> Parameters
          {/* <Tooltip */}
          {/* placement='top' */}
          {/* trigger={['hover']} */}
          {/* overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>} */}
          {/* > */}
          {/* <span className="myTooltip" data-toggle="tooltip">?</span> */}
          {/* </Tooltip> */}
        </div>
      </div>
      <div className="col-md-5 myColumn">
        <InputControl
          value={limits.cpu}
          id={`cpu${id}`}
          type="number"
          pattern="(3000|[12][0-9]{3}|[1-9][0-9]{1,2})"
          required
          min="10"
          max="3000"
          baseClassName="form-group__input-text form-control customInput"
          baseClassNameLabel={`form-group__label ${
            limits.cpu || limits.cpu === 0
              ? 'form-group__label-always-onfocus'
              : ''
          }`}
          labelText="CPU"
          title="Range: 10 - 3000"
          textHelper="Range: 10 - 3000"
          baseClassNameHelper="form-group__helper"
          handleChangeInput={e => {
            const cpuValue = parseInt(e.target.value, 10);
            handleChangeInputParameters(
              Number.isInteger(cpuValue) ? cpuValue : '',
              id,
              index,
              'cpu'
            );
          }}
        />
      </div>

      <div className="col-md-5 myColumn">
        <InputControl
          value={limits.memory}
          id={`ram${id}`}
          type="number"
          pattern="(8000|[1-7][0-9]{3}|[1-9][0-9]{1,2})"
          required
          min="10"
          max="8000"
          baseClassName="form-group__input-text form-control customInput"
          baseClassNameLabel={`form-group__label ${
            limits.memory || limits.memory === 0
              ? 'form-group__label-always-onfocus'
              : ''
          }`}
          labelText="RAM"
          title="Range: 10 - 8000"
          textHelper="Range: 10 - 8000"
          baseClassNameHelper="form-group__helper"
          handleChangeInput={e => {
            const cpuValue = parseInt(e.target.value, 10);
            handleChangeInputParameters(
              Number.isInteger(cpuValue) ? cpuValue : '',
              id,
              index,
              'memory'
            );
          }}
        />
      </div>
    </div>
  );
};

export default Parameters;
