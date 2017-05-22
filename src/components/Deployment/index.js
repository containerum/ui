import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import Info from './Info';
import PodsList from './PodsList';
import Namespaces from '../../components/Namespaces';
import CreateInstance from '../../components/CreateInstance';

class Deployment extends Component {
    render() {
        return (
            <div>
                <div className="navbar navbar-toggleable-md navbar-light bg-faded">
                    <Namespaces idDep={this.props.params.idDep} />
                    <CreateInstance />
                </div>
                <Tabs>
                    <TabList className="btn-group">
                        <Tab className="btn c-nav-menu-btn">Objects</Tab>
                        <Tab className="btn c-nav-menu-btn">Settings</Tab>
                    </TabList>

                    <TabPanel>
                        <Info />
                        <PodsList idDep={this.props.params.idDep}  />
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

// Deployment.propTypes = {
//     dispatch: PropTypes.func.isRequired,
//     errorMessage: PropTypes.string
// };
//
// function mapStateToProps (state) {
//     const { DeploymentReducer } = state;
//     const { errorMessage } = DeploymentReducer;
//
//     return {
//         errorMessage,
//         DeploymentReducer
//     }
// }
//
// export default connect(mapStateToProps)(Deployment)

export default Deployment
