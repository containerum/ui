import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { browserHistory } from 'react-router';
import nslogo from '../../../images/deploym.png';
import NavLink from "../../../containers/NavLink";

// import Notification from '../../components/Notification';

class VolumesContainer extends Component {
    render() {
        return (
            <div>
                {/* <Notification*/}
                {/* status={this.props.DeleteDeploymentReducer.status}*/}
                {/* name={this.props.DeleteDeploymentReducer.deploymentName}*/}
                {/* errorMessage={this.props.DeleteDeploymentReducer.errorMessage}*/}
                {/* />*/}
                <div className="row double">
                    {
                        this.props.VolumesReducer.data.map((item) => {
                            const name = item.name;
                            // const nameFirstChar = name.substring(0, 1).toUpperCase();
                            const id = `item_${name}`;
                            const status = item.status === 'Started' || item.status === 'Created' ? 'Active' : 'Not Active';
                            const usedSize = item.used_size ? parseInt(item.used_size) / 1000 : 0;
                            const totalSize = item.total_size ? parseInt(item.total_size) / 1000 : 0;
                            return (
                                <div className="col-md-4" id={id} key={id}>
                                    <div className="content-block-container card-container card-container-volume hover-action ">
                                        <div className="content-block-header">
                                            <div className="content-block-header-label">
                                                <div className="content-block-header-img">
                                                    <img src={nslogo} alt="" />
                                                </div>
                                                <div className="content-block-header-label__text content-block-header-label_main">
                                                    {name}
                                                </div>
                                            </div>
                                            {/*<div className="content-block-header-extra-panel">*/}
                                            {/*<div className="content-block-header-extra-panel dropdown no-arrow">*/}
                                            {/*<i*/}
                                            {/*className="content-block-header__more ion-more dropdown-toggle"*/}
                                            {/*data-toggle="dropdown"*/}
                                            {/*aria-haspopup="true"*/}
                                            {/*aria-expanded="false"*/}
                                            {/*> </i>*/}
                                            {/*<ul className="dropdown-menu dropdown-menu-right" role="menu">*/}
                                            {/*<a className="dropdown-item" data-toggle="modal" data-target="#volume" href="#">Delete</a>*/}
                                            {/*<a className="dropdown-item" href="#">Dropdown item</a>*/}
                                            {/*<a className="dropdown-item" href="#">Dropdown item</a>*/}
                                            {/*</ul>*/}
                                            {/*</div>*/}
                                            {/*</div>*/}
                                        </div>

                                        <div className="content-block-content card-block">
                                            <div className="content-block__info-item ">
                                                <div className="content-block__info-name inline">Usage / Total : </div>
                                                <div className="content-block__info-text inline">{usedSize} / {totalSize} GB</div>
                                            </div>
                                            <div className="content-block__info-item">
                                                <div className="content-block__info-name inline">Status: </div>
                                                <div className="content-block__info-text inline">{status}</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            );
                        })
                    }

                    {/*<NavLink to="/CreateVolume" className="col-md-4 align-middle">*/}
                        {/*<div className="add-new-block content-block-content card-container card-container-volume hover-action ">*/}
                            {/*<div className="action"><i>+</i> Add a volume</div>*/}
                        {/*</div>*/}
                    {/*</NavLink>*/}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        VolumesReducer: state.VolumesReducer
    };
}

export default connect(mapStateToProps)(VolumesContainer);
