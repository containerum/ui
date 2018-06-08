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
  isOpened: boolean,
  isFetchingAdd: boolean,
  handleInputEmailAdd: () => void,
  onHandleAdd: (idName: string) => void,
  handleOpenCloseModal: () => void,
  err: string
};

const AddGlobalUserMembershipModal = ({
  type,
  name,
  isOpened,
  isFetchingAdd,
  handleInputEmailAdd,
  handleOpenCloseModal,
  onHandleAdd,
  err
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
      handleCloseModal();
    }
  };
  const handleChangeNameOfType = e => {
    const inputValue = e.target.value.trim();
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
        <div className={`${modalStyles.modalBody} modal-body text-left`}>
          <h4
            className={`${modalStyles.modalTitle} ${
              globalStyles.marginBottom30
            } modal-title`}
            id="modalLabel"
          >
            {type}
          </h4>
          {type === 'Add User' && (
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
            onChange={e => handleChangeNameOfType(e)}
            style={{ marginBottom: '15px' }}
          />
        </div>

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
      </form>
    </Modal>
  );
};

export default AddGlobalUserMembershipModal;
