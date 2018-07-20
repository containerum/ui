/* @flow */

import React from 'react';
import className from 'classnames/bind';

import InputControl from '../../../InputControl';
import icon from '../../../../images/icon-create-dep.svg';

import globalStyles from '../../../../theme/global.scss';
import buttonsStyles from '../../../../theme/buttons.scss';
import inputStyles from '../../../../components/InputControl/index.scss';

const globalClass = className.bind(globalStyles);

const titleClassName = globalClass('containerTitle', 'containerTitleBlock');

const formClassName = globalClass('formInputText', 'formControl');

const columnClassName = globalClass('columnCustomVolumes', 'marginLeft_10');

type Props = {
  configMaps: Array<Object>,
  configMapsMounts: Array<Object>,
  index: number,
  isContainersMore: boolean,
  handleChangeSelect: (
    value: string,
    id: string,
    index: number,
    indexConfigMap: number,
    type: string
  ) => void,
  handleChangeInputPath: (
    value: string,
    id: string,
    index: number,
    indexConfigMap: number,
    type: string,
    typeList: string
  ) => void,
  handleClickRemove: (
    id: string,
    index: number,
    type: string,
    typeList: string
  ) => void,
  handleClickAdd: (index: number, type: string, typeList: string) => void
};

const ConfigMap = ({
  configMaps,
  configMapsMounts,
  index,
  isContainersMore,
  handleChangeSelect,
  handleChangeInputPath,
  handleClickRemove,
  handleClickAdd
}: Props) => (
  <div
    className={`${globalStyles.rowLine} row`}
    id={`container${index + 1}-configMap`}
    style={
      configMaps.length && isContainersMore ? {} : { borderBottom: 'none' }
    }
  >
    <div className="col-md-12">
      <div className={titleClassName}>
        ConfigMap
        {/* <Tooltip */}
        {/* placement='top' */}
        {/* trigger={['hover']} */}
        {/* overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>} */}
        {/* > */}
        {/* <span className="myTooltip" data-toggle="tooltip">?</span> */}
        {/* </Tooltip> */}
      </div>
    </div>

    {configMaps.length && configMapsMounts
      ? configMapsMounts.map((item, indexConfigMap) => {
          const { id, name, mount_path: mountPath } = item;
          return (
            <div className="row ml-0" style={{ width: '100%' }} key={id}>
              <div className={`${globalStyles.columnCustomVolumes} col-md-4`}>
                <div className={globalStyles.formGroup}>
                  <div className={globalStyles.selectWrapper}>
                    <div className={globalStyles.selectArrow} />
                    <div className={globalStyles.selectArrow} />
                    <select
                      name="configMaps"
                      className={globalStyles.selectCustom}
                      value={name}
                      onChange={e =>
                        handleChangeSelect(
                          e.target.value,
                          id,
                          index,
                          indexConfigMap,
                          'config_maps'
                        )
                      }
                      required
                    >
                      {configMaps.map(configMap => (
                        <option key={configMap.name} value={configMap.name}>
                          {configMap.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {indexConfigMap === 0 && (
                    <div className={globalStyles.formGroupHelper}>
                      Choose your existing ConfigMap <br />
                      Path - The Folder into your Container or Pod
                    </div>
                  )}
                </div>
              </div>
              <div className={`${columnClassName} col-md-4`}>
                <InputControl
                  value={mountPath}
                  id={`path${id}`}
                  type="text"
                  pattern="[A-z0-9/]([-A-z0-9/]*[A-z0-9])?"
                  required
                  title="Example: data/mountPath"
                  baseClassName={`${formClassName} ${inputStyles.inputCustom}`}
                  baseClassNameLabel={`${
                    globalStyles.formGroupLabel
                  } ${mountPath && globalStyles.formGroupLabelOnFocus}`}
                  labelText="Path"
                  baseClassNameHelper={globalStyles.formGroupHelper}
                  handleChangeInput={e =>
                    handleChangeInputPath(
                      e.target.value,
                      id,
                      index,
                      indexConfigMap,
                      'mount_path',
                      'config_maps'
                    )
                  }
                />
              </div>
              <div
                className="col-md-1"
                onClick={() =>
                  handleClickRemove(id, index, 'config_maps', 'configMaps')
                }
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
    {configMaps.length ? (
      <div className="col-md-12">
        <div
          className={`${buttonsStyles.buttonUIAddBlock} ml-0`}
          onClick={() => handleClickAdd(index, 'config_maps', 'configMaps')}
          role="presentation"
        >
          + Attach ConfigMap
        </div>
      </div>
    ) : (
      <div style={{ marginLeft: '15px' }}>You don`t have configMaps</div>
    )}
  </div>
);

export default ConfigMap;
