import React from 'react';
import Modal from 'react-modal';
import className from 'classnames/bind';

import LoadButton from '../../components/LoadButton';
import alert from '../../images/alertAddUserMembership.svg';
import buttonsStyles from '../../theme/buttons.scss';

import modalStyles from './index.scss';
import globalStyles from '../../theme/global.scss';

const globalClass = className.bind(globalStyles);

const menuClassName = globalClass(
  'dropdownMenu',
  'formControl',
  'formInputVolume'
);

const toggleClassName = globalClass(
  'dropdownToggle',
  'formControl',
  'formInputVolume',
  'dropdownList'
);

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
  accessNewUser: string,
  isOpened: boolean,
  isFetchingAdd: boolean,
  handleInputEmailAdd: () => void,
  onHandleAdd: (idName: string, data: Object) => void,
  handleOpenCloseModal: () => void,
  choiceAccessNewUser: (access: string) => void,
  namespaceId: string,
  err: string
};

const AddUserMembershipModal = ({
  type,
  name,
  isOpened,
  isFetchingAdd,
  accessNewUser,
  handleInputEmailAdd,
  handleOpenCloseModal,
  onHandleAdd,
  namespaceId,
  err,
  choiceAccessNewUser
}: Props) => {
  const handleCloseModal = () => {
    handleOpenCloseModal();
  };
  const handleSubmitAddingEssence = e => {
    e.preventDefault();
    if (name.length >= 2) {
      const addData = {
        username: name,
        access: accessNewUser
      };
      onHandleAdd(namespaceId, addData);
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
          <span className={modalStyles.modalRedisText}>
            Fill in the information below to add new user
          </span>
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
          <span className={modalStyles.modalRedisText}>User Email address</span>
          <input
            type="email"
            className="form-control volume-form-input"
            placeholder="Email"
            value={name}
            onChange={e => handleChangeNameOfType(e)}
            style={{ marginBottom: '15px' }}
          />
          <span className={modalStyles.modalRedisText}>User permission</span>

          <div className="dropdown">
            <button
              className={`${toggleClassName} ${
                modalStyles.membershipSelect
              } btn form-control dropdown-toggle`}
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {accessNewUser}
            </button>
            <div
              className={`${menuClassName} ${
                modalStyles.membershipMenu
              } dropdown-menu form-control`}
              aria-labelledby="dropdownMenu2"
            >
              <button
                style={{ cursor: 'pointer' }}
                className="dropdown-item"
                type="button"
                onClick={() => choiceAccessNewUser('read')}
              >
                Read
              </button>
              <button
                style={{ cursor: 'pointer' }}
                className="dropdown-item"
                type="button"
                onClick={() => choiceAccessNewUser('write')}
              >
                Write
              </button>
            </div>
            <div
              className={modalStyles.modalRedisTextLight}
              style={{ marginTop: 5 }}
            >
              Read - user can only see all Namespace objects
            </div>
            <div className={modalStyles.modalRedisTextLight}>
              Write - user can fully manage all Namespace objects
            </div>
          </div>
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

export default AddUserMembershipModal;
