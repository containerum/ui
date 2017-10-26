import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

import NavLink from '../../../containers/NavLink';

class ServiceContains extends Component {
    render() {
        return (
            <div className="content-block">
                <div className="content-block-container container ">
                    <div className="content-block-header">
                        <div className="content-block-header-nav">
                            <ul className="content-block-menu nav nav-pills" role="tablist">
                                <li className="content-block-menu__li nav-item">
                                    <NavLink
                                        to={`/Namespaces/${this.props.idName}/Services/${this.props.idService}/Ports`}
                                        className="content-block-menu__link"
                                    >Ports</NavLink>
                                </li>
                                <li className="content-block-menu__li nav-item">
                                    <NavLink
                                        to={`/Namespaces/${this.props.idName}/Services/${this.props.idService}/Deployment`}
                                        className="content-block-menu__link"
                                    >Deployment</NavLink>
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
        );
    }
}

ServiceContains.propTypes = {
    idName: PropTypes.string.isRequired,
    idService: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired
};

export default ServiceContains;
