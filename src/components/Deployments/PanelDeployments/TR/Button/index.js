import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import setDeploymentId from '../../../../../index';
import axios from 'axios';

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height                : '200px'
  }
};
class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {  modalIsOpen: false};
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.alertDelete = this.alertDelete.bind(this);
    this.alertClose = this.alertClose.bind(this);

  }
  openModal() {
    this.setState({modalIsOpen: true})
  }
  afterOpenModal() {
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  alertDelete() {
    var get = document.getElementById('alert');
    axios({method: 'delete', url: 'http://139.59.146.89/api/deployments/', data: {id: this.props.data.id}});
    this.closeModal();
    get.style.visibility = 'visible';
  }
  alertClose() {
    var get = document.getElementById('alert');
    get.style.visibility = 'hidden';
  }
  render() {
        return (
          <div className='dropdown'>
            <button onClick={setDeploymentId} data-id={this.props.data_id} className='btn btn-default dropdown-toggle' type='button' id='dropdownMenu1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>
              Action
              <span className='caret'></span>
            </button>
            <ul className='dropdown-menu' aria-labelledby='dropdownMenu1'>
              <li onClick={this.openModal}><a><p className='text-danger'>Delete</p></a></li>
            </ul>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel='Example Modal'
            >
              <h2 ref='subtitle'>Do You realy want to Delete[]?</h2>
              <button className='btn btn-danger modalbutton' onClick={this.alertDelete}>Delete</button>
              <button className='btn btn-default modalbutton' onClick={this.closeModal}>Close</button>
            </Modal>
            <div id='alert'><div className='remove' onClick={this.alertClose}><span className='glyphicon glyphicon-remove' aria-hidden='true'></span></div><h4>[Object_name] has been successfully deleted</h4></div>
          </div>

        );
   }
}
function mapStateToProps(state) {
  return {
    data: state.dataDeployment
  }
}

export default connect(mapStateToProps)(Button)
