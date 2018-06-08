/* @flow */

import React from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import { CHANGE_PROFILE_INFO_SUCCESS } from '../../constants/profileConstants/changeProfileInfo';
// import { Link } from 'react-router-dom';

type Props = {
  data: Array<Object>,
  tariffName: string,
  active: string,
  handleSelectTariff: ({
    storageLimit: string,
    label: string,
    price: number,
    pricePerDay: string,
    id: string
  }) => void,
  changeProfile: string,
  isFullDataOfProfile: boolean,
  handleClickSelectTariff: () => void
};

const TariffsVolumesList = ({
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
      const { storage_limit: storageLimit, price, label, id } = tariff;
      const pricePerDay = `$${(price / 30).toFixed(2)} daily`;
      const isActiveTariff = label === active;
      return (
        <div className="col-md-3" key={label}>
          <Tooltip
            placement="top"
            trigger={['hover']}
            overlay={<span>Current Volume size</span>}
            overlayClassName={isActiveTariff ? '' : 'display-none'}
          >
            <div
              id={label}
              className={
                isActiveTariff
                  ? 'namespace-plan-block-container hover-action-new disabled'
                  : label === tariffName
                    ? 'namespace-plan-block-container hover-action-new selected'
                    : 'namespace-plan-block-container hover-action-new'
              }
              onClick={() => {
                if (
                  changeProfile === CHANGE_PROFILE_INFO_SUCCESS ||
                  isFullDataOfProfile
                ) {
                  if (!isActiveTariff) {
                    handleSelectTariff({
                      label,
                      storageLimit,
                      price,
                      pricePerDay,
                      id
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
                      label,
                      storageLimit,
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
                <div className="col-md-6 namespace-plan-block-container-left">
                  {isActiveTariff ? (
                    <div className="namespace-plan-block-price">Active</div>
                  ) : (
                    <div className="namespace-plan-block-price">
                      {price}
                      <span className="namespace-plan-span-price">/mo</span>
                    </div>
                  )}
                  {!isActiveTariff && (
                    <div className="namespace-plan-block-month">
                      {pricePerDay}
                    </div>
                  )}
                </div>
                <div className="col-md-6  volume-plan-container-right">
                  <div className="hard-drive-size">{storageLimit} GB</div>
                </div>
              </div>
            </div>
          </Tooltip>
        </div>
      );
    })}
  </div>
);

export default TariffsVolumesList;
