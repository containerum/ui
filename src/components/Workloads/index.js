import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Namespaces from '../Namespaces';
import { getNamespaces } from '../../actions/NamespacesActions';

class Workloads extends Component {
    componentWillMount() {
        document.body.classList.remove('c-body-bg');
    }
    componentDidMount() {
        this.props.onGetNamespaces();
    }
    // componentWillUpdate(nextProps) {
    //     if (nextProps.idName !== this.props.idName) {
    //         const { dispatch } = this.props;
    //         dispatch(getDeployments(this.props.idName));
    //     }
    // }
    render() {
        return (
            <div>
                <Tabs selectedTabClassName="i-selected-tab">
                    <TabList className="navbar navbar-toggleable-md navbar-light bg-faded">
                        <Tab className="btn c-nav-menu-btn-name">Namespaces</Tab>
                        {/*<Tab className="btn c-nav-menu-btn-name">Volume</Tab>*/}
                    </TabList>

                    <TabPanel>
                        <Namespaces NamespacesReducer={this.props.NamespacesReducer} />
                    </TabPanel>
                    {/*<TabPanel>*/}
                    {/*<div className="container-fluid pt-3">*/}
                    {/*Volume*/}
                    {/*</div>*/}
                    {/*</TabPanel>*/}
                </Tabs>
            </div>
        );
    }
}

Workloads.propTypes = {
    onGetNamespaces: PropTypes.func.isRequired,
    NamespacesReducer: PropTypes.object
};

function mapStateToProps(state) {
    const { NamespacesReducer } = state;

    return {
        NamespacesReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetNamespaces: () => {
            dispatch(getNamespaces());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workloads);
