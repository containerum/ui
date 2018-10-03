import React from 'react';
import Modal from 'react-modal';

import LoadButton from '../../components/LoadButton';
import alert from '../../images/alertAddUserMembership.svg';
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
    padding: '0',
    maxHeight: '590px'
  }
};

type Props = {
  type: string,
  name: string,
  newPassword: string,
  isOpened: boolean,
  isFetchingAdd: boolean,
  passwordResetView: boolean,
  handleInputEmailAdd: () => void,
  onHandleAdd: (idName: string) => void,
  handleOpenCloseModal: () => void,
  handleClickCopyPassword: () => void,
  err: string,
  newUser: boolean
};

const AddGlobalUserMembershipModal = ({
  type,
  name,
  newPassword,
  isOpened,
  isFetchingAdd,
  passwordResetView,
  handleInputEmailAdd,
  handleOpenCloseModal,
  handleClickCopyPassword,
  onHandleAdd,
  err,
  newUser
}: Props) => {
  const handleCloseModal = () => {
    handleOpenCloseModal();
  };
  const handleSubmitAddingEssence = e => {
    e.preventDefault();
    if (name.length >= 2) {
      const addData = {
        login: name
      };
      onHandleAdd(addData);
    }
  };
  const handleChangeNameOfType = e => {
    let inputValue = '';
    if (type !== 'Add User') {
      const regexp = /^[a-z][a-z0-9-]*$|^$/;
      if (e.target.value.search(regexp) !== -1) {
        inputValue = e.target.value;
      } else {
        inputValue = name;
      }
    } else {
      inputValue = e.target.value.trim();
    }
    handleInputEmailAdd(inputValue);
  };

  return (
    <Modal
      isOpen={isOpened}
      onRequestClose={() => handleCloseModal()}
      style={customStyles}
      contentLabel="Create"
      ariaHideApp={false}
      className={`${modalStyles.modalDialogCreate} modal-dialog`}
    >
      <form
        onSubmit={e => handleSubmitAddingEssence(e)}
        className={`${modalStyles.modalContent} modal-content`}
      >
        <div className={`${modalStyles.modalHeader} modal-header`}>
          <button
            type="button"
            className="close"
            onClick={() => handleCloseModal()}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        {passwordResetView ? (
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
              {newUser ? 'New' : 'Reset'} password
            </h4>
            <span
              className={modalStyles.modalRedisText}
              style={{ textAlign: 'center', display: 'block' }}
            >
              <span>
                New password for the{' '}
                <strong style={{ color: '#29abe2' }}>{name}</strong>
              </span>
            </span>
          </div>
        ) : (
          <div className={`${modalStyles.modalBody} modal-body text-left`}>
            <h4
              className={`${modalStyles.modalTitle} ${
                globalStyles.marginBottom30
              } modal-title`}
              id="modalLabel"
            >
              {type}
            </h4>
            {(type === 'Add User' || type === 'Add User in Group') && (
              <span className={modalStyles.modalRedisText}>
                Fill in the information below to add new user
              </span>
            )}
            {type === 'Add Group' && (
              <span className={modalStyles.modalRedisText}>
                Fill in the information below to add new group
              </span>
            )}
            {err ? (
              <div className={modalStyles.membershipAlert}>
                <div className={modalStyles.membershipAlertItem}>
                  <img src={alert} alt="alert" />
                </div>
                <div>{err}</div>
              </div>
            ) : (
              ''
            )}
            {type === 'Add User' && (
              <span className={modalStyles.modalRedisText}>
                User Email address
              </span>
            )}
            {type === 'Add Group' && (
              <span className={modalStyles.modalRedisText}>Group Name</span>
            )}
            <input
              type={type === 'Add User' ? 'email' : 'text'}
              className="form-control volume-form-input"
              placeholder={type === 'Add User' ? 'Email' : 'Group'}
              value={name}
              required
              onChange={e => handleChangeNameOfType(e)}
              style={{ marginBottom: '15px' }}
            />
          </div>
        )}

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
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>
            <LoadButton
              style={{
                height: '40px'
              }}
              type="submit"
              buttonText="Add"
              isFetching={isFetchingAdd}
              baseClassButton={`${buttonsStyles.buttonModalSelect} btn`}
            />
          </div>
        )}
      </form>
    </Modal>
  );
};

export default AddGlobalUserMembershipModal;
