/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import Helmet from 'react-helmet';
import className from 'classnames/bind';

import HeaderPage from '../Header';
import FooterPage from '../Footer';

import * as actionGetImagesToken from '../../actions/webHookActions/getImagesToken';
import * as actionDeleteImageToken from '../../actions/webHookActions/deleteImageToken';
import * as actionCreateImageToken from '../../actions/webHookActions/createImageToken';
import type { Dispatch, ReduxState } from '../../types';
import {
  GET_IMAGES_TOKEN_INVALID,
  GET_IMAGES_TOKEN_REQUESTING,
  GET_IMAGES_TOKEN_SUCCESS,
  GET_IMAGES_TOKEN_FAILURE
} from '../../constants/webHookConstants/getImagesToken';
import { DELETE_IMAGE_TOKEN_SUCCESS } from '../../constants/webHookConstants/deleteImageToken';
import { CREATE_IMAGE_TOKEN_SUCCESS } from '../../constants/webHookConstants/createImageToken';
import ImagesTokenList from '../../components/ImagesTokenList';
import Notification from '../Notification';
import LoadButton from '../../components/LoadButton';
import InputControl from '../../components/InputControl';

import buttonsStyles from '../../theme/buttons.scss';

import globalStyles from '../../theme/global.scss';
import inputStyles from '../../components/InputControl/index.scss';

const globalClass = className.bind(globalStyles);

const formClassName = globalClass('formInputText', 'formControl');

type Props = {
  getImagesTokenReducer: Object,
  deleteImageTokenReducer: Object,
  createImageTokenReducer: Object,
  fetchGetImagesTokenIfNeeded: () => void,
  fetchDeleteImageTokenIfNeeded: (label: string) => void,
  fetchCreateImageTokenIfNeeded: (label: string, regexp: string) => void
};

