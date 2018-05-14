/* @flow */

import React from 'react';
import _ from 'lodash/fp';
import classNames from 'classnames/bind';

import rectangle from '../../../images/rectangle.png';
import globalStyles from '../../../theme/global.scss';

type Props = {
  data: Object
};

const PodsList = ({ data }: Props) => {
  const { containers } = data;

  // const styleNamespaces = classNames.bind(styles);
  const globalClass = classNames.bind(globalStyles);
  const classNameContainer = globalClass(
    'contentBlockContainer',
    'containerCardPod',
    'hoverAction'
  );
  const contentClassName = globalClass(
    'contentBlockContentCardBlock',
    'contentBlockContent',
    'contentBlockContentCollapsed'
  );
  const textLabelClassName = globalClass(
    'contentBlockHeaderLabelText',
    'contentBlockHeaderLabelMain'
  );

  return (
    <div className="row double">
      {containers.map(container => {
        // console.log(container);
        const { name, image } = container;
        const { cpu, memory } = container.limits;
        return (
          <div className="col-md-6 px-0" key={_.uniqueId()}>
            <div className={`${classNameContainer} mt-0`}>
              <div className={globalStyles.contentBlockHeader}>
                <div className={globalStyles.contentBlockHeaderLabel}>
                  <div className={globalStyles.contentBlockHeaderImg}>
                    <img src={rectangle} alt="container" />
                  </div>
                  <div className={textLabelClassName}>{name}</div>
                </div>
              </div>
              <div className={contentClassName}>
                <div className={globalStyles.contentBlockInfoItem}>
                  <div
                    className={`${globalStyles.contentBlockInfoName} inline`}
                  >
                    RAM ( Usage ) :{' '}
                  </div>
                  <div
                    className={`${globalStyles.contentBlockInfoText} inline`}
                  >
                    {memory}
                  </div>
                </div>
                <div className={globalStyles.contentBlockInfoItem}>
                  <div
                    className={`${globalStyles.contentBlockInfoName} inline`}
                  >
                    CPU ( Usage ) :{' '}
                  </div>
                  <div
                    className={`${globalStyles.contentBlockInfoText} inline`}
                  >
                    {cpu}
                  </div>
                </div>
                <div className={globalStyles.contentBlockInfoItem}>
                  <div
                    className={`${globalStyles.contentBlockInfoName} inline`}
                  >
                    Image:&nbsp;
                  </div>
                  <div
                    className={`${globalStyles.contentBlockInfoText} inline`}
                  >
                    {image}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PodsList;
