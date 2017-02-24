import React, { Component } from 'react';

export default class DataList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: null
    };
  }
 toggleEdit( itemId ) {
   this.setState( { edit: itemId } );
 }
 handleUserDataUpdate( update ) {
  this.props.stateEdit(update);
  this.setState({edit: null});

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
    if ( this.state.edit === item._id ) {
      return (<ul key={ `editing-${ item._id }` }>
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
        } else {
      return <ul className='list-group' key={ item._id } onClick={ this.toggleEdit.bind( this, item._id ) }>
        <li className='list-group-item list-group-item-action'><span className='label label-default'>Full Name</span> { item.fullname }</li>
        <li className='list-group-item list-group-item-action'><span className='label label-default'>E-mail address</span> { item.email }</li>
        <li className='list-group-item list-group-item-action'><span className='label label-default'>Password</span> { item.password }</li>
        <li className='list-group-item list-group-item-action'><span className='label label-default'>Phone number</span> { item.phonenumber }</li>
        <li className='list-group-item list-group-item-action'><span className='label label-default'>Your Company</span> { item.yourcompany }</li>
        <li className='list-group-item list-group-item-action'><span className='label label-default'>Your address</span> { item.youradress }</li>
      </ul>;
    }
  }
  render() {
    return (
      <div>
        {this.props.items.map( ( item ) => {
          return this.renderField( item );
        })}
      </div>
    );
  }
}
