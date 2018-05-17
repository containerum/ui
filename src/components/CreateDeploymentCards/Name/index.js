/* @flow */

import React from 'react';
import className from 'classnames/bind';

import InputControl from '../../InputControl/index';

import globalStyles from '../../../theme/global.scss';

const globalClass = className.bind(globalStyles);

const containerClassName = globalClass(
  'blockContainer',
  'blockContainerOtherPadding'
);

type Props = {
  inputName: string,
  handleChangeInputName: (value: string) => void
};

const CreateDeploymentName = ({ inputName, handleChangeInputName }: Props) => (
  <div className={containerClassName} id="name">
    <div className="col-md-7">
      <div className={globalStyles.containerTitle}>
        <span className={globalStyles.containerTitleStar}>*</span> Name
        {/* <Tooltip */}
        {/* placement='top' */}
        {/* trigger={['hover']} */}
        {/* overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>} */}
        {/* > */}
        {/* <span className="myTooltip" data-toggle="tooltip">?</span> */}
        {/* </Tooltip> */}
      </div>
      <div className={globalStyles.containerSubTitleCreate}>
        Enter Deployment name
      </div>
      <InputControl
        value={inputName}
        id="deploymentName"
        type="text"
        pattern="^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
        required
        baseClassName="form-group__input-text form-control customInput"
        baseClassNameLabel={`form-group__label ${inputName &&
          'form-group__label-always-onfocus'}`}
        labelText="Name"
        textHelper="Deployment name can only contain letters, numbers and characters"
        baseClassNameHelper="form-group__helper"
        handleChangeInput={e => handleChangeInputName(e.target.value)}
      />
    </div>
  </div>
);

export default CreateDeploymentName;
