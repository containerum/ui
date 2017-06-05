import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Info from '../../components/Pod/Info';
import Conditions from '../../components/Pod/Conditions';
import Containers from '../../components/Pod/Containers';

class PostPodContainer extends Component {
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
                            GetPodReducer={this.props.GetPodReducer}
                            idName={this.props.idName}
                            idPod={this.props.idPod}
                            idDep={this.props.idDep}
                        />
                        <Containers GetPodReducer={this.props.GetPodReducer} />
                        <Conditions GetPodReducer={this.props.GetPodReducer} />
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

PostPodContainer.propTypes = {
    GetPodReducer: PropTypes.object,
    idName: PropTypes.string,
    idPod: PropTypes.string,
    idDep: PropTypes.string
};

export default PostPodContainer;
