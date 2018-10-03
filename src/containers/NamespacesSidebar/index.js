/* eslint-disable jsx-a11y/anchor-is-valid,no-useless-constructor,react/no-unused-prop-types */
import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import styles from './styles.scss';
import alertPng from '../../images/error-icon.svg';
import infoPng from '../../images/info-icon.svg';

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
    width: '460px',
    margin: 0,
    maxWidth: 'initial',
    backgroundColor: '#fff'
  }
};

type Props = {
  isSidebarOpen: boolean,
  handleCloseSidebar: () => void,
  eventsArray: any,
  namespacesArray: any
};

export class NamespacesSidebar extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  eventCounter = () => {
    let count = 0;
    this.props.eventsArray.forEach(event => {
      const time = new Date(event.event_time).toLocaleString().split(', ');
      if (time[0] === new Date().toLocaleString().split(', ')[0]) {
        count += 1;
      }
    });
    return count;
  };

  simplifyEventTime = eventObj => {
    const time = new Date(eventObj.event_time).toLocaleString().split(', ');
    if (time[0] === new Date().toLocaleString().split(', ')[0]) {
      return `today | ${time[1]}`;
    }
    return `${time[0]} | ${time[1]}`;
  };
  simplifyEventMessage = eventObj => {
    if (!eventObj.event_name) return '123';
    switch (eventObj.event_name) {
      case 'ResourceCreated':
        return (
          <span>
            Resource{' '}
            <a href="#" style={{ color: '#2fb4e6' }}>
              {eventObj.resource_name}
            </a>{' '}
            was created
          </span>
        );
      case 'ResourceModified':
        return (
          <span>
            Resource{' '}
            <a href="#" style={{ color: '#2fb4e6' }}>
              {eventObj.resource_name}
            </a>{' '}
            was modified
          </span>
        );
      case 'ResourceDeleted':
        return (
          <span>
            Resource{' '}
            <a href="#" style={{ color: '#2fb4e6' }}>
              {eventObj.resource_name}
            </a>{' '}
            was deleted
          </span>
        );
      default:
        return eventObj.message;
    }
  };
  // simplifyEventSource = evenObj => {
  //   const result = this.state.namespacesArray.find(
  //     namespace => namespace.id === evenObj.resource_namespace
  //   );
  //   return result.label;
  // };

  simplifyEventIcon = evenObj => {
    if (evenObj.event_kind === 'warning') {
      return (
        <img
          src={alertPng}
          className="col-2"
          alt="warning"
          style={{ height: '50px' }}
        />
      );
    }
    return (
      <img
        src={infoPng}
        className="col-2"
        alt="info"
        style={{ height: '50px' }}
      />
    );
  };

  renderEventElement = eventObj => {
    const underStyles = {
      maxHeight: '100px',
      borderBottom: '1px solid #eaeaea',
      color: '#333333',
      fontSize: '15px',
      fontWeight: '300'
    };
    return (
      <div style={underStyles} key={eventObj.id}>
        <div className="row  pt-2">
          {this.simplifyEventIcon(eventObj)}
          <p className="col-10 text-left">
            {this.simplifyEventMessage(eventObj)}
          </p>
        </div>
        <div className="row">
          <d className="col-2" />
          {/* <p className="col-6">Source: {this.simplifyEventSource(eventObj)}</p> */}
          <p className="col-6">Source: namespace</p>
          <p className="col-4">{this.simplifyEventTime(eventObj)}</p>
        </div>
      </div>
    );
  };

  render() {
    console.log(this.props);
    return (
      <Modal
        isOpen={this.props.isSidebarOpen}
        onRequestClose={this.props.handleCloseSidebar}
        style={customStyles}
        contentLabel="SideBar"
        ariaHideApp={false}
        className="modal-dialog"
      >
        <div className={styles.sidebarHeader}>
          <p className={styles.acivity}>ACTIVITY</p>
          <p className={styles.today}>
            <b>{this.eventCounter()}</b> today
          </p>
        </div>
        <div className={styles.sidebarBody}>
          {this.props.eventsArray.map(event => this.renderEventElement(event))}
        </div>
      </Modal>
    );
  }
}

export default NamespacesSidebar;
