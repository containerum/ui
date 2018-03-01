/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';

import { routerLinks } from '../../config';
import volumePng from '../../images/deployment.png';

type Props = {
  data: Array<Object>,
  handleDeleteVolume: (idVol: string) => void
};

const VolumesList = ({ data, handleDeleteVolume }: Props) => {
  // console.log(data);
  const handleClickDeleteVolume = name => {
    handleDeleteVolume(name);
  };
  const handleClose = e => {
    e.stopPropagation();
  };
  return (
    <div className="row double">
      {data.map(volume => {
        const {
          name,
          used_size: usedSize,
          total_size: totalSize,
          status
        } = volume;
        const id = name;
        const currentStatus =
          status === 'Started' || status === 'Created'
            ? 'Active'
            : 'Not Active';
        return (
          <div className="col-md-4" id={id} key={id}>
            <div className="content-block-container card-container hover-action">
              <div className="content-block-header">
                <div className="content-block-header-label">
                  <div className="content-block-header-img">
                    <img src={volumePng} alt="ns-icon" />
                  </div>
                  <div className="content-block-header-label__text content-block-header-label_main">
                    {name}
                  </div>
                </div>
                <div
                  className="content-block-header-extra-panel"
                  onClick={e => handleClose(e)}
                  onKeyPress={e => handleClose(e)}
                  role="menuitem"
                  tabIndex={0}
                >
                  <div className="content-block-header-extra-panel dropdown no-arrow">
                    <i
                      className="content-block-header__more ion-more dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    />
                    <ul
                      className="dropdown-menu dropdown-menu-right"
                      role="menu"
                    >
                      <NavLink
                        activeClassName="active"
                        className="dropdown-item"
                        to={routerLinks.resizeVolumeLink(name)}
                      >
                        Resize
                      </NavLink>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => handleClickDeleteVolume(name)}
                        onKeyPress={() => handleClickDeleteVolume(name)}
                      >
                        Delete
                      </button>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="content-block-content card-block">
                <div className="content-block__info-item ">
                  <div className="content-block__info-name inline">
                    Usage / Total :{' '}
                  </div>
                  <div className="content-block__info-text inline">
                    {usedSize} / {totalSize} GB
                  </div>
                </div>
                <div className="content-block__info-item">
                  <div className="content-block__info-name inline">
                    Status:{' '}
                  </div>
                  <div className="content-block__info-text inline">
                    {currentStatus}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="col-md-4 align-middle">
        <NavLink
          activeClassName="active"
          to={routerLinks.createVolume}
          className="add-new-block content-block-content card-container hover-action "
        >
          <div className="action action-vol">
            <i>+</i> Add a volume
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default VolumesList;
