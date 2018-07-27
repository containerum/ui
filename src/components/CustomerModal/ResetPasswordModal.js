import React from 'react';
import Modal from 'react-modal';

import buttonsStyles from '../../theme/buttons.scss';

import modalStyles from './index.scss';
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
    padding: '0'
  }
};

type Props = {
  isUser: string,
  isOpened: boolean,
  passwordResetView: boolean,
  newPassword: string,
  onHandleResetPassword: () => void,
  handleOpenCloseModal: () => void,
  handleClickCopyPassword: () => void
};

const ResetPasswordModal = ({
  isUser,
  isOpened,
  passwordResetView,
  newPassword,
  handleOpenCloseModal,
  onHandleResetPassword,
  handleClickCopyPassword
}: Props) => {
  const handleSubmitDeletingEssence = e => {
    e.preventDefault();
    onHandleResetPassword();
  };
  return (
    <Modal
      isOpen={isOpened}
      onRequestClose={() => handleOpenCloseModal()}
      style={customStyles}
      contentLabel="Reset"
      ariaHideApp={false}
      className={`${modalStyles.modalDialogCreate} modal-dialog`}
    >
      <form
        onSubmit={e => handleSubmitDeletingEssence(e)}
        className={`${modalStyles.modalContent} modal-content`}
      >
        <div className={`${modalStyles.modalHeader} modal-header`}>
          <button
            type="button"
            className="close"
            onClick={() => handleOpenCloseModal()}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className={`${modalStyles.modalBody} modal-body text-left`}>
          <h4
            className={`${modalStyles.modalTitle} ${
              globalStyles.marginBottom30
            } modal-title`}
            style={{
              textAlign: 'center',
              marginTop: 20
            }}
          >
            Reset password
          </h4>
          <span
            className={modalStyles.modalRedisText}
            style={{ textAlign: 'center', display: 'block' }}
          >
            {passwordResetView ? (
              <span>
                New password for the{' '}
                <strong style={{ color: '#29abe2' }}>{isUser}</strong>
              </span>
            ) : (
              <span>
                Are you ready want to reset password for the{' '}
                <strong style={{ color: '#29abe2' }}>{isUser}</strong>?
              </span>
            )}
          </span>
        </div>
        {passwordResetView ? (
          <div className={`${modalStyles.modalFooter} modal-footer`}>
            <div
              style={{
                width: 350,
                height: 40,
                borderRadius: 2,
                backgroundColor: '#eaeaea',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <input
                type="text"
                id="newPassword"
                value={newPassword}
                onChange={() => console.log()}
                style={{
                  display: 'inline-block',
                  width: 95,
                  color: '#29abe2',
                  marginTop: 7,
                  backgroundColor: 'transparent',
                  border: 'none'
                }}
              />
              <i
                className="material-icons"
                style={{
                  position: 'absolute',
                  top: 7,
                  right: 10,
                  color: '#29abe2',
                  cursor: 'pointer'
                }}
                onClick={() => handleClickCopyPassword()}
              >
                file_copy
              </i>
            </div>
          </div>
        ) : (
          <div className={`${modalStyles.modalFooter} modal-footer`}>
            <button
              type="button"
              className={`${buttonsStyles.buttonModalCancel} btn`}
              onClick={() => handleOpenCloseModal()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${buttonsStyles.buttonModalSelect} btn`}
            >
              Reset Password
            </button>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default ResetPasswordModal;
