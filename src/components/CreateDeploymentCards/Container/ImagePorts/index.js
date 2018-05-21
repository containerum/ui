/* @flow */

import React from 'react';
import className from 'classnames/bind';

import InputControl from '../../../InputControl/index';
import icon from '../../../../images/icon-create-dep.svg';
import buttonsStyles from '../../../../theme/buttons.scss';


import globalStyles from '../../../../theme/global.scss';
import inputStyles from '../../../../components/InputControl/index.scss';

const globalClass = className.bind(globalStyles);

const formClassName = globalClass('formInputText', 'formControl');

type Props = {
  ports: Object,
  index: number,
  handleChangeInputImagePorts: (
    value: string,
    id: string,
    index: number,
    indexPort: number
  ) => void,
  handleClickRemoveImagePort: (id: string, index: number) => void,
  handleClickAddImagePort: (index: number) => void
};

const ImagePorts = ({
  ports,
  index,
  handleChangeInputImagePorts,
  handleClickRemoveImagePort,
  handleClickAddImagePort
}: Props) => (
  <div className="row rowLine" id={`container${index + 1}-image-ports`}>
    <div className="col-md-12">
      <div className="containerTitle containerBlockTitle">
        Image Ports
        {/* <Tooltip */}
        {/* placement='top' */}
        {/* trigger={['hover']} */}
        {/* overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>} */}
        {/* > */}
        {/* <span className="myTooltip" data-toggle="tooltip">?</span> */}
        {/* </Tooltip> */}
      </div>
    </div>
    {ports.map((port, indexPort) => {
      const { id, containerPort } = port;
      return (
        <div className="row marLeft" style={{ width: '100%' }} key={id}>
          <div className="col-md-5 myColumn">
            <InputControl
              value={containerPort}
              id={`port${id}`}
              type="number"
              min="0"
              max="65535"
              baseClassName={`${formClassName} ${inputStyles.inputCustom}`}
              baseClassNameLabel={`${
                globalStyles.formGroupLabel
              } ${containerPort && globalStyles.formGroupLabelOnFocus}`}
              labelText="Port"
              baseClassNameHelper={globalStyles.formGroupHelper}
              handleChangeInput={e => {
                const countPorts = parseInt(e.target.value, 10);
                handleChangeInputImagePorts(
                  Number.isInteger(countPorts) ? countPorts : '',
                  id,
                  index,
                  indexPort
                );
              }}
            />
          </div>
          <div className="col-md-5 myColumn" />
          <div
            className="col-md-1"
            onClick={() => handleClickRemoveImagePort(id, index)}
            onKeyPress={() => handleClickRemoveImagePort(id, index)}
            role="presentation"
          >
            <img src={icon} alt="delete" className="iconBasket" />
          </div>
        </div>
      );
    })}
    {/* <div className="col-md-5 myColumn"> */}
    {/* <div className="has-float-label"> */}
    {/* <input className="form-control customInput" id="text9" type="text" placeholder=" " /> */}
    {/* <label className="customLabel" htmlFor="text9">Target Port</label> */}
    {/* <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div> */}
    {/* </div> */}
    {/* </div> */}

    <div className="col-md-12">
      <div
        className={`${buttonsStyles.buttonUIAddBlock} ml-0`}
        onClick={() => handleClickAddImagePort(index)}
        onKeyPress={() => handleClickAddImagePort(index)}
        role="presentation"
      >
        + Add Image Port
      </div>
    </div>
  </div>
);

export default ImagePorts;
