import React, { Component } from 'react';
import { Link } from 'react-router';
import Account from './Account';
import PanelSSH from './PanelSSH';
import CliToken from './CliToken';
import Email from './Email';

export default class Profile extends Component {
    render() {
        return (
            <div className='row rowprofile'>
                <ul className='nav nav-tabs'>
                    <li role='presentation' className='active'>
                        <Link to='/Profile'>Profile</Link>
                    </li>
                    <li role='presentation'>
                        <Link to='/Billing'>Billing</Link>
                    </li>
                    <li role='presentation'>
                        <Link to='/Referrals'>Referrals</Link>
                    </li>
                </ul>
                <Account />
                <PanelSSH />
                <CliToken />
                <Email />
            </div>
        );
    }
}
