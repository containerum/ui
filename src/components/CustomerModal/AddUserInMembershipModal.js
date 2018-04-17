import React from 'react';
import Modal from 'react-modal';
import alert from '../../images/alertAddUserMembership.svg';

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
  handleInputEmailAdd: () => void,
  onHandleAdd: (name: string) => void,
  handleOpenCloseModal: () => void,
  choiceAccessNewUserRead: () => void,
  choiceAccessNewUserWrite: () => void,
  addUserAccess: (idName: string, data: Object) => void,
  namespaceId: string
};

const AddUserMembershipModal = ({
  type,
  name,
  isOpened,
  accessNewUser,
  addUserAccess,
  handleInputEmailAdd,
  handleOpenCloseModal,
  onHandleAdd,
  namespaceId,
  choiceAccessNewUserRead,
  choiceAccessNewUserWrite
}: Props) => {
  const viewAlert = true;
  const handleCloseModal = () => {
    handleOpenCloseModal();
  };
  const handleSubmitAddingEssence = e => {
    e.preventDefault();
    if (name.length >= 2) {
      handleOpenCloseModal();
      onHandleAdd(name);
    }
  };
  const handleChangeNameOfType = e => {
    const inputValue = e.target.value.trim();
    handleInputEmailAdd(inputValue);
  };

  const styleSubmit = 'btn modal-footer-solution-select';
  const isDisabledSubmit = false;
  const addData = {
    username: name,
    access: accessNewUser
  };
  return (
    <Modal
      isOpen={isOpened}
      onRequestClose={() => handleCloseModal()}
      style={customStyles}
      contentLabel="Create"
      ariaHideApp={false}
      className="modal-dialog modal-dialog2 modal-dialog-create"
    >
      <form
        onSubmit={e => handleSubmitAddingEssence(e)}
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
          <h4 className="modal-title modal-title-volume" id="modalLabel">
            {type}
          </h4>
          <span className="modal-redis-text">
            Fill in the information below to add new user
          </span>
          {viewAlert ? (
            <div className="membership-add-user-alert">
              <div className="membership-add-user-alert-item">
                <img src={alert} alt="alert" />
              </div>
              <div>
                This user does not exist. User must be registered on the
                Containerum platform.
              </div>
            </div>
          ) : (
            ''
          )}
          <span className="modal-redis-text">User Email adress</span>
          <input
            type="text"
            className="form-control volume-form-input"
            placeholder="Email"
            value={name}
            onChange={e => handleChangeNameOfType(e)}
            style={{ marginBottom: '15px' }}
          />
          <span className="modal-redis-text">User permission</span>

          <div className="dropdown">
            <button
              className="btn form-control dropdown-list volume-form-input dropdown-toggle"
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {accessNewUser}
            </button>
            <div
              className="dropdown-menu form-control volume-form-input"
              aria-labelledby="dropdownMenu2"
            >
              <button
                className="dropdown-item"
                type="button"
                onClick={choiceAccessNewUserRead}
              >
                read
              </button>
              <button
                className="dropdown-item"
                type="button"
                onClick={choiceAccessNewUserWrite}
              >
                write
              </button>
            </div>
            <div className="modal-redis-text_ligth">
              Read - user can fully manage all Namespace objects
            </div>
            <div className="modal-redis-text_ligth">
              Write - user can only see all Namespace objects
            </div>
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
          <button
            type="submit"
            className={styleSubmit}
            disabled={isDisabledSubmit}
            onClick={() => addUserAccess(namespaceId, addData)}
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUserMembershipModal;
