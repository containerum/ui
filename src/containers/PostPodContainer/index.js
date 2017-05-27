import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Info from '../../components/Pod/Info';
import Conditions from '../../components/Pod/Conditions';
import Containers from '../../components/Pod/Containers';

class PostPodContainer extends Component {
    constructor() {
        super();
        this.state = {
            isSelectedTab: true
        };
    }
    render() {
        return (
            <div>
                <Tabs selectedTabClassName="i-selected-tab">
                    <TabList className="btn-group i-container-btn-gr">
                        <Tab className="btn c-nav-menu-btn">Objects</Tab>
                        <Tab className="btn c-nav-menu-btn">Settings</Tab>
                    </TabList>

                    <TabPanel>
                        <Info PodReducer={this.props.PodReducer} />
                        <Containers PodReducer={this.props.PodReducer} />
                        <Conditions PodReducer={this.props.PodReducer} />
                    </TabPanel>
                    <TabPanel>
                        <div className="container-fluid pt-3">
                            Settings
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

PostPodContainer.propTypes = {
    PodReducer: PropTypes.object
};

export default PostPodContainer;
