import React, { Component } from 'react';
import Account from './Account';
import CliToken from './CliToken';
import Subscription from './Subscription';
import DeleteAccount from './DeleteAccount';
import ConvertCompany from './ConvertCompany';
import Tokens from './Tokens';
import AccountSidebar from './AccountSidebar';

export default class Profile extends Component {
    render() {
        return (
            <div>
                <section className="account">
                    <div className="container">
                        <div className="row">
                            <AccountSidebar />
                            <div className="col-sm-9 col-md-10 col-xs-12">
                                <Account />
                                <Tokens />
                                <CliToken />
                                <ConvertCompany />
                                <Subscription />
                                <DeleteAccount />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
