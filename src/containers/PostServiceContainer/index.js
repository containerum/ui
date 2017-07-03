import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Info from '../../components/Service/Info';
// import PodsList from '../../components/Service/PodsList';

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
                        {/*<PodsList serviceReducer={this.props.serviceReducer} />*/}
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

PostServiceContainer.propTypes = {
    serviceReducer: PropTypes.object,
    errorMessage: PropTypes.string,
    idName: PropTypes.string
};

export default PostServiceContainer;
