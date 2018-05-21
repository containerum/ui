import React from 'react';
import Modal from 'react-modal';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import className from 'classnames/bind';

import globalStyles from '../../theme/global.scss';
import modalStyles from './index.scss';
import createNamespaceStyles from '../../containers/CreateNamespace/index.scss';

import buttonsStyles from '../../theme/buttons.scss';

const createNamespaceClass = className.bind(createNamespaceStyles);
const globalClass = className.bind(globalStyles);

const rightContent = globalClass(
  'contentBlockContent',
  'contentBlockContentCardBlock',
  'contentBlockContentCardBlockDollars'
);
const containerLeft = createNamespaceClass(
  'namespacePlanBlockContainerLeft',
  'namespacePlanBlockDollars'
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
      ? `${buttonsStyles.buttonModalSelect} btn`
      : `${buttonsStyles.buttonModalAction} btn`;
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
      className={`${modalStyles.modalDialogCreate} modal-dialog`}
    >
      <form
        onSubmit={e => handleSubmitCreatingEssence(e)}
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
            New {type}
          </h4>
          <div className="col-md-10 p-0">
            <div
              className={`${
                createNamespaceStyles.namespacePlanBlockContainer
              } ${globalStyles.hoverActionCreateModal}`}
            >
              <div className="row">
                <div
                  // className={
                  //   `$${data.price}` === '$1'
                  //     ? 'col-md-6 namespace-plan-block-container-left namespace-plan-block2dollars'
                  //     : 'col-md-6 namespace-plan-block-container-left'
                  // }
                  className={`col-md-6 ${containerLeft}`}
                >
                  <div
                    className={createNamespaceStyles.namespacePlanBlockPrice}
                  >
                    ${data.price}
                    <span
                      className={createNamespaceStyles.namespacePlanSpanPrice}
                    >
                      /mo
                    </span>
                  </div>
                  <div
                    className={createNamespaceStyles.namespacePlanBlockMonth}
                  >
                    {data.pricePerDay}
                  </div>
                </div>
                {data.memory &&
                  data.cpu && (
                    <div
                      className={`col-md-6 ${
                        createNamespaceStyles.namespacePlanBlockContainerRight
                      }`}
                    >
                      <div
                        // className={
                        //   data.price === '$1'
                        //     ? 'content-block-content card-block card-block2dollars'
                        //     : 'content-block-content card-block'
                        // }
                        className={rightContent}
                      >
                        <div className={globalStyles.contentBlockInfoItem}>
                          <div
                            className={`${
                              globalStyles.contentBlockInfoName
                            } inline`}
                          >
                            RAM :{' '}
                          </div>
                          <div
                            className={`${
                              globalStyles.contentBlockInfoText
                            } inline`}
                          >
                            {data.memory} GB
                          </div>
                        </div>
                        <div className={globalStyles.contentBlockInfoItem}>
                          <div
                            className={`${
                              globalStyles.contentBlockInfoName
                            } inline`}
                          >
                            CPU :{' '}
                          </div>
                          <div
                            className={`${
                              globalStyles.contentBlockInfoText
                            } inline`}
                          >
                            {data.cpu}
                          </div>
                        </div>
                        {data.volume && (
                          <div className={globalStyles.contentBlockInfoItem}>
                            <div
                              className={`${
                                globalStyles.contentBlockInfoName
                              } inline`}
                            >
                              Volume :{' '}
                            </div>
                            <div
                              className={`${
                                globalStyles.contentBlockInfoText
                              } inline`}
                            >
                              {data.volume} GB
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                {data.storageLimit && (
                  <div
                    className={`col-md-6 ${
                      createNamespaceStyles.namespacePlanBlockContainerRight
                    }`}
                  >
                    <div>{data.storageLimit} GB</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <span className={`${modalStyles.modalRedisText} mt-4`}>
            Please, enter the name to continue
          </span>
          <Tooltip
            placement="top"
            visible
            overlay={<span>Invalid {type} name</span>}
            overlayClassName={isErrorTooltipClass ? '' : 'rc-tooltip-hidden'}
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
        <div className={`${modalStyles.modalFooter} modal-footer`}>
          <button
            type="button"
            className={`${buttonsStyles.buttonModalCancel} btn`}
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
