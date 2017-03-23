import React, { Component } from 'react';
import { Link } from 'react-router';
import Button from './Button';

export default class TR extends Component {
  render() {
    var dep = this.props.data.tokens.map(function(item){
    return (
      <tr>
        <td className='width_td'></td>
        <th scope='row'><Link to={`/Tokens/${item.name}`}>{item.name}</Link></th>
        <td></td>
        <td></td>
        <td></td>
        <td>{item.created}</td>
        <td className='menu_dropdown'>
          <Button data_id={item.id}/>
        </td>
      </tr>
    );
  })
  return(
    <tbody>
      {dep}
    </tbody>
  );
  }
}
