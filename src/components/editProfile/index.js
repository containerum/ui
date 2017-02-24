import React, { Component } from 'react';
import DataList from './datalist';
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
export default class EditProfile extends Component {
  constructor(props) {
      super(props);
      this.state = { list : data_user };
    }
  stateEdit(update) {
   for(var i = 0; i < data_user.length; i++) {
     if(data_user[i]._id == update._id) {
       var d = data_user.indexOf(data_user[i]);
       data_user.splice(d, 1, update);
  }
}
   this.setState({list : data_user });
 }
  render() {
    return (
      <div className='row'>
        <DataList items={this.state.list} stateEdit={this.stateEdit.bind(this)}/>
      </div>
    );
  }
}
