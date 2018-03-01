/* @flow */

import React from 'react';
import _ from 'lodash/fp';

import rectangle from '../../../images/rectangle.png';

type Props = {
  data: Object
};

const PodsList = ({ data }: Props) => {
  const { containers } = data;
  return (
    <div className="row double">
      {containers.map(container => {
        const { name, ram, cpu, image } = container;
        return (
          <div className="col-md-6" key={_.uniqueId()}>
            <div className="content-block-container card-container hover-action mt-0">
              <div className="content-block-header">
                <div className="content-block-header-label">
                  <div className="content-block-header-img">
                    <img src={rectangle} alt="container" />
                  </div>
                  <div className="content-block-header-label__text content-block-header-label_main">
                    {name}
                  </div>
                </div>
              </div>
              <div className="content-block-content card-block collapsed">
                <div className="content-block__info-item ">
                  <div className="content-block__info-name inline">
                    RAM ( Usage ) :{' '}
                  </div>
                  <div className="content-block__info-text inline">
                    {ram} MB
                  </div>
                </div>
                <div className="content-block__info-item">
                  <div className="content-block__info-name inline">
                    CPU ( Usage ) :{' '}
                  </div>
                  <div className="content-block__info-text inline">{cpu} m</div>
                </div>
                <div className="content-block__info-item">
                  <div className="content-block__info-name inline">
                    Image:&nbsp;
                  </div>
                  <div className="content-block__info-text inline">{image}</div>
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
