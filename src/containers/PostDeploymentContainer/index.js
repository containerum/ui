import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Info from '../../components/Deployment/Info';
import PodsList from '../../components/Deployment/PodsList';

class PostDeploymentContainer extends Component {
    render() {
        return (
            <div>
                <Tabs selectedTabClassName="i-selected-tab">
                    <TabList className="btn-group i-container-btn-gr">
                        <Tab className="btn c-nav-menu-btn">Objects</Tab>
                        {/*<Tab className="btn c-nav-menu-btn">Settings</Tab>*/}
                    </TabList>
                    <TabPanel>
                        <Info deploymentReducer={this.props.deploymentReducer} idName={this.props.idName} />
                        <PodsList idDep={this.props.idDep} idName={this.props.idName} />
                    </TabPanel>
                    {/*<TabPanel>*/}
                    {/*<div className="container-fluid pt-3">*/}
                    {/*Settings*/}
                    {/*</div>*/}
                    {/*</TabPanel>*/}
                </Tabs>
            </div>
        );
    }
}

PostDeploymentContainer.propTypes = {
    deploymentReducer: PropTypes.object,
    errorMessage: PropTypes.string,
    idName: PropTypes.string,
    idDep: PropTypes.string
};

export default PostDeploymentContainer;
