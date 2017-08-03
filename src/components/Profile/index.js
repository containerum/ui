import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Account from './Account';
import CliToken from './CliToken';
// import Subscription from './Subscription';
import DeleteAccount from './DeleteAccount';
// import ConvertCompany from './ConvertCompany';
import Tokens from './Tokens';
import AccountSidebar from './AccountSidebar';
import Spinner from '../Spinner';

import './Profile.css';

class Profile extends Component {
    render() {
        let isFetchingComponent = '';
        if (this.props.GetProfileReducer.isFetching === false) {
            isFetchingComponent =
                <div>
                    <Tabs selectedTabClassName="i-selected-tab">
                        <TabList className="btn-group i-container-btn-gr">
                            <Tab className="btn c-nav-menu-btn">Account</Tab>
                            {/*<Tab className="btn c-nav-menu-btn">Billing</Tab>*/}
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
                                            {/*<ConvertCompany />*/}
                                            {/*<Subscription />*/}
                                            <DeleteAccount />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </TabPanel>
                        {/*<TabPanel>*/}
                        {/*<div className="container-fluid pt-3">*/}
                        {/*Billing*/}
                        {/*</div>*/}
                        {/*</TabPanel>*/}
                    </Tabs>
                </div>;
        } else {
            isFetchingComponent = <Spinner />;
        }
        return (
            <div>
                { isFetchingComponent }
            </div>
        );
    }
}

Profile.propTypes = {
    GetProfileReducer: PropTypes.object
};

function mapStateToProps(state) {
    return {
        GetProfileReducer: state.GetProfileReducer
    };
}

export default connect(mapStateToProps)(Profile);
