/* @flow */

import React from 'react';

import InputControl from '../../InputControl/index';
import icon from '../../../images/icon-create-dep.svg';

type Props = {
  labels: Array<Object>,
  handleClickRemoveLabel: (id: string, index: number) => void,
  handleClickAddLabel: () => void,
  handleChangeInputLabel: (value: string, id: string, type: string) => void
};

const CreateDeploymentLabel = ({
  labels,
  handleClickRemoveLabel,
  handleClickAddLabel,
  handleChangeInputLabel
}: Props) => (
  <div className="blockContainer blockContainerPadin" id="labels">
    <div className="col-md-12">
      <div className="containerTitle">
        Label
        {/* <Tooltip */}
        {/* placement='top' */}
        {/* trigger={['hover']} */}
        {/* overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>} */}
        {/* > */}
        {/* <span className="myTooltip" data-toggle="tooltip">?</span> */}
        {/* </Tooltip> */}
      </div>
      <div className="containerSubTitle">Enter Labels</div>
    </div>
    {labels.map((item, index) => {
      const { id } = item;
      const valueKey = labels[index].key;
      const valueLabel = labels[index].label;
      return (
        <div className="row marLeft" key={id}>
          <div className="col-md-5 myColumn">
            <InputControl
              value={valueKey}
              id={`deploymentLabelKey${id}`}
              type="text"
              pattern="^[a-z0-9]([-a-z0-9]*[a-z0-9])?$|^$"
              baseClassName="form-group__input-text form-control customInput"
              baseClassNameLabel={`form-group__label ${valueKey &&
                'form-group__label-always-onfocus'}`}
              labelText="Key"
              title="Key can only contain letters, numbers and characters"
              handleChangeInput={e =>
                handleChangeInputLabel(e.target.value, id, 'key')
              }
            />
          </div>
          <div className="col-md-5 myColumn">
            <InputControl
              value={valueLabel}
              id={`deploymentLabelName${id}`}
              type="text"
              pattern="^[a-z0-9]([-a-z0-9]*[a-z0-9])?$|^$"
              baseClassName="form-group__input-text form-control customInput"
              baseClassNameLabel={`form-group__label ${valueLabel &&
                'form-group__label-always-onfocus'}`}
              labelText="Label"
              title="Label can only contain letters, numbers and characters"
              handleChangeInput={e =>
                handleChangeInputLabel(e.target.value, id, 'label')
              }
            />
          </div>
          <div
            className="col-md-1"
            onClick={() => handleClickRemoveLabel(id)}
            onKeyPress={() => handleClickRemoveLabel(id)}
            role="presentation"
          >
            <img
              src={icon}
              alt="delete"
              className="iconBasket"
              style={{ marginTop: '40px' }}
            />
          </div>
        </div>
      );
    })}

    <div
      className="addBlockBtn"
      onClick={() => handleClickAddLabel()}
      onKeyPress={() => handleClickAddLabel()}
      role="presentation"
    >
      + Add label
    </div>
  </div>
);

export default CreateDeploymentLabel;