// Export this for unit testing more easily
export class WebHook extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      displayedTokens: [],
      label: '',
      regexp: '.*'
    };
  }
  componentDidMount() {
    const { fetchGetImagesTokenIfNeeded } = this.props;
    fetchGetImagesTokenIfNeeded();
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getImagesTokenReducer.readyStatus !==
        nextProps.getImagesTokenReducer.readyStatus &&
      nextProps.getImagesTokenReducer.readyStatus === GET_IMAGES_TOKEN_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedTokens: nextProps.getImagesTokenReducer.data
      });
    }
    if (
      this.props.deleteImageTokenReducer.readyStatus !==
        nextProps.deleteImageTokenReducer.readyStatus &&
      nextProps.deleteImageTokenReducer.readyStatus ===
        DELETE_IMAGE_TOKEN_SUCCESS
    ) {
      const displayedTokens = this.state.displayedTokens.filter(
        namespace => nextProps.deleteImageTokenReducer.label !== namespace.label
      );
      this.setState({
        ...this.state,
        displayedTokens
      });
    }
    if (
      this.props.createImageTokenReducer.readyStatus !==
        nextProps.createImageTokenReducer.readyStatus &&
      nextProps.createImageTokenReducer.readyStatus ===
        CREATE_IMAGE_TOKEN_SUCCESS
    ) {
      const displayedTokens = this.state.displayedTokens.slice();
      displayedTokens.push(nextProps.createImageTokenReducer.data);
      this.setState({
        ...this.state,
        displayedTokens,
        label: '',
        regexp: '.*'
      });
    }
  }
  handleDeleteImageToken = label => {
    this.props.fetchDeleteImageTokenIfNeeded(label);
  };
  handleSubmitCreateImageToken = e => {
    e.preventDefault();
    const { label, regexp } = this.state;
    this.props.fetchCreateImageTokenIfNeeded(label, regexp);
  };
  handleChangeWebHookLabel = value => {
    this.setState({
      ...this.state,
      label: value
    });
  };
  handleChangeWebHookRegexp = value => {
    this.setState({
      ...this.state,
      regexp: value
    });
  };

  renderImagesTokenList = () => {
    const { getImagesTokenReducer } = this.props;

    if (
      !getImagesTokenReducer.readyStatus ||
      getImagesTokenReducer.readyStatus === GET_IMAGES_TOKEN_INVALID ||
      getImagesTokenReducer.readyStatus === GET_IMAGES_TOKEN_REQUESTING
    ) {
      return (
        <div
          className="container"
          style={{
            padding: '0',
            marginTop: '17px',
            marginBottom: '30px',
            backgroundColor: 'transparent'
          }}
        >
          <img
            src={require('../../images/ns-dep.svg')}
            alt="ns-dep"
            style={{ width: '100%' }}
          />
        </div>
      );
    }

    if (getImagesTokenReducer.readyStatus === GET_IMAGES_TOKEN_FAILURE) {
      return <p>Oops, Failed to load data of Tokens!</p>;
    }

    return (
      <ImagesTokenList
        data={this.state.displayedTokens}
        handleDeleteImageToken={label => this.handleDeleteImageToken(label)}
      />
    );
  };
  render() {
    const { deleteImageTokenReducer, createImageTokenReducer } = this.props;
    const { displayedTokens, label, regexp } = this.state;
    const firstImageToken = displayedTokens[0]
      ? displayedTokens[0].token
      : '{WEBHOOK_KEY}';
    return (
      <div>
        <Helmet title="WebHook" />
        <HeaderPage />
        <div className="container  no-back">
          <div className="content-block">
            <div className="row double two-columns">
              <div className="col-md-3 col-lg-3 col-xl-2" />
              <div className="col-md-9 col-lg-9 col-xl-10">
                <div className="container container__webhook">
                  <Notification
                    status={deleteImageTokenReducer.status}
                    method={deleteImageTokenReducer.method}
                    name={deleteImageTokenReducer.label}
                    errorMessage={deleteImageTokenReducer.err}
                  />
                  <Notification
                    status={createImageTokenReducer.status}
                    method={createImageTokenReducer.method}
                    name={createImageTokenReducer.label}
                    errorMessage={createImageTokenReducer.err}
                  />
                  <div className="block-item" id="webhooks">
                    <div className="block-item__title">WebHook</div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="light-text">
                          Here you can configure a CD WebHook to automate
                          updating images in your containers.
                        </div>
                      </div>
                    </div>
                    {this.renderImagesTokenList()}
                    <form
                      onSubmit={e => this.handleSubmitCreateImageToken(e)}
                      className="row mt-2"
                    >
                      <div className="col-md-3">
                        <InputControl
                          value={label}
                          id="webHookLabel"
                          type="text"
                          required
                          baseClassName={`${formClassName} ${
                            inputStyles.inputCustom
                          }`}
                          baseClassNameLabel={`${
                            globalStyles.formGroupLabel
                          } ${label && globalStyles.formGroupLabelOnFocus}`}
                          labelText="Name"
                          handleChangeInput={e =>
                            this.handleChangeWebHookLabel(e.target.value)
                          }
                        />
                      </div>
                      <div className="col-md-3">
                        <InputControl
                          value={regexp}
                          id="webHookRegexp"
                          type="text"
                          required
                          baseClassName={`${formClassName} ${
                            inputStyles.inputCustom
                          }`}
                          baseClassNameLabel={`${
                            globalStyles.formGroupLabel
                          } ${regexp && globalStyles.formGroupLabelOnFocus}`}
                          labelText="Pattern"
                          handleChangeInput={e =>
                            this.handleChangeWebHookRegexp(e.target.value)
                          }
                        />
                      </div>
                      <div className="col-md-2">
                        <div className="form-group pt-0">
                          <LoadButton
                            style={{ width: '70px' }}
                            type="submit"
                            buttonText="Add"
                            isFetching={createImageTokenReducer.isFetching}
                            baseClassButton={`${
                              buttonsStyles.buttonUIDeployDashboard
                            } btn btn-outline-primary`}
                          />
                        </div>
                      </div>
                    </form>
                    <br />
                    <div className="row">
                      <div className="col-md-12">
                        <div className="normal-text">WebHook Example:</div>
                        <Scrollbars
                          autoHide
                          className="block-item__copy-string"
                        >
                          <div className="block-item__content-string">
                            curl -X POST \<br />
                            https://web.api.containerum.io:5000/api/set/image/{
                              firstImageToken
                            }
                            \<br />
                            -H &apos;content-type: application/json&apos; \<br />
                            -d &apos;&#123;<br />
                            &nbsp;&nbsp;&quot;image&quot;:
                            &quot;IMAGE_NAME&quot;,<br />
                            &nbsp;&nbsp;&quot;deployment_name&quot;:
                            &quot;DEPLOY_NAME&quot;,<br />
                            &nbsp;&nbsp;&quot;namespace&quot;:
                            &quot;NAMESPACE_NAME&quot;,<br />
                            &nbsp;&nbsp;&quot;container_name&quot;:
                            &quot;CONTAINER_NAME&quot;<br />
                            &#125;&apos;
                          </div>
                        </Scrollbars>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-md-12">
                        <div className="normal-text">
                          WebHook for Docker Hub Example:
                        </div>
                        <Scrollbars
                          autoHide
                          className="block-item__copy-string block-item__copy-string-docker"
                        >
                          <div className="block-item__content-string block-item__content-string-docker">
                            http://web.api.containerum.io:5000/api/namespaces/&#123;NAMESPACE_NAME&#125;/deployments/&#123;DEPLOY_NAME&#125;/containers/&#123;CONTAINER_NAME&#125;/set/image/{
                              firstImageToken
                            }
                          </div>
                        </Scrollbars>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterPage />
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getImagesTokenReducer,
    deleteImageTokenReducer,
    createImageTokenReducer
  }: ReduxState) => ({
    getImagesTokenReducer,
    deleteImageTokenReducer,
    createImageTokenReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetImagesTokenIfNeeded: () =>
      dispatch(actionGetImagesToken.fetchGetImagesTokenIfNeeded()),
    fetchDeleteImageTokenIfNeeded: (label: string) =>
      dispatch(actionDeleteImageToken.fetchDeleteImageTokenIfNeeded(label)),
    fetchCreateImageTokenIfNeeded: (label: string, regexp: string) =>
      dispatch(
        actionCreateImageToken.fetchCreateImageTokenIfNeeded(label, regexp)
      )
  })
);

export default connector(WebHook);
