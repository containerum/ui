import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import _ from 'lodash/fp';
import className from 'classnames/bind';
import 'rc-tooltip/assets/bootstrap_white.css';
import Tooltip from 'rc-tooltip';

import { routerLinks } from '../../../config';
import modalStyles from '../index.scss';

import Environments from './Environments';
import LoadButton from '../../LoadButton';
import InputControl from '../../InputControl';
import DeploymentsList from '../../DeploymentsList';
import ServicesList from '../../ServicesList';

import globalStyles from '../../../theme/global.scss';
import buttonsStyles from '../../../theme/buttons.scss';

const globalClass = className.bind(globalStyles);
const selectClassName = globalClass('formControl', 'selectCustomModal');
const btnClassName = globalClass('btnBlue', 'btnDepl');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'fixed',
    display: 'block',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1050,
    overflow: 'hidden',
    outline: 0,
    opacity: 1,
    overflowY: 'auto'
  },
  content: {
    maxWidth: 1170,
    maxHeight: 826
  }
};

type Props = {
  currentNamespace: string,
  currentView: string,
  login: string,
  solutionName: string,
  currentSolution: Object,
  getEnvsData: Object,
  history: Object,
  runSolutionReducer: Object,
  getEnvsSolutionReducer: Object,
  isOpenedSelectNamespace: Object,
  deploymentsRunningSolution: Array<Object>,
  servicesRunningSolution: Array<Object>,
  displayedNamespaces: Array<Object>,
  handleSubmitCreatingEssence: (e: Object) => void,
  handleSelectNamespace: (e: Object) => void,
  handleOpenCloseModal: (currentView: string) => void,
  handleChangeInputEnvironment: () => void,
  handleChangeInput: () => void,
  openFirstModal: () => void,
  handleOpenPreviousModal: () => void
};

