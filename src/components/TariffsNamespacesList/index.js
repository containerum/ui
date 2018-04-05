/* @flow */

import React from 'react';
// import { Link } from 'react-router-dom';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import { CHANGE_PROFILE_INFO_SUCCESS } from '../../constants/profileConstants/changeProfileInfo';

type Props = {
  data: Array<Object>,
  tariffName: string,
  active: string,
  handleSelectTariff: ({
    id: string,
    label: string,
    cpuLimit: number,
    memoryLimit: number,
    volumeSize: number,
    price: number,
    pricePerDay: string
  }) => void,
  changeProfile: string,
  isFullDataOfProfile: boolean,
  handleClickSelectTariff: () => void
};

const TariffsNamespacesList = ({
  data,
  tariffName,
  active,
  handleSelectTariff,
  changeProfile,
  isFullDataOfProfile,
  handleClickSelectTariff
}: Props) => (
  <div className="row">
    {data.map(tariff => {
      const { label, price, id } = tariff;
      const isActiveTariff = label === active;
      let {
        cpu_limit: cpuLimit,
        memory_limit: memoryLimit,
        volume_size: volumeSize
      } = tariff;
      cpuLimit /= 1000;
      memoryLimit /= 1024;
      volumeSize = volumeSize ? Math.ceil(volumeSize) : volumeSize;
      const pricePerDay = `$${(price / 30).toFixed(2)} daily`;
      return (
        <div className="col-md-3" key={`$${price}`}>
          <Tooltip
            placement="top"
            trigger={['hover']}
            overlay={<span>Current Namespace size</span>}
            overlayClassName={isActiveTariff ? '' : 'display-none'}
          >
            <div
              id={label}
              className={
                isActiveTariff
                  ? 'namespace-plan-block-container hover-action-new disabled'
                  : label !== tariffName
                    ? 'namespace-plan-block-container hover-action-new'
                    : 'namespace-plan-block-container hover-action-new selected'
              }
              onClick={() => {
                if (
                  changeProfile === CHANGE_PROFILE_INFO_SUCCESS ||
                  isFullDataOfProfile
                ) {
                  if (!isActiveTariff) {
                    handleSelectTariff({
                      id,
                      label,
                      cpuLimit,
                      memoryLimit,
                      volumeSize,
                      price,
                      pricePerDay
                    });
                  } else {
                    console.log('Active');
                  }
                } else {
                  handleClickSelectTariff();
                }
              }}
              onKeyPress={() => {
                if (
                  changeProfile === CHANGE_PROFILE_INFO_SUCCESS ||
                  isFullDataOfProfile
                ) {
                  if (!isActiveTariff) {
                    handleSelectTariff({
                      id,
                      label,
                      cpuLimit,
                      memoryLimit,
                      volumeSize,
                      price,
                      pricePerDay
                    });
                  } else {
                    console.log('Active');
                  }
                } else {
                  handleClickSelectTariff();
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="row">
                <div
                  className={
                    `$${price}` === '$1'
                      ? 'col-md-6 namespace-plan-block-container-left namespace-plan-block2dollars'
                      : 'col-md-6 namespace-plan-block-container-left'
                  }
                >
                  {isActiveTariff ? (
                    <div className="namespace-plan-block-price">Active</div>
                  ) : (
                    <div className="namespace-plan-block-price">
                      {`$${price}`}
                      <span className="namespace-plan-span-price">/mo</span>
                    </div>
                  )}
                  {!isActiveTariff && (
                    <div className="namespace-plan-block-month">
                      {pricePerDay}
                    </div>
                  )}
                </div>
                <div className="col-md-6 namespace-plan-block-container-right">
                  <div
                    className={
                      `$${price}` === '$1'
                        ? 'content-block-content card-block card-block2dollars'
                        : 'content-block-content card-block'
                    }
                  >
                    <div className="content-block__info-item">
                      <div className="content-block__info-name inline">
                        RAM :{' '}
                      </div>
                      <div className="content-block__info-text inline">
                        {memoryLimit} GB
                      </div>
                    </div>
                    <div className="content-block__info-item">
                      <div className="content-block__info-name inline">
                        CPU :{' '}
                      </div>
                      <div className="content-block__info-text inline">
                        {cpuLimit}
                      </div>
                    </div>
                    {`$${price}` !== '$1' ? (
                      <div className="content-block__info-item">
                        <div className="content-block__info-name inline">
                          Volume :{' '}
                        </div>
                        <div className="content-block__info-text inline">
                          {volumeSize} GB
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Tooltip>
        </div>
      );
    })}
  </div>
);

export default TariffsNamespacesList;
