import React, { Component } from 'react';
import Modal from 'react-modal';

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
    height                : '550px'
  }
};
var data_user = [
  {
    _id: '1',
    fullname: 'Богдан Иванов',
    email: 'example@gmail.com',
    password: '2342324',
    phonenumber: '7904304430',
    yourcompany: 'HelloWorld',
    youradress: 'street'
  }

];
export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {  modalIsOpen: false,
      name: '1', edit: null, data: data_user};
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }
  afterOpenModal() {
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  toggleEdit( itemId ) {
    this.setState( { edit: itemId } );
  }
  stateEdit(update) {
   for(var i = 0; i < data_user.length; i++) {
     if(data_user[i]._id == update._id) {
       var d = data_user.indexOf(data_user[i]);
       data_user.splice(d, 1, update);
  }
  }
   this.setState({data : data_user });
  }
  handleUserDataUpdate( update ) {
   this.stateEdit(update);
   this.setState({edit: null, modalIsOpen: false});

  }
  handleEditField( event ) {
    if ( event.keyCode === 13 ) {
      let target = event.target, update = {};
      update._id = this.state.edit;
      update[ target.name ] = target.value;
      this.handleUserDataUpdate( update );
    }
  }
  handleEditItem() {
    let itemId = this.state.edit;
    this.handleUserDataUpdate({
      _id: itemId,
      fullname: this.refs[ `fullname_${ itemId }` ].value,
      email: this.refs[ `email_${ itemId }` ].value,
      password: this.refs[ `password_${ itemId }` ].value,
      phonenumber: this.refs[ `phonenumber_${ itemId }` ].value,
      yourcompany: this.refs[ `yourcompany_${ itemId }` ].value,
      youradress: this.refs[ `youradress_${ itemId }` ].value
    });
  }
  renderField( item ) {
       return (<ul onClick={ this.toggleEdit.bind( this, item._id ) } key={ `editing-${ item._id }` }>
             <li className='rowinput'>
               <input
                 onKeyDown={ this.handleEditField }
                 type='text'
                 className='form-control'
                 ref={ `fullname_${ item._id }` }
                 name='fullname'
                 defaultValue={ item.fullname }
                 aria-describedby='sizing-addon1'/>
               </li>
               <li className='rowinput'>
                 <input
                   onKeyDown={ this.handleEditField }
                   type='text'
                   className='form-control'
                   ref={ `email_${ item._id }` }
                   name='email'
                   defaultValue={ item.email }
                   aria-describedby='sizing-addon1'/>
               </li>
               <li className='rowinput'>
                 <input
                   onKeyDown={ this.handleEditField }
                   type='text'
                   className='form-control'
                   ref={ `password_${ item._id }` }
                   name='password'
                   defaultValue={ item.password }
                   aria-describedby='sizing-addon1'/>
               </li>
               <li className='rowinput'>
                 <input
                   onKeyDown={ this.handleEditField }
                   type='text'
                   className='form-control'
                   ref={ `phonenumber_${ item._id }` }
                   name='phonenumber'
                   defaultValue={ item.phonenumber }
                   aria-describedby='sizing-addon1'/>
               </li>
               <li className='rowinput'>
                 <input
                   onKeyDown={ this.handleEditField }
                   type='text'
                   className='form-control'
                   ref={ `yourcompany_${ item._id }` }
                   name='yourcompany'
                   defaultValue={ item.yourcompany }
                   aria-describedby='sizing-addon1'/>
               </li>
               <li className='rowinput'>
                 <input
                   onKeyDown={ this.handleEditField }
                   type='text'
                   className='form-control'
                   ref={ `youradress_${ item._id }` }
                   name='youradress'
                   defaultValue={ item.youradress }
                   aria-describedby='sizing-addon1'/>
               </li>
               <li>
                 <button type='button' className='btn btn-primary' onClick={ this.handleEditItem.bind( this) }>Update profile</button>
               </li>
             </ul>
           );
   }
  render() {
    return (
      <div className='col-md-13'>
      <div className='col-md-2'>
        <h4>Account</h4>
        <img src='http://placehold.it/150x150' alt='...' className='img-rounded'/>
      </div>
      <div className='col-md-2'>
        <ul>
          <li><h4>kfeofanov</h4></li>
          <li>kfeofanov@gmail.com</li>
        </ul>
      </div>
      <div className='col-md-2'>
        <ul>
          <li>Plan: ULTRA</li>
          <li>Limits</li>
          <li>RAM: 8 GB</li>
          <li>STORAGE: 40 GB</li>
        </ul>
      </div>
      <div className='col-md-2 editprofile'>
        <button onClick={this.openModal} className='btn btn-default' type='submit'>Edit Profile</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel='Example Modal'
        >
          <h4 ref='subtitle'>Edit your profile</h4>
          {this.state.data.map( ( item ) => {
            return this.renderField( item );
          })}
        </Modal>
      </div>
    </div>
    );
  }
}
