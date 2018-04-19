import React from 'react';
import Modal from 'react-modal';

import LoadButton from '../../components/LoadButton';
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
          {err ? (
            <div className="membership-add-user-alert">
              <div className="membership-add-user-alert-item">
                <img src={alert} alt="alert" />
              </div>
              <div>{err}</div>
            </div>
          ) : (
            ''
          )}
          <span className="modal-redis-text">User Email address</span>
          <input
            type="email"
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
                onClick={() => choiceAccessNewUser('read')}
              >
                Read
              </button>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => choiceAccessNewUser('write')}
              >
                Write
              </button>
            </div>
            <div className="modal-redis-text_ligth" style={{ marginTop: 5 }}>
              Read - user can only see all Namespace objects
            </div>
            <div className="modal-redis-text_ligth">
              Write - user can fully manage all Namespace objects
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
          <LoadButton
            style={{
              width: '200px',
              height: '40px'
            }}
            type="submit"
            buttonText="Create"
            isFetching={isFetchingAdd}
            baseClassButton="btn modal-footer-solution-select"
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddUserMembershipModal;
