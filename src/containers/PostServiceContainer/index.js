import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Deployments from '../../components/Deployments';

import Info from '../../components/Service/Info';
import ServiceSettings from '../../components/Service/ServiceSettings';

class PostServiceContainer extends Component {
    render() {
        return (
            <div>
                <Tabs selectedTabClassName="i-selected-tab">
                    <TabList className="btn-group i-container-btn-gr">
                        <Tab className="btn c-nav-menu-btn">Objects</Tab>
                        {/*<Tab className="btn c-nav-menu-btn">Settings</Tab>*/}
                    </TabList>
                    <TabPanel>
                        <Info
                            serviceReducer={this.props.serviceReducer}
                            idName={this.props.idName}
                        />
                        <Deployments
                            idName={this.props.idName}
                            linkedDep={this.props.serviceReducer.deployment}
                        />
                    </TabPanel>
                    {/*<TabPanel>*/}
                    {/*<ServiceSettings*/}
                    {/*serviceReducer={this.props.serviceReducer}*/}
                    {/*/>*/}
                    {/*</TabPanel>*/}
                </Tabs>
            </div>
        );
    }
}

PostServiceContainer.propTypes = {
    serviceReducer: PropTypes.object,
    errorMessage: PropTypes.string,
    idName: PropTypes.string
};

export default PostServiceContainer;
