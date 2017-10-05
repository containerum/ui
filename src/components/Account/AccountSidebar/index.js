import React, { Component } from 'react';

export default class AccountSidebar extends Component {
    render() {
        return (
            <div className="col-md-3 col-lg-3 col-xl-2">
                <div className="content-block account-info">
                    <div className="content-block-container container no-back pl-0 pr-0 container-fluid">
                        <ul className="account-menu nav nav-list">
                            <li>
                                <div className="nav-root-item">Account</div>
                                <ul className="sub-navbar">
                                    <li className="nav-item"><a href="#profile" className="nav-link active">Profile</a></li>
                                    <li className="nav-item"><a href="#password" className="nav-link ">Password</a></li>
                                    {/*<li className="nav-item"><a href="#tokens" className="nav-link ">Tokens</a></li>*/}
                                    <li className="nav-item"><a href="#cli" className="nav-link ">CLI</a></li>
                                    {/*<li className="nav-item"><a href="#company-account" className="nav-link ">Company account</a></li>*/}
                                    {/*<li className="nav-item"><a href="#subscriptions" className="nav-link ">E-mail subscriptions</a></li>*/}
                                    <li className="nav-item"><a href="#delete-account" className="nav-link ">Delete Account</a></li>
                                </ul>
                            </li>
                            {/*<li>*/}
                                {/*<div className="nav-root-item">Billing</div>*/}
                                {/*<ul className="sub-navbar">*/}
                                    {/*<li className="nav-item"><a href="" className="nav-link">Information</a></li>*/}
                                    {/*<li className="nav-item"><a href="" className="nav-link">Payment method</a></li>*/}
                                    {/*<li className="nav-item"><a href="" className="nav-link">Allert</a></li>*/}
                                    {/*<li className="nav-item"><a href="" className="nav-link">History</a></li>*/}
                                {/*</ul>*/}
                            {/*</li>*/}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
