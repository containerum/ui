import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// import { getPod } from '../../actions/PodActions';

import Info from './Info';
import Conditions from './Conditions';
import Containers from './Containers';
import Namespaces from '../../components/Namespaces';
import CreateInstance from '../../components/CreateInstance';

class Pod extends Component {
    // componentWillMount() {
    //     const { dispatch } = this.props;
    //     dispatch(getPod());
    // }
    render() {
        return (
            <div>
                <div className="navbar navbar-toggleable-md navbar-light bg-faded">
                    <Namespaces idDep={this.props.params.idDep} idPod={this.props.params.idPod} />
                    <CreateInstance />
                </div>
                <Tabs>
                    <TabList className="btn-group">
                        <Tab className="btn c-nav-menu-btn">Objects</Tab>
                        <Tab className="btn c-nav-menu-btn">Settings</Tab>
                    </TabList>

                    <TabPanel>
                        <Info />
                        <Containers />
                        <Conditions />
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

Pod.propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

function mapStateToProps (state) {
    const { PodReducer } = state;
    const { errorMessage } = PodReducer;

    return {
        errorMessage,
        PodReducer
    }
}

export default connect(mapStateToProps)(Pod)
