import React, { Component } from 'react';
import Account from './Account';
import CliToken from './CliToken';
import Subscription from './Subscription';
import DeleteAccount from './DeleteAccount';
import ConvertCompany from './ConvertCompany';
import Tokens from './Tokens';
import AccountSidebar from './AccountSidebar';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import './Profile.css';

export default class Profile extends Component {
    render() {
        return (
            <div>
                <Tabs selectedTabClassName="i-selected-tab">
                    <TabList className="btn-group i-container-btn-gr">
                        <Tab className="btn c-nav-menu-btn">Account</Tab>
                        <Tab className="btn c-nav-menu-btn">Billing</Tab>
                    </TabList>
                    <TabPanel>
                        <section className="account">
                            <div className="container">
                                <div className="row">
                                    <AccountSidebar />
                                    <div className="col-sm-9 col-md-10 col-xs-12 pb-5">
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
                    </TabPanel>
                    <TabPanel>
                        <div className="container-fluid pt-3">
                            Billing
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}
