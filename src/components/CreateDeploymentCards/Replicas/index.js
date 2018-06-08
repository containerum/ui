/* @flow */

import React from 'react';
import className from 'classnames/bind';

import InputControl from '../../InputControl';

import globalStyles from '../../../theme/global.scss';
import inputStyles from '../../../components/InputControl/index.scss';

const globalClass = className.bind(globalStyles);

const containerClassName = globalClass(
  'blockContainer',
  'blockContainerOtherPadding'
);

const formClassName = globalClass('formInputText', 'formControl');

type Props = {
  inputReplicas: string,
  idDep: string,
  handleChangeInputReplicasName: (value: number) => void
};

const CreateDeploymentReplicas = ({
  inputReplicas,
  idDep,
  handleChangeInputReplicasName
}: Props) => (
  <div className={containerClassName} id="replicas">
    <div className="col-md-7">
      {idDep ? (
        <div className={globalStyles.containerTitle}>
          {idDep}{' '}
          <span className={globalStyles.containerTitleText}>deployment</span>
        </div>
      ) : (
        <div className={globalStyles.containerTitle}>
          <span className={globalStyles.containerTitleStar}>*</span> Replicas
          {/* <Tooltip */}
          {/* placement='top' */}
          {/* trigger={['hover']} */}
          {/* overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>} */}
          {/* > */}
          {/* <span className="myTooltip" data-toggle="tooltip">?</span> */}
          {/* </Tooltip> */}
        </div>
      )}
      <div className={globalStyles.containerSubTitleCreate}>
        Enter Replicas count
      </div>
      <InputControl
        value={inputReplicas}
        id="deploymentReplicas"
        type="number"
        required
        min="1"
        max="15"
        baseClassName={`${formClassName} ${inputStyles.inputCustom}`}
        baseClassNameLabel={`${globalStyles.formGroupLabel} ${
          inputReplicas || inputReplicas === 0
            ? globalStyles.formGroupLabelOnFocus
            : ''
        }`}
        labelText="Count"
        handleChangeInput={e => {
          const countReplicas = parseInt(e.target.value, 10);
          handleChangeInputReplicasName(
            Number.isInteger(countReplicas) ? countReplicas : ''
          );
        }}
        textHelper="Max: 15 replicas"
        baseClassNameHelper={globalStyles.formGroupHelper}
      />
    </div>
  </div>
);

export default CreateDeploymentReplicas;
