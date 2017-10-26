import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavLink from '../../../containers/NavLink';
import Spinner from '../../Spinner';

class NamespaceContains extends Component {
    render() {
        let isFetchingDeleteNS = '';
        if (this.props.DeleteNamespaceReducer.isFetching) {
            isFetchingDeleteNS = <Spinner />;
        }
        return (
            <div>
                { isFetchingDeleteNS }
                <div className="content-block">
                    <div className="content-block-container container">
                        <div className="content-block-header">
                            <div className="content-block-header-nav">
                                <ul className="content-block-menu nav nav-pills" role="tablist">
                                    <li className="content-block-menu__li nav-item">
                                        <NavLink
                                            to={`/Namespaces/${this.props.idName}/Deployments`}
                                            className="content-block-menu__link"
                                        >Deployments</NavLink>
                                    </li>
                                    <li className="content-block-menu__li nav-item">
                                        <NavLink
                                            to={`/Namespaces/${this.props.idName}/Services`}
                                            className="content-block-menu__link"
                                        >Services</NavLink>
                                    </li>
                                </ul>
                            </div>
                            {/*<div className="content-block-header-extra-panel">*/}
                            {/*<div className="content-block-header-extra-panel">*/}
                            {/*<button type="button" className="button_blue btn btn-outline-primary">Create</button>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                        </div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

NamespaceContains.propTypes = {
    children: PropTypes.object.isRequired,
    idName: PropTypes.string
};

function mapStateToProps(state) {
    return {
        DeleteNamespaceReducer: state.DeleteNamespaceReducer
    };
}

export default connect(mapStateToProps)(NamespaceContains);
