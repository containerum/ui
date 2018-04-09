import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

const Tools = () => (
  <div>
    <Helmet title="Tools" />
    <div className="container container__tools no-back">
      <Link to="/configmap">
        <div className="col-md-4 tools__card">
          <div className="content-block-container
        content-block-container__tools
        card-container__tools
        hover-action">
            <div className="content-block-header ">
              <div className="content-block-header-label
                                content-block-header-label__tools">
                <div className="content-block-header-img__tools content-block-header-img__tools_cfm" />
                <div className="content-block-header-label_main">CONFIGMAP</div>
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
      <Link to="/webhook">
        <div className="col-md-4 tools__card_center">
          <div className="content-block-container
        content-block-container__tools
        card-container
        card-container__tools
         hover-action">
            <div className="content-block-header ">
              <div className="content-block-header-label
                         content-block-header-label__tools">
                <div className="content-block-header-img__tools content-block-header-img__tools_webhooks" />
                <div className="content-block-header-label_main">
                  CD WEBHOOK
                </div>
              </div>
            </div>

            <div className="content-block-content
          card-block
          content-block-content__tools ">
              <div className="content-block__info-item ">
                <div className="content-block__info-name
              content-block__info-name_tools
               content-block-header-label__text_center">
                  CCD Webhook allow you to automate updating images in
                  containers.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <Link to="/domains">
        <div className="col-md-4 tools__card_right">
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
                  Domain help you to manage external access to the services.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  </div>
);

export default Tools;
