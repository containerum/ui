/* @flow */

import React from 'react';
import className from 'classnames/bind';

import InputControl from '../../../InputControl';
import icon from '../../../../images/icon-create-dep.svg';

import globalStyles from '../../../../theme/global.scss';
import buttonsStyles from '../../../../theme/buttons.scss';

const globalClass = className.bind(globalStyles);

const titleClassName = globalClass('containerTitle', 'containerTitleBlock');

const columnClassName = globalClass('columnCustomVolumes', 'marginLeft_10');

type Props = {
  volumeMounts: Array<Object>,
  index: number,
  isContainersMore: boolean,
  volumes: Array<Object>,
  handleChangeVolumeSelect: (
    value: string,
    id: string,
    index: number,
    indexVolume: number
  ) => void,
  handleChangeInputVolumePath: (
    value: string,
    id: string,
    index: number,
    indexVolume: number,
    type: string
  ) => void,
  handleClickRemoveVolume: (id: string, index: number) => void,
  handleClickAddVolume: (index: number) => void
};

const Volumes = ({
  volumeMounts,
  index,
  volumes,
  isContainersMore,
  handleChangeVolumeSelect,
  handleChangeInputVolumePath,
  handleClickRemoveVolume,
  handleClickAddVolume
}: Props) => (
  <div
    className={`${globalStyles.rowLine} row`}
    id={`container${index + 1}-volume`}
    style={volumes.length && isContainersMore ? {} : { borderBottom: 'none' }}
  >
    <div className="col-md-12">
      <div className={titleClassName}>
        Volume
        {/* <Tooltip */}
        {/* placement='top' */}
        {/* trigger={['hover']} */}
        {/* overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>} */}
        {/* > */}
        {/* <span className="myTooltip" data-toggle="tooltip">?</span> */}
        {/* </Tooltip> */}
      </div>
    </div>

    {volumes.length && volumeMounts.length
      ? volumeMounts.map((item, indexVolume) => {
          // console.log(item);
          const { id, name, subPath, mountPath } = item;
          return (
            <div className="row ml-0" style={{ width: '100%' }} key={id}>
              <div className={`${globalStyles.columnCustomVolumes} col-md-4`}>
                <div className={globalStyles.formGroup}>
                  <div className={globalStyles.selectWrapper}>
                    <div className={globalStyles.selectArrow} />
                    <div className={globalStyles.selectArrow} />
                    <select
                      name="volumes"
                      className={globalStyles.selectCustom}
                      value={name}
                      onChange={e =>
                        handleChangeVolumeSelect(
                          e.target.value,
                          id,
                          index,
                          indexVolume
                        )
                      }
                      required
                    >
                      {volumes.map(volumeMount => (
                        <option
                          key={volumeMount.label}
                          value={volumeMount.label}
                        >
                          {volumeMount.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {indexVolume === 0 && (
                    <div className={globalStyles.formGroupHelper}>
                      Choose your exiscting Volume <br />
                      Path - The Folder into your Container or Pod
                    </div>
                  )}
                </div>
              </div>
              <div className={`${globalStyles.columnCustomVolumes} col-md-4`}>
                <InputControl
                  value={subPath}
                  id={`subPath${id}`}
                  type="text"
                  baseClassName="form-group__input-text form-control customInput"
                  baseClassNameLabel={`form-group__label ${subPath &&
                    'form-group__label-always-onfocus'}`}
                  labelText="SubPath"
                  baseClassNameHelper="form-group__helper"
                  subPath="true"
                  handleChangeInput={e =>
                    handleChangeInputVolumePath(
                      e.target.value,
                      id,
                      index,
                      indexVolume,
                      'subPath'
                    )
                  }
                />
              </div>
              <div className={`${columnClassName} col-md-4`}>
                <InputControl
                  value={mountPath}
                  id={`path${id}`}
                  type="text"
                  pattern="[A-z0-9/]([-A-z0-9/]*[A-z0-9])?"
                  required
                  title="Example: data/mountPath"
                  baseClassName="form-group__input-text form-control customInput"
                  baseClassNameLabel={`form-group__label ${mountPath &&
                    'form-group__label-always-onfocus'}`}
                  labelText="Path"
                  baseClassNameHelper="form-group__helper"
                  handleChangeInput={e =>
                    handleChangeInputVolumePath(
                      e.target.value,
                      id,
                      index,
                      indexVolume,
                      'mountPath'
                    )
                  }
                />
              </div>
              <div
                className="col-md-1"
                onClick={() => handleClickRemoveVolume(id, index)}
                onKeyPress={() => handleClickRemoveVolume(id, index)}
                role="presentation"
              >
                <img
                  src={icon}
                  alt="delete"
                  className={globalStyles.iconBasket}
                />
              </div>
            </div>
          );
        })
      : ''}
    {volumes.length ? (
      <div className="col-md-12">
        <div
          className={`${buttonsStyles.buttonUIAddBlock} ml-0`}
          onClick={() => handleClickAddVolume(index)}
          onKeyPress={() => handleClickAddVolume(index)}
          role="presentation"
        >
          + Add Volume
        </div>
      </div>
    ) : (
      <div style={{ marginLeft: '15px' }}>You don`t have volumes</div>
    )}
  </div>
);

export default Volumes;
