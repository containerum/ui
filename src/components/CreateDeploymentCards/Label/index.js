/* @flow */

import React from 'react';
import className from 'classnames/bind';

import InputControl from '../../InputControl';
import icon from '../../../images/icon-create-dep.svg';

import globalStyles from '../../../theme/global.scss';
import buttonsstyles from '../../../theme/buttons.scss';
import inputStyles from '../../../components/InputControl/index.scss';

const globalClass = className.bind(globalStyles);

const containerClassName = globalClass(
  'blockContainer',
  'blockContainerOtherPadding'
);
const formClassName = globalClass('formInputText', 'formControl');

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
  <div className={containerClassName} id="labels">
    <div className="col-md-12">
      <div className={globalStyles.containerTitle}>
        Label
        {/* <Tooltip */}
        {/* placement='top' */}
        {/* trigger={['hover']} */}
        {/* overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>} */}
        {/* > */}
        {/* <span className="myTooltip" data-toggle="tooltip">?</span> */}
        {/* </Tooltip> */}
      </div>
      <div className={globalStyles.containerSubTitleCreate}>Enter Labels</div>
    </div>
    {labels.map((item, index) => {
      const { id } = item;
      const valueKey = labels[index].key;
      const valueLabel = labels[index].label;
      return (
        <div className="row ml-0" key={id}>
          <div className={`${globalStyles.columnCustom} col-md-5`}>
            <InputControl
              value={valueKey}
              id={`deploymentLabelKey${id}`}
              type="text"
              pattern="^[a-z0-9]([-a-z0-9]*[a-z0-9])?$|^$"
              baseClassName={`${formClassName} ${inputStyles.inputCustom}`}
              baseClassNameLabel={`${globalStyles.formGroupLabel} ${valueKey &&
                globalStyles.formGroupLabelOnFocus}`}
              labelText="Key"
              title="Key can only contain letters, numbers and characters"
              handleChangeInput={e =>
                handleChangeInputLabel(e.target.value, id, 'key')
              }
            />
          </div>
          <div className={`${globalStyles.columnCustom} col-md-5`}>
            <InputControl
              value={valueLabel}
              id={`deploymentLabelName${id}`}
              type="text"
              pattern="^[a-z0-9]([-a-z0-9]*[a-z0-9])?$|^$"
              baseClassName={`${formClassName} ${inputStyles.inputCustom}`}
              baseClassNameLabel={`${
                globalStyles.formGroupLabel
              } ${valueLabel && globalStyles.formGroupLabelOnFocus}`}
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
              className={globalStyles.iconBasket}
              style={{ marginTop: '40px' }}
            />
          </div>
        </div>
      );
    })}

    <div
      className={buttonsstyles.buttonUIAddBlock}
      onClick={() => handleClickAddLabel()}
      onKeyPress={() => handleClickAddLabel()}
      role="presentation"
    >
      + Add label
    </div>
  </div>
);

export default CreateDeploymentLabel;
