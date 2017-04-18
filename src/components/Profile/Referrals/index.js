import React, { Component } from 'react';
import { Link } from 'react-router';
import Stats from './Stats';
import Share from './Share';

export default class Referrals extends Component {
    render() {
        return (
            <div className='row rowreferals'>
                <ul className='nav nav-tabs'>
                    <li role='presentation'><Link to='/Profile'>Profile</Link></li>
                    <li role='presentation'><Link to='/Billing'>Billing</Link></li>
                    <li role='presentation' className='active'>
                        <Link to='/Referrals'>Referrals</Link>
                    </li>
                </ul>
                <Stats />
                <Share />
            </div>
        );
    }
}
