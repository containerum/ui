import React from 'react';
import Modal from 'react-modal';

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
    maxHeight: '450px'
  }
};

type Props = {
  type: string,
  name: string,
  typeName: string,
  isOpened: boolean,
  handleInputName: () => void,
  onHandleDelete: (name: string) => void,
  handleOpenCloseModal: () => void
};

const DeleteModal = ({
  type,
  name,
  typeName,
  isOpened,
  handleInputName,
  handleOpenCloseModal,
  onHandleDelete
}: Props) => {
  const handleCloseModal = () => {
    handleOpenCloseModal();
  };
  const handleSubmitDeletingEssence = e => {
    e.preventDefault();
    if (name.length >= 2) {
      handleOpenCloseModal();
      onHandleDelete(name);
    }
  };
  const handleChangeNameOfType = e => {
    const inputValue = e.target.value.trim();
    handleInputName(inputValue);
  };

  const styleSubmit =
    name === typeName
      ? 'btn modal-footer-solution-select'
      : 'btn modal-footer-solution-select modal-footer-volume-delete';
  const isDisabledSubmit = name !== typeName;
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
        onSubmit={e => handleSubmitDeletingEssence(e)}
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
          >
            {type}
          </h4>
          <span className={modalStyles.modalRedisText}>
            Deleting your {type} is irreversible.<br />
            Enter your {type} name (<strong style={{ color: '#29abe2' }}>
              {typeName}
            </strong>) below to confirm you want to permanently delete it:
          </span>
          <input
            type="text"
            className="form-control volume-form-input"
            placeholder="Name"
            value={name}
            onChange={e => handleChangeNameOfType(e)}
          />
        </div>
        <div className={`${modalStyles.modalFooter} modal-footer`}>
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
          >
            Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteModal;
