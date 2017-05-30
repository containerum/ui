import React, { Component } from 'react';
import Button from './Button';

export default class TR extends Component {
    render() {
        return (
        <tr>
            <td scope='row'>konstantin_ubuntu_hp</td>
            <td></td>
            <td>d8:2e:dd:6d:60:43:b9:f6:80:60:20:8c:2d:5f:81:0a</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className='menu_dropdown'>
                <Button />
            </td>
        </tr>
        );
    }
}
