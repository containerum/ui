import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import { routerLinks } from '../../config';
import SideBarGetStartedContainer from '../../containers/SideBarGetStarted';
import arrowLeft from '../../images/arrow-left.svg';
import icShare from '../../images/ic-share.svg';
import styles from './index.scss';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    overflowY: 'auto'
  },
  content: {
    position: 'absolute',
    top: '0',
    right: '0',
    border: 'none',
    WebkitOverflowScrolling: 'touch',
    borderRadius: 'none',
    outline: 'none',
    padding: '0',
    minHeight: '100vh',
    width: '70%',
    margin: 0,
    maxWidth: 'initial',
    backgroundColor: '#fff'
  }
};

type Props = {
  isOpenedSideBarGetStarted: boolean,
  handleOpenCloseSidebar: () => void,
  handleClickDontShow: () => void
};

const SideBarGetStartedModal = ({
  isOpenedSideBarGetStarted,
  handleOpenCloseSidebar,
  handleClickDontShow
}: Props) => (
  <Modal
    isOpen={isOpenedSideBarGetStarted}
    onRequestClose={handleOpenCloseSidebar}
    style={customStyles}
    contentLabel="SideBar"
    ariaHideApp={false}
    className="modal-dialog"
  >
    <div
      className="modal-content"
      style={{ borderRadius: 0 }}
      id="SideBarGetStartedModal"
    >
      <div style={{ height: 60, borderBottom: '1px solid #eaeaea' }}>
        <div style={{ padding: '19px 30px' }}>
          <div
            className={styles.WrapperBackWebPanel}
            onClick={handleOpenCloseSidebar}
          >
            <img
              src={arrowLeft}
              alt="arrowLeft"
              style={{
                marginRight: 10,
                marginBottom: 3
              }}
            />
            <span className={styles.BackWebPanel}>Back to Web Panel</span>
          </div>
          <Link to={routerLinks.getStarted} className={styles.OpenNewWindow}>
            Open article in a new window{' '}
            <img src={icShare} style={{ marginLeft: 10 }} alt="icShare" />
          </Link>
        </div>
      </div>
      <SideBarGetStartedContainer handleClickDontShow={handleClickDontShow} />
    </div>
  </Modal>
);

export default SideBarGetStartedModal;
