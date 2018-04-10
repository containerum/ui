import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

import HeaderPage from '../../containers/Header/index';
import FooterPage from '../../containers/Footer/index';

import { routerLinks } from '../../config';

import arrow from './images/arrowBack.svg';

const ConfigMapView = () => (
  <div>
    <Helmet title="Configmap View" />
    <HeaderPage />
    <Link to={routerLinks.support}>
      <div className="header" style={{ zIndex: '-100' }}>
        <div className="header-top">
          <div
            className="header-top-container container"
            style={{ color: '#29abe2', display: 'flex', alignItems: 'center' }}
          >
            <div className="arrow-back">
              <img src={arrow} alt="arrow-back" />
            </div>
            <div style={{ height: '27px' }}>CONFIGMAP LIST</div>
          </div>
        </div>
      </div>
    </Link>
    <div className="content-block">
      <div className="container no-back">
        <div className="row double two-columns">
          <div className="col-md-3 col-lg-3 col-xl-2">
            <div className="content-block account-info">
              <div
                className="content-block-container container no-back pl-0 pr-0 container-fluid"
                style={{ paddingTop: '1px' }}
              >
                <ul className="account-menu nav nav-list">
                  <li>
                    <div className="nav-root-item">CONFIGMAP NAME</div>
                    <ul
                      style={{
                        padding: '27px 0px 0px 20px',
                        listStyleType: 'none'
                      }}
                    >
                      {new Array(5).fill().map(() => (
                        <Link to={routerLinks.support}>
                          <li style={{ paddingBottom: '15px' }}>
                            <div className="configmapView__list-item">
                              azazazazaazazazazzazazaazazaz
                            </div>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9 col-lg-9 col-xl-10">
            <div className="content-block">
              <div className="content-block-container content-block-container__configmap-view container container-fluid">
                <div className="light-text__cfm">fileName</div>
                <Scrollbars
                  universal
                  autoHide
                  style={{ width: '100%', height: '281px' }}
                  renderThumbVertical={({ style, ...props }) => (
                    <div
                      {...props}
                      style={{
                        ...style,
                        backgroundColor: 'rgba(246, 246, 246, 0.3)',
                        borderRadius: '4px'
                      }}
                    />
                  )}
                  renderThumbHorizontal={({ style, ...props }) => (
                    <div
                      {...props}
                      style={{
                        ...style,
                        backgroundColor: 'rgba(246, 246, 246, 0.3)',
                        borderRadius: '4px'
                      }}
                    />
                  )}
                  renderView={props => (
                    <div {...props} className="log-data__cfm" />
                  )}
                >
                  <div>
                    configmaptxtsdfsdfsdfdsgfsdgsdfdsfsdfgsdgsdgsdgdsgsdgsdgsdgsdgsdgsdgsdgsdgsdgsgsdgsdgdsgsdgsdgsdgsdgdsgsdgsdgsdgsdgsdgsdgsdgsdgsdgsdgsdgsdgsdgsdgsdsdfgdsfhdfhdghfghdfhdfhdfghdfghdghdfghdfghdfhdghgfhd
                    game.properties: | enemies=aliens lives=3 enemies.cheat=true
                    enemies.cheat.level=noGoodRotten
                    secret.code.passphrase=UUDDLRLRBABAS
                    secret.code.allowed=true secret.code.lives=30 enemies=aliens
                    enemies.cheat.level=noGoodRotten
                    secret.code.passphrase=UUDDLRLRBABAS
                    secret.code.allowed=true secret.code.lives=30
                    ame.properties: | enemies=aliens lives=3 enemies.cheat=true
                    enemies.cheat.level=noGoodRotten
                    secret.code.passphrase=UUDDLRLRBABAS
                    secret.code.allowed=true secret.code.lives=30 enemies=aliens
                    enemies.cheat.level=noGoodRotten
                    secret.code.passphrase=UUDDLRLRBABAS
                    secret.code.allowed=true secret.code.lives=30
                    ame.properties: | enemies=aliens lives=3 enemies.cheat=true
                    enemies.cheat.level=noGoodRotten
                    secret.code.passphrase=UUDDLRLRBABAS
                    secret.code.allowed=true secret.code.lives=30 enemies=aliens
                    enemies.cheat.level=noGoodRotten
                    secret.code.passphrase=UUDDLRLRBABAS
                    secret.code.allowed=true secret.code.lives=30
                    ame.properties: | enemies=aliens lives=3 enemies.cheat=true
                    enemies.cheat.level=noGoodRotten
                    secret.code.passphrase=UUDDLRLRBABAS
                    secret.code.allowed=true secret.code.lives=30 enemies=aliens
                    enemies.cheat.level=noGoodRotten
                    secret.code.passphrase=UUDDLRLRBABAS
                    secret.code.allowed=true secret.code.lives=30
                  </div>
                </Scrollbars>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterPage />
  </div>
);

export default ConfigMapView;
