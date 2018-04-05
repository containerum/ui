import React from 'react';
import Modal from 'react-modal';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

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
  tariff: string,
  id: string,
  name: string,
  data: Object,
  // typeModal: string,
  // name: string,
  isOpened: boolean,
  handleInputName: () => void,
  onHandleCreate: () => void,
  handleOpenCloseModal: () => void
};

const CreateModal = ({
  type,
  tariff,
  id,
  name,
  data,
  isOpened,
  handleInputName,
  handleOpenCloseModal,
  onHandleCreate
}: Props) => {
  const regexp = /^[a-z][a-z0-9-]*$|^$/;
  const handleCloseModal = () => {
    handleOpenCloseModal();
  };
  const handleSubmitCreatingEssence = e => {
    e.preventDefault();
    if (tariff && name.length >= 2 && name.search(regexp) !== -1) {
      handleOpenCloseModal();
      onHandleCreate(name, id, data.price);
    }
  };
  const handleChangeNameOfType = e => {
    const inputValue = e.target.value.trim();
    handleInputName(inputValue);
  };

  const styleSubmit =
    name.length >= 2 && name.search(regexp) !== -1
      ? 'btn modal-footer-solution-select'
      : 'btn modal-footer-solution-select modal-footer-volume-delete';
  const isDisabledSubmit = name.length >= 2 && name.search(regexp) !== -1;
  const isErrorInputClass =
    name.search(regexp) !== -1
      ? 'form-control volume-form-input'
      : 'form-control form-control-danger volume-form-input';
  const isErrorTooltipClass = name.search(regexp) === -1;
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
        onSubmit={e => handleSubmitCreatingEssence(e)}
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
            New {type}
          </h4>
          <div className="col-md-10 p-0">
            <div className="namespace-plan-block-container hover-action-new hover-always-new">
              <div className="row">
                <div
                  className={
                    `$${data.price}` === '$1'
                      ? 'col-md-6 namespace-plan-block-container-left namespace-plan-block2dollars'
                      : 'col-md-6 namespace-plan-block-container-left'
                  }
                >
                  <div className="namespace-plan-block-price">
                    ${data.price}
                    <span className="namespace-plan-span-price">/mo</span>
                  </div>
                  <div className="namespace-plan-block-month">
                    {data.pricePerDay}
                  </div>
                </div>
                {data.memory &&
                  data.cpu && (
                    <div className="col-md-6 namespace-plan-block-container-right">
                      <div
                        className={
                          data.price === '$1'
                            ? 'content-block-content card-block card-block2dollars'
                            : 'content-block-content card-block'
                        }
                      >
                        <div className="content-block__info-item ">
                          <div className="content-block__info-name inline">
                            RAM :{' '}
                          </div>
                          <div className="content-block__info-text inline">
                            {data.memory} GB
                          </div>
                        </div>
                        <div className="content-block__info-item">
                          <div className="content-block__info-name inline">
                            CPU :{' '}
                          </div>
                          <div className="content-block__info-text inline">
                            {data.cpu}
                          </div>
                        </div>
                        {data.volume && (
                          <div className="content-block__info-item">
                            <div className="content-block__info-name inline">
                              Volume :{' '}
                            </div>
                            <div className="content-block__info-text inline">
                              {data.volume} GB
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                {data.storageLimit && (
                  <div className="col-md-6 volume-plan-container-right">
                    <div className="hard-drive-size">
                      {data.storageLimit} GB
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <span className="modal-redis-text mt-4">
            Please, enter the name to continue
          </span>
          <Tooltip
            placement="top"
            visible
            overlay={<span>Invalid {type} name</span>}
            overlayClassName={isErrorTooltipClass ? '' : 'display-none'}
          >
            <input
              type="text"
              className={isErrorInputClass}
              placeholder="Name"
              value={name}
              onChange={e => handleChangeNameOfType(e)}
              maxLength={35}
            />
          </Tooltip>
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
            disabled={!isDisabledSubmit}
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateModal;
