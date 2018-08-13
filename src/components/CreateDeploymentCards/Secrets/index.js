/* @flow */

import React from 'react';
import className from 'classnames/bind';

import icon from '../../../images/icon-create-dep.svg';
import globalStyles from '../../../theme/global.scss';
import buttonsStyles from '../../../theme/buttons.scss';

const globalClass = className.bind(globalStyles);
const containerClassName = globalClass(
  'blockContainer',
  'blockContainerOtherPadding'
);

type Props = {
  secrets: Array,
  linkedSecrets: Array,
  handleChangeSelectSecret: (value: string) => void,
  handleClickRemoveSecrets: (name: string) => void,
  handleClickAddSecrets: () => void
};

const CreateDeploymentSecrets = ({
  secrets,
  linkedSecrets,
  handleChangeSelectSecret,
  handleClickRemoveSecrets,
  handleClickAddSecrets
}: Props) => (
  <div className={containerClassName} id="secrets">
    <div className="col-md-12">
      <div className={globalStyles.containerTitle}>Secrets</div>
    </div>
    {secrets.length ? (
      <div>
        {linkedSecrets.map((linkedSecret, indexSecret) => {
          const { id, name } = linkedSecret;
          return (
            <div className="row ml-0" key={id} style={{ width: '100%' }}>
              <div className={`${globalStyles.columnCustomSecrets} col-md-6`}>
                <div className={globalStyles.formGroup}>
                  <div className={globalStyles.selectWrapper}>
                    <div className={globalStyles.selectArrow} />
                    <div className={globalStyles.selectArrow} />
                    <select
                      name="secrets"
                      className={globalStyles.selectCustom}
                      value={name}
                      onChange={e => handleChangeSelectSecret(e.target.value)}
                      required
                    >
                      {secrets.map(secret => (
                        <option key={secret.name} value={secret.name}>
                          {secret.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {indexSecret === 0 && (
                    <div className={globalStyles.formGroupHelper}>
                      Choose your existing Secret
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-5" />
              <div
                className="col-md-1"
                onClick={() => handleClickRemoveSecrets(name)}
              >
                <img
                  src={icon}
                  alt="delete"
                  className={globalStyles.iconBasket}
                />
              </div>
            </div>
          );
        })}
        {secrets.length ? (
          <div className="col-md-12">
            <div
              className={`${buttonsStyles.buttonUIAddBlock} ml-0`}
              onClick={() => handleClickAddSecrets()}
            >
              + Add Secrets
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    ) : (
      <div className="col-md-12" style={{ marginTop: 20 }}>
        You don`t have Secrets
      </div>
    )}
  </div>
);

export default CreateDeploymentSecrets;