const RunSolutionModals = ({
  currentNamespace,
  currentView,
  solutionName,
  currentSolution,
  getEnvsData,
  history,
  login,
  runSolutionReducer,
  deploymentsRunningSolution,
  getEnvsSolutionReducer,
  servicesRunningSolution,
  isOpenedSelectNamespace,
  handleSubmitCreatingEssence,
  handleSelectNamespace,
  displayedNamespaces,
  handleOpenCloseModal,
  handleChangeInputEnvironment,
  handleChangeInput,
  openFirstModal,
  handleOpenPreviousModal
}: Props) => {
  let barFill = 0;
  if (currentView === 'second') {
    barFill = '50%';
  } else if (currentView.indexOf('third') + 1) {
    barFill = '100%';
  }

  let openApplication = currentSolution.url;
  if (servicesRunningSolution.length) {
    const firstServiceWithDomain = servicesRunningSolution.find(
      service => (service ? service.domain : null)
    );
    if (firstServiceWithDomain) {
      const { ports } = firstServiceWithDomain;
      openApplication = `http://${firstServiceWithDomain.domain}:${
        ports[0].port
      }`;
    }
  }
  const filterDisplayedNamespaces = displayedNamespaces.filter(
    ns => ns.access !== 'read'
  );
  const regexp = /^[a-z][a-z0-9-]*$|^$/;
  const isErrorNameSolutionTooltipClass = solutionName.search(regexp) === -1;

  return (
    <Modal
      isOpen={isOpenedSelectNamespace}
      onRequestClose={() => handleOpenCloseModal(currentView)}
      style={customStyles}
      contentLabel="Create"
      ariaHideApp={false}
      className={`modal-dialog ${modalStyles.runSolutionModal}`}
    >
      <div className={`modal-content ${modalStyles.runSolutionModalContent}`}>
        <div className={`modal-header ${modalStyles.runSolutionModalHeader}`}>
          <div className="modal-header-title">{currentSolution.name}</div>
          <button
            onClick={() => handleOpenCloseModal(currentView)}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            style={{
              position: 'absolute',
              top: 13,
              right: 15
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div>
          <div
            className={`modal-body ${modalStyles.runSolutionModalBody}`}
            style={
              currentView.indexOf('third') + 1
                ? { justifyContent: 'center' }
                : {}
            }
          >
            {currentView === 'first' && (
              <button
                onClick={() => handleOpenCloseModal(currentView)}
                className="white-btn modal-body-cancel-btn"
                data-dismiss="modal"
                type="button"
              >
                Cancel
              </button>
            )}
            {currentView === 'second' && (
              <button
                onClick={handleOpenPreviousModal}
                className="white-btn modal-body-cancel-btn"
                data-dismiss="modal"
                type="button"
              >
                Previous
              </button>
            )}
            <div className="box">
              <div className="progress">
                <div className="bar">
                  <div className="bar__fill" style={{ width: barFill }} />
                </div>
                <div
                  className={`point ${(currentView === 'second' ||
                    currentView.indexOf('third') + 1) &&
                    'point--complete'} ${currentView === 'first' &&
                    'point--active'}`}
                >
                  <div className="bullet" />
                  <label className="label">Select Project</label>
                </div>
                <div
                  className={`point ${currentView === 'second' &&
                    'point--active'} ${currentView.indexOf('third') + 1 &&
                    'point--complete'}`}
                >
                  <div className="bullet" />
                  <label className="label">Environments</label>
                </div>
                <div
                  className={`point ${currentView.indexOf('third') + 1 &&
                    'point--active'}`}
                >
                  <div className="bullet" />
                  <label className="label">Result</label>
                </div>
              </div>
            </div>
            {currentView === 'first' && displayedNamespaces.length ? (
              <div onClick={e => handleSubmitCreatingEssence(e, 'next')}>
                <LoadButton
                  style={
                    getEnvsSolutionReducer.isFetching
                      ? {
                          padding: '4px 41px',
                          width: 117.08
                        }
                      : {
                          padding: '4px 41px'
                        }
                  }
                  type="submit"
                  buttonText="Next"
                  isFetching={getEnvsSolutionReducer.isFetching}
                  disabled={!solutionName}
                  mini="miniFont"
                  baseClassButton="btn blue-btn modal-body-next-btn"
                />
              </div>
            ) : (
              <div />
            )}
            {currentView === 'second' && (
              <div onClick={e => handleSubmitCreatingEssence(e, 'deploy')}>
                <LoadButton
                  style={
                    runSolutionReducer.isFetching
                      ? {
                          padding: '4px 41px',
                          width: 134.22
                        }
                      : {
                          padding: '4px 41px'
                        }
                  }
                  type="submit"
                  buttonText="Deploy"
                  isFetching={runSolutionReducer.isFetching}
                  disabled={!displayedNamespaces.length}
                  mini="miniFont"
                  baseClassButton="btn blue-btn modal-body-next-btn"
                />
              </div>
            )}
          </div>

          {currentView === 'first' && (
            <div
              className={`modal-main-content ${
                modalStyles.runSolutionModalMainContent
              }`}
            >
              <ul
                className={`modal-list ${
                  modalStyles.runSolutionModalModalList
                }`}
              >
                {/* <li> */}
                {/* <a href="##" className="active"> */}
                {/* Profile */}
                {/* </a> */}
                {/* </li> */}
              </ul>
              <div className="main-content">
                <div className="main-content-title">Projects</div>
                {displayedNamespaces.length ? (
                  <div>
                    <Tooltip
                      placement="top"
                      visible
                      overlay={<span>Invalid domain name</span>}
                      overlayClassName={
                        isErrorNameSolutionTooltipClass
                          ? ''
                          : 'rc-tooltip-hidden'
                      }
                    >
                      <InputControl
                        value={solutionName}
                        id="solutionName"
                        type="text"
                        required
                        baseClassName="form-group__input-text form-control customInput"
                        baseClassNameLabel={`form-group__label ${solutionName &&
                          'form-group__label-always-onfocus'}`}
                        labelText="Solution name"
                        baseClassNameHelper={globalStyles.formGroupHelper}
                        handleChangeInput={e => {
                          handleChangeInput(e.target.value);
                        }}
                      />
                    </Tooltip>
                    <span className={`${modalStyles.modalRedisText} mt-4 mb-4`}>
                      Please, select the Project for Solution installation
                    </span>
                    <select
                      className={`${selectClassName} form-control custom-select`}
                      style={{ padding: 8 }}
                      id="namespaceSelect"
                      name="namespaces"
                      onChange={e => handleSelectNamespace(e.target.value)}
                      value={currentNamespace.label}
                      required
                    >
                      {filterDisplayedNamespaces.map(ns => (
                        <option key={_.uniqueId()} value={ns.label}>
                          {ns.label}
                          {login !== ns.owner_login && ` (${ns.owner_login}) `}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <div>You have no active projects yet.</div>
                    <Link
                      className={btnClassName}
                      data-toggle="modal"
                      to={routerLinks.createNamespace}
                      style={{ display: 'inline-block' }}
                    >
                      Create Project
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
          {currentView === 'second' && (
            <div
              className={`modal-main-content ${
                modalStyles.runSolutionModalMainContent
              }`}
            >
              <ul
                className={`modal-list ${
                  modalStyles.runSolutionModalModalList
                }`}
              >
                {/* <li> */}
                {/* <a href="##" className="active"> */}
                {/* Profile */}
                {/* </a> */}
                {/* </li> */}
              </ul>
              <div className="main-content">
                <div className="main-content-title">Environments</div>
                <Environments
                  envs={getEnvsData}
                  handleChangeInputEnvironment={handleChangeInputEnvironment}
                />
                <div
                  onClick={e => handleSubmitCreatingEssence(e, 'deploy')}
                  style={{ marginTop: 30 }}
                >
                  <LoadButton
                    type="submit"
                    buttonText="Deploy"
                    isFetching={runSolutionReducer.isFetching}
                    disabled={!displayedNamespaces.length}
                    baseClassButton={`${buttonsStyles.buttonUILoadButton} ${
                      globalStyles.marginBottom50
                    } ${globalStyles.marginTop10}`}
                  />
                </div>
              </div>
            </div>
          )}
          {currentView === 'third-success' && (
            <div className="modal-main-content-success-page">
              <div className="status-message-success">success</div>
              <div className="message-text">
                {currentSolution.name} was successfully run
              </div>
              {deploymentsRunningSolution.length ? (
                <div>
                  <div className="table-title">Deployments</div>
                  <div style={{ marginBottom: 40 }}>
                    <DeploymentsList
                      data={deploymentsRunningSolution}
                      dataNamespace={{}}
                      history={history}
                      idName={currentNamespace.id}
                    />
                  </div>
                </div>
              ) : (
                ''
              )}
              {servicesRunningSolution.length ? (
                <div>
                  <div className="table-title">Services</div>
                  <div style={{ marginBottom: 40 }}>
                    <ServicesList
                      data={servicesRunningSolution}
                      dataNamespace={{}}
                      history={history}
                      idName={currentNamespace.id}
                    />
                  </div>
                </div>
              ) : (
                ''
              )}
              <div className="error-page-btn-wrap">
                <Link
                  onClick={openFirstModal}
                  to={routerLinks.getRunningSolutionLink(
                    currentNamespace.id,
                    solutionName
                  )}
                  className="white-btn white-btn-error"
                >
                  Application page
                </Link>
                <a
                  href={openApplication}
                  target="_blank"
                  className="blue-btn white-btn-error"
                >
                  Open application
                </a>
              </div>
            </div>
          )}
          {currentView === 'third-error' && (
            <div className="modal-main-content-error-page">
              <div className="status-message-error">error</div>
              <div className="message-text">
                {runSolutionReducer.err}
                <br />
              </div>

              <div className="error-page-btn-wrap">
                <Link
                  to={routerLinks.support}
                  className="white-btn white-btn-error"
                >
                  Support
                </Link>
                <button
                  onClick={openFirstModal}
                  className="blue-btn white-btn-error"
                >
                  Restart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RunSolutionModals;
