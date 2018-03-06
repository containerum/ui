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

const Parameters = ({ item, index, handleChangeInputParameters }: Props) => {
  const { id, resources } = item;
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
          value={resources.cpu}
          id={`cpu${id}`}
          type="text"
          pattern="^\d+(.\d+)?m$"
          required
          baseClassName="form-group__input-text form-control customInput"
          baseClassNameLabel={`form-group__label ${resources.cpu &&
            'form-group__label-always-onfocus'}`}
          labelText="CPU"
          title="Example: 0,3 or 300m"
          textHelper="Example: 0,3 or 300m"
          baseClassNameHelper="form-group__helper"
          handleChangeInput={e =>
            handleChangeInputParameters(e.target.value, id, index, 'cpu')
          }
        />
      </div>

      <div className="col-md-5 myColumn">
        <InputControl
          value={resources.memory}
          id={`ram${id}`}
          type="text"
          pattern="^\d+(.\d+)?(Mi|Gi)$"
          required
          baseClassName="form-group__input-text form-control customInput"
          baseClassNameLabel={`form-group__label ${resources.memory &&
            'form-group__label-always-onfocus'}`}
          labelText="RAM"
          title="Example 0,5Gi or 512Mi"
          textHelper="Example 0,5Gi or 512Mi"
          baseClassNameHelper="form-group__helper"
          handleChangeInput={e =>
            handleChangeInputParameters(e.target.value, id, index, 'memory')
          }
        />
      </div>
    </div>
  );
};

export default Parameters;
