import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonInfo from './Button-info';
import ProgressRAM from './ProgressRAM';
import ButtonDropRight from './Button-drop-right';

export default class NavBar extends Component {
    render() {
        return (
            <nav className='navbar navbar-default'>
                <ButtonDropRight />
            </nav>
        );
    }
}
