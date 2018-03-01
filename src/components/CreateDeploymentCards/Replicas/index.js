/* @flow */

import React from 'react';

import InputControl from '../../InputControl/index';

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
  <div className="blockContainer blockContainerPadin" id="replicas">
    <div className="col-md-7">
      {idDep ? (
        <div className="containerTitle">
          {idDep} <span className="containerTitleText">deployment</span>
        </div>
      ) : (
        <div className="containerTitle">
          <span>*</span> Replicas
          {/* <Tooltip */}
          {/* placement='top' */}
          {/* trigger={['hover']} */}
          {/* overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>} */}
          {/* > */}
          {/* <span className="myTooltip" data-toggle="tooltip">?</span> */}
          {/* </Tooltip> */}
        </div>
      )}
      <div className="containerSubTitle">Enter Replicas count</div>
      <InputControl
        value={inputReplicas}
        id="deploymentReplicas"
        type="number"
        required
        min="1"
        max="15"
        baseClassName="form-group__input-text form-control customInput"
        baseClassNameLabel={`form-group__label ${inputReplicas &&
          'form-group__label-always-onfocus'}`}
        labelText="Count"
        handleChangeInput={e => {
          const countReplicas = parseInt(e.target.value, 10);
          handleChangeInputReplicasName(
            Number.isInteger(countReplicas) ? countReplicas : ''
          );
        }}
        textHelper="Max: 15 replicas"
        baseClassNameHelper="form-group__helper"
      />
    </div>
  </div>
);

export default CreateDeploymentReplicas;
