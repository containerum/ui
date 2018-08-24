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
  labelGroup: string,
  name: string,
  accessNewUsers: string,
  isOpened: boolean,
  isFetchingAdd: boolean,
  displayedUsersList: Array<Object>,
  handleInputEmailAdd: () => void,
  onHandleAdd: (idName: string, data: Object) => void,
  handleOpenCloseModal: () => void,
  choiceAccessNewUser: (access: string) => void,
  idGroup: string,
  newUsers: Array<Object>,
  handleAddNewUsers: (newUsers: Array<Object>) => void,
  handleDeleteNewUser: (username: string) => void,
  isEmailValid: boolean,
  err: string
};

const AddUserInGroupGlobalMembershipModal = ({
  type,
  labelGroup,
  name,
  isOpened,
  isFetchingAdd,
  accessNewUsers,
  newUsers,
  displayedUsersList,
  handleInputEmailAdd,
  handleOpenCloseModal,
  onHandleAdd,
  handleAddNewUsers,
  idGroup,
  err,
  handleDeleteNewUser,
  choiceAccessNewUser,
  isEmailValid
}: Props) => {
  const handleCloseModal = () => {
    handleOpenCloseModal();
  };
  const handleSubmitAddingEssence = e => {
    e.preventDefault();
    if (name) {
      const user = {
        username: name,
        access: accessNewUsers
      };
      newUsers.push(user);
    }
    if (newUsers.length) {
      onHandleAdd(idGroup, newUsers, labelGroup);
      handleOpenCloseModal();
    }
  };
  const handleChangeNameOfType = inputValue => {
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
        autoComplete="off"
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
          {err && (
            <div className={modalStyles.membershipAlert}>
              <div className={modalStyles.membershipAlertItem}>
                <img src={alert} alt="alert" />
              </div>
              <div>{err}</div>
            </div>
          )}
          <span className={modalStyles.modalRedisText}>User Email address</span>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="dropdown">
              <input
                type="email"
                placeholder="Email"
                style={{
                  marginBottom: '15px',
                  width: '325px',
                  textAlign: 'left'
                }}
                className={`${toggleClassName} ${
                  modalStyles.membershipSelect
                } form-control ${!isEmailValid &&
                  'form-control-notvalid'} volume-form-input btn form-control dropdown-toggle`}
                value={name}
                id="dropdownMenu2"
                onChange={e => handleChangeNameOfType(e.target.value)}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              />
              <div
                className={`${menuClassName} ${
                  modalStyles.membershipMenu
                } dropdown-menu form-control`}
                aria-labelledby="dropdownMenu2"
              >
                {displayedUsersList.length ? (
                  displayedUsersList.map(user => (
                    <button
                      key={user.login}
                      style={{ cursor: 'pointer' }}
                      className="dropdown-item"
                      type="button"
                      onClick={() => handleChangeNameOfType(user.login)}
                    >
                      {user.login}
                    </button>
                  ))
                ) : (
                  <button
                    style={{ cursor: 'pointer' }}
                    className="dropdown-item"
                    type="button"
                  >
                    No matches found
                  </button>
                )}
              </div>
            </div>
            <button
              type="button"
              className={`${
                buttonsStyles.buttonModalCancel
              } btn form-control volume-form-input`}
              onClick={() => handleAddNewUsers(newUsers)}
              style={{
                width: '45px',
                height: '37px',
                marginRight: '0',
                marginLeft: '5px',
                borderRadius: '.25rem'
              }}
            >
              +
            </button>
          </div>
          {newUsers.length > 0 && (
            <div style={{ minHeight: '40px' }}>
              {newUsers.map(user => (
                <span
                  className="badge badge-secondary"
                  style={{
                    color: 'fff',
                    backgroundColor: '#6c757d',
                    marginLeft: '3px',
                    padding: '6px 17px 7px 7px',
                    position: 'relative'
                  }}
                  key={user.username}
                >
                  {user.username}
                  <span
                    style={{
                      cursor: 'pointer',
                      position: 'absolute',
                      top: 0,
                      paddingTop: 6,
                      paddingRight: 2,
                      right: 0,
                      width: 15,
                      height: 24
                    }}
                    aria-hidden="true"
                    onClick={() => handleDeleteNewUser(user.username)}
                  >
                    ×
                  </span>
                </span>
              ))}
            </div>
          )}
          <span className={modalStyles.modalRedisText}>Users permission</span>

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
              {accessNewUsers}
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
              Read - user can only see all Project objects
            </div>
            <div className={modalStyles.modalRedisTextLight}>
              Write - user can fully manage all Project objects
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

export default AddUserInGroupGlobalMembershipModal;
