import React from 'react';
import Modal from 'react-modal';

import buttonsStyles from '../../theme/buttons.scss';

import infoHideSideBar from '../../images/infoHideSideBar.png';
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
    // maxHeight: '450px'
  }
};

type Props = {
  isOpened: boolean,
  onHandleHide: (name: string) => void,
  handleOpenCloseHideWidgetModal: () => void
};

const HideWidgetModal = ({
  isOpened,
  handleOpenCloseHideWidgetModal,
  onHandleHide
}: Props) => {
  const handleSubmitHideWidget = e => {
    e.preventDefault();
    onHandleHide();
  };
  return (
    <Modal
      isOpen={isOpened}
      onRequestClose={handleOpenCloseHideWidgetModal}
      style={customStyles}
      contentLabel="Create"
      ariaHideApp={false}
      className={`${modalStyles.modalDialogCreate} modal-dialog`}
    >
      <form
        onSubmit={e => handleSubmitHideWidget(e)}
        className={`${modalStyles.modalContent} modal-content`}
      >
        <div className={`${modalStyles.modalHeader} modal-header`}>
          <button
            type="button"
            className="close"
            onClick={handleOpenCloseHideWidgetModal}
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
            Hide Widget
          </h4>
          <img
            src={infoHideSideBar}
            alt="infoHideSideBar"
            style={{ width: '100%' }}
          />
          <div style={{ textAlign: 'center', marginTop: 30 }}>
            <span className={modalStyles.modalRedisText}>
              You can always find the tutorial on Dashboard
            </span>
          </div>
        </div>
        <div className={`${modalStyles.modalFooter} modal-footer`}>
          <button
            type="button"
            className={`${buttonsStyles.buttonModalCancel} btn`}
            onClick={handleOpenCloseHideWidgetModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`${
              buttonsStyles.buttonUICreate
            } btn btn-outline-primary`}
            style={{ height: 40 }}
          >
            Hide widget
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default HideWidgetModal;
