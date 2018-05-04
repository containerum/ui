import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import _ from 'lodash/fp';
import 'rc-tooltip/assets/bootstrap_white.css';

import getSolutionImage from '../../functions/getSolutionImage';
import {
  RUN_SOLUTION_REQUESTING,
  RUN_SOLUTION_FAILURE,
  RUN_SOLUTION_SUCCESS
} from '../../constants/solutionConstants/runSolution';
import globalStyles from '../../theme/global.scss';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: 'transform .3s ease-out,-webkit-transform .3s ease-out',
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    border: 'none',
    overflow: 'hidden',
    WebkitOverflowScrolling: 'touch',
    borderRadius: 'none',
    outline: 'none',
    padding: '0',
    maxHeight: '490px',
    minHeight: '300px'
  }
};

type Props = {
  namespace: Object,
  currentSolution: string,
  namespaces: Array<Object>,
  isFetching: boolean,
  readyStatus: string,
  isOpened: boolean,
  handleSelectNamespace: (value: string) => void,
  onHandleCreate: () => void,
  handleOpenCloseModal: () => void
};

const SelectNamespaceModal = ({
  namespace,
  currentSolution,
  namespaces,
  isFetching,
  readyStatus,
  isOpened,
  handleSelectNamespace,
  handleOpenCloseModal,
  onHandleCreate
}: Props) => {
  const handleCloseModal = () => {
    handleOpenCloseModal();
  };
  const handleSubmitCreatingEssence = e => {
    e.preventDefault();
    onHandleCreate();
  };

  const { srcLogo, logoHeight } = getSolutionImage(currentSolution, '100px');
  return (
    <Modal
      isOpen={isOpened}
      onRequestClose={() => handleCloseModal()}
      style={customStyles}
      contentLabel="Create"
      ariaHideApp={false}
      className="modal-dialog modal-dialog2 modal-dialog-create"
    >
      {readyStatus !== RUN_SOLUTION_FAILURE &&
        readyStatus !== RUN_SOLUTION_SUCCESS && (
          <div>
            {!isFetching && readyStatus !== RUN_SOLUTION_REQUESTING ? (
              <form
                onSubmit={e => handleSubmitCreatingEssence(e)}
                className="modal-content"
              >
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    onClick={() => handleCloseModal()}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body text-left">
                  <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <img
                      src={srcLogo}
                      alt="logo"
                      style={{
                        maxWidth: '200px',
                        height: logoHeight,
                        maxHeight: '130px'
                      }}
                    />
                  </div>
                  {namespace ? (
                    <div>
                      <span className="modal-redis-text mt-4 mb-4">
                        Please, select the Namespace for Solution instalation
                      </span>
                      <select
                        className="form-control custom-select"
                        id="namespaceSelect"
                        name="namespaces"
                        onChange={e => handleSelectNamespace(e.target.value)}
                        value={namespace.label}
                        required
                      >
                        {namespaces.map(ns => (
                          <option key={_.uniqueId()} value={ns.label}>
                            {ns.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div
                      className={globalStyles.errorMessage}
                      style={{ margin: '20px 0 0' }}
                    >
                      <span className={globalStyles.errorMessageText}>
                        You have no Namespace yet
                      </span>
                    </div>
                  )}
                </div>
                {namespace ? (
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn modal-footer-solution-cancel"
                      onClick={() => handleCloseModal()}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn modal-footer-solution-select"
                    >
                      Create
                    </button>
                  </div>
                ) : (
                  <div className="modal-footer">
                    <Link
                      className="blue-btn depl-btn"
                      data-toggle="modal"
                      to="/createNamespace"
                    >
                      Create NAMESPACE
                    </Link>
                  </div>
                )}
              </form>
            ) : (
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    onClick={() => handleCloseModal()}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div
                  className="modal-body text-center"
                  style={{ marginBottom: '100px' }}
                >
                  <div style={{ marginTop: '40px' }}>
                    <img
                      src={srcLogo}
                      alt="logo"
                      style={{
                        maxWidth: '200px',
                        height: logoHeight,
                        maxHeight: '130px'
                      }}
                    />
                  </div>
                  <div className="modal-redis-text mt-4 mb-4">
                    Solution deployment in progress. <br />
                    Please, wait...
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      {readyStatus === RUN_SOLUTION_FAILURE && (
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              onClick={() => handleCloseModal()}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body text-left">
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <img
                src={srcLogo}
                alt="logo"
                style={{
                  maxWidth: '200px',
                  height: logoHeight,
                  maxHeight: '130px'
                }}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                className={globalStyles.errorMessage}
                style={{ margin: '20px 0 0', backgroundColor: '#fff' }}
              >
                <span className={globalStyles.errorMessageText}>ERROR</span>
              </div>
              <span className="modal-redis-text">
                Please, contact the engineers for support and you will <br />
                get the assistance as quickly as possible
              </span>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn modal-footer-solution-cancel"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>
            <div className="volume-footer-links-deploy">
              <Link
                to="/support"
                className="footer-links-deploy-btn"
                style={{ padding: '8px 55px' }}
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      )}

      {readyStatus === RUN_SOLUTION_SUCCESS && (
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              onClick={() => handleCloseModal()}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body text-left">
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <img
                src={srcLogo}
                alt="logo"
                style={{
                  maxWidth: '200px',
                  height: logoHeight,
                  maxHeight: '130px'
                }}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                className={globalStyles.successMessage}
                style={{ margin: '20px 0 0', backgroundColor: '#fff' }}
              >
                <span className={globalStyles.successMessageText}>SUCCESS</span>
              </div>
              <span className="modal-redis-text">
                {currentSolution} was successfully deployed
              </span>
            </div>
          </div>
          <div className="modal-footer">
            <Link
              className="blue-btn depl-btn"
              data-toggle="modal"
              to={`/namespaces/${namespace.name}/deployments`}
            >
              Open Namespace
            </Link>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SelectNamespaceModal;
