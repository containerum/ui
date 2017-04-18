import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Billing extends Component {
    render() {
        return (
            <div className='row rowprofile'>
                <ul className='nav nav-tabs'>
                    <li role='presentation'><Link to='/Profile'>Profile</Link></li>
                    <li role='presentation' className='active'><Link to='/Billing'>Billing</Link></li>
                    <li role='presentation'><Link to='/Referrals'>Referrals</Link></li>
                </ul>
                <div className='col-md-13'></div>
            </div>
        );
    }
}
