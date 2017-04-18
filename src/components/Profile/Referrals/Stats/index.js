import React, { Component } from 'react';

export default class Stats extends Component {
    render() {
        return (
            <div className='col-md-13'>
                <div className='col-md-4'>
                    <h4>Give $10, Get $25</h4>
                    <h5>Everyone you refer gets $10 in credit. Once they spent $25 with us, you get $25. There in no
                        limit to the amount of credit you can earn through referrals</h5>
                </div>
                <div className='col-md-2'>
                    <ul>
                        <li><h4>Stats</h4></li>
                        <li>REFERRALS</li>
                        <li>PENDING</li>
                        <li>EARNED</li>
                    </ul>
                </div>
                <div className='col-md-5'>
                    <ul>
                        <li>People who have signed up using your link.</li>
                        <li>Amount you stand to earn when your referrals have spent $25.</li>
                        <li>Amount that will be applied to your account balance.</li>
                    </ul>
                </div>
                <div className='col-md-1'>
                    <ul>
                        <li>0</li>
                        <li>$0.00</li>
                        <li>$0.00</li>
                    </ul>
                </div>
            </div>
        );
    }
}
