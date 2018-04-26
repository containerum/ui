import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

const Tools = () => (
  <div>
    <Helmet title="Tools" />
    <div className="container container__tools no-back">
      <Link to="/configmap">
        <div className="col-md-12 tools__card">
          <div className="content-block-container
        content-block-container__tools
        card-container__tools
        hover-action">
            <div className="content-block-header ">
              <div className="content-block-header-label
                                content-block-header-label__tools">
                <div className="content-block-header-img__tools content-block-header-img__tools_cfm" />
                <div className="content-block-header-label_main">
                  CONFIGMAPS
                </div>
              </div>
            </div>
            <div className="content-block-content
          card-block content-block-content__tools ">
              <div className="content-block__info-item ">
                <div className="content-block__info-name
              content-block__info-name_tools
               content-block-header-label__text_center">
                  ConfigMaps allow you to decouple configuration artifacts from
                  image content to keep containerized applications portable.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <Link to="/domains">
        <div className="col-md-12 tools__card">
          <div className="content-block-container
        content-block-container__tools
        card-container card-container__tools
        hover-action">
            <div className="content-block-header ">
              <div className="content-block-header-label
                         content-block-header-label__tools">
                <div className="content-block-header-img__tools content-block-header-img__tools_domains" />
                <div className="content-block-header-label_main">DOMAINS</div>
              </div>
            </div>

            <div className="content-block-content
           card-block
           content-block-content__tools ">
              <div className="content-block__info-item ">
                <div className="content-block__info-name
              content-block__info-name_tools
              content-block-header-label__text_center">
                  Domains help you to manage external access to the services.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div>
        {/* Link to="/webhook" */}
        <div className="col-md-12 tools__card">
          <div
            style={{ backgroundColor: '#fafafa' }}
            className="content-block-container content-block-container__tools content-block-container__tools-hover-always card-container card-container__tools card-container__tools_not-active "
          >
            <div className="content-block-header ">
              <div className="content-block-header-label
                         content-block-header-label__tools">
                <div className="content-block-header-img__tools content-block-header-img__tools_webhooks" />
                <div className="content-block-header-label_main">
                  CD WEBHOOKS
                </div>
              </div>
            </div>

            <div className="content-block-content
          card-block
          content-block-content__tools ">
              <div className="content-block__info-item ">
                <div className="content-block__info-name
              content-block__info-name_tools content-block__info-name_tools-wb
               content-block-header-label__text_center">
                  CD WebHooks allow you to automate updating images in
                  containers.
                  <br />
                  <br />
                  <span style={{ color: '#29abe2' }}>Coming soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Tools;