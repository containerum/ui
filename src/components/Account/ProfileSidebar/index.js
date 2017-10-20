import React, { Component } from 'react';

import NavLink from "../../../containers/NavLink";

export default class ProfileSidebar extends Component {
    render() {
        return (
            <div className="col-md-3 col-lg-3 col-xl-2">
                <div className="content-block account-info">
                    <div className="content-block-container container no-back pl-0 pr-0 container-fluid">
                        <ul className="account-menu nav nav-list">
                            <li>
                                <div className="nav-root-item">Account</div>
                                <ul className="sub-navbar">
                                    <li className="nav-item">
                                        <a href="/Account#profile" className="nav-link active">Profile</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/Account#password" className="nav-link ">Password</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/Account#webhooks" className="nav-link ">WebHooks</a>
                                    </li>
                                    {/*<li className="nav-item"><NavLink href="/Account#tokens" className="nav-link ">Tokens</NavLink></li>*/}
                                    <li className="nav-item">
                                        <a href="/Account#cli" className="nav-link ">CLI</a>
                                    </li>
                                    {/*<li className="nav-item"><NavLink href="/Account#company-account" className="nav-link ">Company account</NavLink></li>*/}
                                    {/*<li className="nav-item"><NavLink href="/Account#subscriptions" className="nav-link ">E-mail subscriptions</NavLink></li>*/}
                                    <li className="nav-item">
                                        <a href="/Account#delete-account" className="nav-link ">Delete Account</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <div className="nav-root-item">Billing</div>
                                <ul className="sub-navbar">
                                    <li className="nav-item">
                                        <a href="/Billing#information" className="nav-link">Information</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/Billing#add-funds" className="nav-link">Payment method</a>
                                    </li>
                                    {/*<li className="nav-item">*/}
                                        {/*<a href="/Billing#alert" className="nav-link">Alert</a>*/}
                                    {/*</li>*/}
                                    <li className="nav-item">
                                        <a href="/Billing#history" className="nav-link">History</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
