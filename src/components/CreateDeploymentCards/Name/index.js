/* @flow */

import React from 'react';
import className from 'classnames/bind';

import InputControl from '../../InputControl/index';

import globalStyles from '../../../theme/global.scss';
import inputStyles from '../../../components/InputControl/index.scss';

const globalClass = className.bind(globalStyles);

const containerClassName = globalClass(
  'blockContainer',
  'blockContainerOtherPadding'
);
const formClassName = globalClass('formInputText', 'formControl');

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
        baseClassName={`${formClassName} ${inputStyles.inputCustom}`}
        baseClassNameLabel={`${globalStyles.formGroupLabel} ${inputName &&
          globalStyles.formGroupLabelOnFocus}`}
        labelText="Name"
        textHelper="Deployment name can only contain letters, numbers and characters"
        baseClassNameHelper={globalStyles.formGroupHelper}
        handleChangeInput={e => handleChangeInputName(e.target.value)}
      />
    </div>
  </div>
);

export default CreateDeploymentName;
