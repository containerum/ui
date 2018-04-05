/* @flow */

import React from 'react';

import icon from '../../../images/icon-create-dep.svg';
import Common from './Common';
import Parameters from './Parameters';
// import ImagePorts from './ImagePorts';
// import Commands from './Commands';
import Environments from './Environments';
import Volumes from './Volumes';

type Props = {
  item: Object,
  containersCount: number,
  index: number,
  volumes: Array<Object>,
  handleClickContainerRemove: () => void,
  handleClickContainerAdd: () => void,
  handleChangeInputCommon: () => void,
  handleChangeInputParameters: () => void,
  // handleChangeInputImagePorts: () => void,
  // handleClickRemoveImagePort: () => void,
  // handleClickAddImagePort: () => void,
  // handleChangeInputCommands: () => void,
  handleChangeInputEnvironment: () => void,
  handleClickRemoveEnvironment: () => void,
  handleClickAddEnvironment: () => void,
  handleChangeVolumeSelect: () => void,
  handleChangeInputVolumePath: () => void,
  handleClickRemoveVolume: () => void,
  handleClickAddVolume: () => void
};

const Container = ({
  item,
  index,
  containersCount,
  volumes,
  handleClickContainerRemove,
  handleClickContainerAdd,
  handleChangeInputCommon,
  handleChangeInputParameters,
  // handleChangeInputImagePorts,
  // handleClickRemoveImagePort,
  // handleClickAddImagePort,
  // handleChangeInputCommands,
  handleChangeInputEnvironment,
  handleClickRemoveEnvironment,
  handleClickAddEnvironment,
  handleChangeVolumeSelect,
  handleChangeInputVolumePath,
  handleClickRemoveVolume,
  handleClickAddVolume
}: Props) => {
  const fixedIndex = index + 1;
  const { id } = item;
  return (
    <div className="blockContainer blockAddContainerPadin">
      <div className="col-md-12">
        <div className="containerTitle marLeft20" id={`container${fixedIndex}`}>
          Container {fixedIndex}
        </div>
        {containersCount !== 1 && (
          <button
            type="button"
            className="close"
            style={{ marginTop: '-10px' }}
            onClick={() => {
              handleClickContainerRemove(id);
            }}
          >
            <span aria-hidden="true">
              <img
                src={icon}
                alt="delete"
                style={{ width: '12px', height: '15px' }}
              />
            </span>
          </button>
        )}

        <Common
          item={item}
          index={index}
          handleChangeInputCommon={handleChangeInputCommon}
        />
        <Parameters
          item={item}
          index={index}
          handleChangeInputParameters={handleChangeInputParameters}
        />
        {/* <ImagePorts */}
        {/* ports={item.ports} */}
        {/* id={item.id} */}
        {/* index={index} */}
        {/* handleChangeInputImagePorts={handleChangeInputImagePorts} */}
        {/* handleClickRemoveImagePort={handleClickRemoveImagePort} */}
        {/* handleClickAddImagePort={handleClickAddImagePort} */}
        {/* /> */}
        {/* <Commands */}
        {/* item={item} */}
        {/* index={index} */}
        {/* handleChangeInputCommands={handleChangeInputCommands} */}
        {/* /> */}
        <Environments
          env={item.env}
          id={item.id}
          index={index}
          handleChangeInputEnvironment={handleChangeInputEnvironment}
          handleClickRemoveEnvironment={handleClickRemoveEnvironment}
          handleClickAddEnvironment={handleClickAddEnvironment}
        />
        <Volumes
          volumeMounts={item.volumeMounts}
          volumes={volumes}
          id={item.id}
          index={index}
          isContainersMore={
            containersCount === fixedIndex && containersCount < 3
          }
          handleChangeVolumeSelect={handleChangeVolumeSelect}
          handleChangeInputVolumePath={handleChangeInputVolumePath}
          handleClickRemoveVolume={handleClickRemoveVolume}
          handleClickAddVolume={handleClickAddVolume}
        />

        {containersCount === fixedIndex &&
          containersCount < 3 && (
            <div
              className="addBlockBtn addBlockBtnBig text-md-center"
              onClick={() => handleClickContainerAdd()}
              onKeyPress={() => handleClickContainerAdd()}
              role="presentation"
            >
              + Add container
            </div>
          )}
      </div>
    </div>
  );
};

export default Container;
