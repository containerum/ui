import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
// import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import _ from 'lodash/fp';
import className from 'classnames/bind';

import LoadButton from '../LoadButton';
import InputControl from '../../components/InputControl';
import globalStyles from '../../theme/global.scss';
import buttonsStyles from '../../theme/buttons.scss';
import modalStyles from './index.scss';
import { routerLinks } from '../../config';

const globalClass = className.bind(globalStyles);

const selectClassName = globalClass('formControl', 'selectCustomModal');

type Props = {
  dataServices: Array<Object>,
  selectedService: Object,
  currentPort: Object,
  portsList: Array<Object>,
  isOpened: boolean,
  handleInputDomainName: () => void,
  customDomainName: string,
  handleChangeSelectService: () => void,
  handleSubmitRequestCustomDomain: (e: Object) => void,
  handleChangeSelectPort: (value: string) => void,
  handleOpenCloseModal: () => void,
  isLoading: boolean,
  statusDomainRequest: boolean
};

const RequestCustomDomainModal = ({
  dataServices,
  selectedService,
  currentPort,
  portsList,
  isOpened,
  handleInputDomainName,
  customDomainName,
  handleChangeSelectService,
  handleSubmitRequestCustomDomain,
  handleChangeSelectPort,
  handleOpenCloseModal,
  isLoading,
  statusDomainRequest
}: Props) => {
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
      padding: '0'
    }
  };

  return (
    <Modal
      isOpen={isOpened}
      onRequestClose={handleOpenCloseModal}
      style={customStyles}
      contentLabel="Create"
      ariaHideApp={false}
      className={`${modalStyles.modalDialogCreate} modal-dialog`}
    >
      <form
        onSubmit={e => handleSubmitRequestCustomDomain(e)}
        className={`${modalStyles.modalContent} modal-content`}
      >
        <div className={`${modalStyles.modalHeader} modal-header`}>
          <button
            type="button"
            className="close"
            onClick={handleOpenCloseModal}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        {statusDomainRequest === 'success' && (
          <div>
            <div className={`${modalStyles.modalBody} modal-body text-left`}>
              <h4
                className={`${modalStyles.modalTitle} ${
                  globalStyles.marginBottom30
                } modal-title`}
                id="modalLabel"
                style={{ marginBottom: 15, lineHeight: '25px' }}
              >
                Request custom domain connection
              </h4>
              <div
                className={`${globalStyles.formGroup} form-group`}
                style={{ paddingTop: 0, marginTop: 70 }}
              >
                <div
                  className={globalStyles.successMessageText}
                  style={{
                    color: '#333',
                    textTransform: 'uppercase',
                    display: 'inline-block',
                    marginLeft: '45%',
                    marginBottom: 30
                  }}
                >
                  Success
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#333',
                    fontWeight: 300
                  }}
                >
                  Your Request was successfully sent <br />
                  <br />
                  Confirmation of domain connection you will receive by mail
                </div>
              </div>
            </div>
            <div className={`${modalStyles.modalFooter} modal-footer`}>
              <Link
                to={routerLinks.dashboard}
                className={`${buttonsStyles.buttonModalCancel} btn`}
                style={{ width: '50%' }}
              >
                Open Dashboard
              </Link>
            </div>
          </div>
        )}
        {statusDomainRequest !== 'success' && (
          <div>
            <div className={`${modalStyles.modalBody} modal-body text-left`}>
              <h4
                className={`${modalStyles.modalTitle} ${
                  globalStyles.marginBottom30
                } modal-title`}
                id="modalLabel"
                style={{ marginBottom: 15, lineHeight: '25px' }}
              >
                Request custom domain connection
              </h4>
              {statusDomainRequest && (
                <div
                  className={globalStyles.errorMessage}
                  style={{ marginBottom: 15 }}
                >
                  <span className={globalStyles.errorMessageText}>
                    {statusDomainRequest}
                  </span>
                </div>
              )}
              <div
                className={`${globalStyles.formGroup} form-group`}
                style={{ paddingTop: 0 }}
              >
                <label
                  htmlFor="countriesSelect"
                  className={`${modalStyles.modalRedisText} mt-1`}
                >
                  Choose Service
                </label>
                <select
                  className={`${selectClassName} form-control custom-select`}
                  style={{ paddingTop: 3 }}
                  id="countriesSelect"
                  name="countries"
                  onChange={e => handleChangeSelectService(e.target.value)}
                  value={selectedService && selectedService.name}
                  required
                >
                  {dataServices.map(countryObject => (
                    <option key={_.uniqueId()} value={countryObject.name}>
                      {countryObject.name}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className={`${globalStyles.formGroup} form-group`}
                style={{ paddingTop: 0 }}
              >
                <label
                  htmlFor="countriesSelect"
                  className={`${modalStyles.modalRedisText} mt-1`}
                >
                  Choose Target Port
                </label>
                <select
                  className={`${selectClassName} form-control custom-select`}
                  style={{ paddingTop: 3 }}
                  id="countriesSelect"
                  name="countries"
                  value={currentPort && currentPort.port}
                  onChange={e => handleChangeSelectPort(e.target.value)}
                  required
                >
                  {portsList.map(
                    port =>
                      port.protocol === 'TCP' && (
                        <option key={port.port} value={port.port}>
                          {port.port}
                        </option>
                      )
                  )}
                </select>
              </div>
              <div
                className={`${globalStyles.formGroup} form-group ${
                  globalStyles.customDomainNameWrapper
                }`}
                style={{ paddingTop: 0, margin: 0 }}
              >
                <label
                  htmlFor="customDomainName"
                  className={`${modalStyles.modalRedisText} mt-2`}
                >
                  Type target Domain name
                </label>
                <InputControl
                  id="customDomainName"
                  type="text"
                  placeholder="example.com"
                  pattern="[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|^$"
                  baseClassName="form-control volume-form-input"
                  value={customDomainName}
                  required
                  handleChangeInput={e =>
                    handleInputDomainName(e.target.value, 'customDomainName')
                  }
                />
              </div>
            </div>
            <div className={`${modalStyles.modalFooter} modal-footer`}>
              <button
                type="button"
                className={`${buttonsStyles.buttonModalCancel} btn`}
                onClick={handleOpenCloseModal}
              >
                Cancel
              </button>
              <LoadButton
                type="submit"
                buttonText="Send Request"
                isFetching={isLoading}
                baseClassButton={`${buttonsStyles.buttonModalSelect} btn`}
              />
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default RequestCustomDomainModal;
