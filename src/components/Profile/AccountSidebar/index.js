import React, { Component } from 'react';

export default class AccountSidebar extends Component {
    render() {
        return (
            <div className="col-sm-3 col-md-2 col-xs-12">
                <div className="sidebar account-info">
                    <ul>
                        <li>
                            <a href="#profile">Profile</a>
                        </li>
                        {/*<li>*/}
                        {/*<a href="#email">Email</a>*/}
                        {/*</li>*/}
                        <li>
                            <a href="#password">Password</a>
                        </li>
                        <li>
                            <a href="#tokens">Token`s</a>
                        </li>
                        <li>
                            <a href="#cli">CLI</a>
                        </li>
                        {/*<li>*/}
                        {/*<a href="#convert-to-company">Convert to company</a>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                        {/*<a href="#email-subscriptions">E-mail subscriptions</a>*/}
                        {/*</li>*/}
                        <li>
                            <a href="#delete-account">Delete Account</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
