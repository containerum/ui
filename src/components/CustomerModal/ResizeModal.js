import React from 'react';
import Modal from 'react-modal';
import 'rc-tooltip/assets/bootstrap_white.css';
import className from 'classnames/bind';

import globalStyles from '../../theme/global.scss';
import modalStyles from './index.scss';
import createNamespaceStyles from '../../containers/CreateNamespace/index.scss';

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
  isOpened: boolean,
  onHandleResize: () => void,
  handleOpenCloseModal: () => void
};

const CreateModal = ({
  type,
  tariff,
  id,
  name,
  data,
  isOpened,
  handleOpenCloseModal,
  onHandleResize
}: Props) => {
  const handleCloseModal = () => {
    handleOpenCloseModal();
  };
  const handleSubmitCreatingEssence = e => {
    e.preventDefault();
    if (tariff && name) {
      handleOpenCloseModal();
      onHandleResize(name, id);
    }
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
            Resize {type}
          </h4>
          <div className="col-md-10 p-0">
            <div
              className={`${
                createNamespaceStyles.namespacePlanBlockContainer
              } ${globalStyles.hoverActionCreateModal}`}
            >
              <div className="row">
                <div
                  className={`col-md-6 ${containerLeft}`}
                  // className={
                  //   `$${data.price}` === '$1'
                  //     ? 'col-md-6 namespace-plan-block-container-left namespace-plan-block2dollars'
                  //     : 'col-md-6 namespace-plan-block-container-left'
                  // }
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
                        className={rightContent}
                        // className={
                        //   data.price === '$1'
                        //     ? 'content-block-content card-block card-block2dollars'
                        //     : 'content-block-content card-block'
                        // }
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
        </div>
        <div className={`${modalStyles.modalFooter} modal-footer`}>
          <button
            type="button"
            className="btn modal-footer-solution-cancel"
            onClick={() => handleCloseModal()}
          >
            Cancel
          </button>
          <button type="submit" className="btn modal-footer-solution-select">
            Resize
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateModal;
