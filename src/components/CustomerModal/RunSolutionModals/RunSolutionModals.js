import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import _ from 'lodash/fp';
import className from 'classnames/bind';
import 'rc-tooltip/assets/bootstrap_white.css';

import { routerLinks } from '../../../config';
import modalStyles from '../index.scss';

import Environments from './Environments';
import InputControl from '../../InputControl';

import globalStyles from '../../../theme/global.scss';

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
  solutionName: string,
  currentSolution: Object,
  getEnvsData: Object,
  isOpenedSelectNamespace: Object,
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
            {currentView === 'first' && (
              <button
                onClick={e => handleSubmitCreatingEssence(e, 'next')}
                style={{ padding: '4px 27px' }}
                className="btn blue-btn modal-body-next-btn"
                disabled={!displayedNamespaces.length}
                type="submit"
              >
                Next
              </button>
            )}
            {currentView === 'second' && (
              <button
                onClick={e => handleSubmitCreatingEssence(e, 'deploy')}
                style={{ padding: '4px 27px' }}
                className="btn blue-btn modal-body-next-btn"
                disabled={!displayedNamespaces.length}
                type="submit"
              >
                Deploy
              </button>
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
                <li>
                  <a href="##" className="active">
                    Profile
                  </a>
                </li>
              </ul>
              <div className="main-content">
                <div className="main-content-title">Projects</div>
                {displayedNamespaces.length ? (
                  <div>
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
                      {displayedNamespaces.map(ns => (
                        <option key={_.uniqueId()} value={ns.label}>
                          {ns.label}
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
                <li>
                  <a href="##" className="active">
                    Profile
                  </a>
                </li>
              </ul>
              <div className="main-content">
                <div className="main-content-title">Environments</div>
                <Environments
                  envs={getEnvsData}
                  handleChangeInputEnvironment={handleChangeInputEnvironment}
                />
              </div>
            </div>
          )}
          {currentView === 'third-success' && (
            <div className="modal-main-content-success-page">
              <div className="status-message-success">success</div>
              <div className="message-text">
                <a href="##">Continue to the project overview</a> to … open
                source Docker, which developed a method to give containers
                better portability -- allowing them to be moved among any system
                that shares the host OS type without requiring code changes.
                With Docker containers, there are no guest OS environment.
              </div>
              <div className="table-title">Deployments</div>
              <table className="table modal-table" width="1170">
                <thead>
                  <tr>
                    <td className="" />
                    <td className="w-30">Name</td>
                    <td className="w-25">Port</td>
                    <td className="w-50">TCP/UDP</td>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td className="">
                      <img alt="img" src="img/cube-3.png" />
                    </td>
                    <td className="">Redis-django-123456789-7fns</td>
                    <td className="">80:500</td>
                    <td className="">TCP</td>
                  </tr>
                  <tr className="">
                    <td className="border-bot">
                      <img alt="img" src="img/cube-3.png" />
                    </td>
                    <td className="border-bot">Redis-django-123456789-7fns</td>
                    <td className="border-bot">13456:14600</td>
                    <td className="border-bot">UDP</td>
                  </tr>
                </tbody>
              </table>

              <div className="table-title">Services</div>
              <table className="table modal-table" width="1170">
                <thead>
                  <tr>
                    <td className="" />
                    <td className="w-30">Name</td>
                    <td className="w-25">Port</td>
                    <td className="w-50">TCP/UDP</td>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td className="">
                      <img alt="img" src="img/cube-3.png" />
                    </td>
                    <td className="">Redis-django-123456789-7fns</td>
                    <td className="">80:500</td>
                    <td className="">TCP</td>
                  </tr>
                  <tr className="">
                    <td className="border-bot">
                      <img alt="img" src="img/cube-3.png" />
                    </td>
                    <td className="border-bot">Redis-django-123456789-7fns</td>
                    <td className="border-bot">13456:14600</td>
                    <td className="border-bot">UDP</td>
                  </tr>
                </tbody>
              </table>

              <div className="error-page-btn-wrap">
                <button className="white-btn white-btn-success">
                  APPLICATION PAGE
                </button>
                <button className="blue-btn white-btn-success">
                  open application
                </button>
              </div>
            </div>
          )}
          {currentView === 'third-error' && (
            <div className="modal-main-content-error-page">
              <div className="status-message-error">error</div>
              <div className="message-text">
                Containerization gained prominence with the open source Docker,
                which developed a method to give containers better portability
                -- allowing them to be moved among any system that shares the
                host OS type without requiring code changes. With Docker
                containers, there are no guest OS environment.
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
