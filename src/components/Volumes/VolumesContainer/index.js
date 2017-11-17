import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import nslogo from '../../../images/deploym.png';
import NavLink from "../../../containers/NavLink";

import { deleteVolume } from "../../../actions/VolumeActions/deleteVolumeAction";
import Notification from '../../Notification';
import DeleteModal from '../../CustomerModal/DeleteModal';
import Spinner from '../../Spinner';

class VolumesContainer extends Component {
    constructor() {
        super();
        this.state = {
            isOpened: false,
            VolumeName: ''
        }
    }
    componentWillReceiveProps(nextProps) {
        // console.log('DeleteVolumeReducer', nextProps);
        if (this.props.DeleteVolumeReducer) {
            this.setState({
                ...this.state,
                VolumeName: '',
                isOpened: false
            });
        }
        if (nextProps.DeleteVolumeReducer.isFetching === false &&
            nextProps.DeleteVolumeReducer.status === 202 &&
            nextProps.DeleteVolumeReducer.idVolume) {
            const id = `item_${nextProps.DeleteVolumeReducer.idVolume}`;
            const el = document.getElementById(id);
            el ? el.remove() : el;
        }
    }
    handleClose(e) {
        e.stopPropagation();
    }
    handleClickDeletingVolume(idVolume) {
        this.setState({
            ...this.state,
            VolumeName: idVolume,
            isOpened: true
        });
    }
    render() {
        let isFetchingDeleteVolume = '';
        if (this.props.DeleteVolumeReducer.isFetching) {
            isFetchingDeleteVolume = <Spinner />;
        }
        return (
            <div>
                { isFetchingDeleteVolume }
                 <Notification
                     status={this.props.DeleteVolumeReducer.status}
                     name={this.props.DeleteVolumeReducer.idVolume}
                     errorMessage={this.props.DeleteVolumeReducer.errorMessage}
                 />
                <div className="row double">
                    {
                        this.props.VolumesReducer.data.map((item) => {
                            const name = item.name;
                            // const nameFirstChar = name.substring(0, 1).toUpperCase();
                            const id = `item_${name}`;
                            const status = item.status === 'Started' || item.status === 'Created' ? 'Active' : 'Not Active';
                            const usedSize = item.used_size ? item.used_size : 0;
                            const totalSize = item.total_size ? item.total_size : 0;
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
                                            <div className="content-block-header-extra-panel" onClick={this.handleClose.bind(this)}>
                                                <div className="content-block-header-extra-panel dropdown no-arrow">
                                                    <i
                                                        className="content-block-header__more ion-more dropdown-toggle"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    > </i>
                                                    <ul className="dropdown-menu dropdown-menu-right" role="menu">
                                                        <NavLink
                                                            className="dropdown-item"
                                                            to={`/Volumes/${name}/Resize`}
                                                        >Resize</NavLink>
                                                        <button
                                                            className="dropdown-item text-danger"
                                                            onClick={idVolume => this.handleClickDeletingVolume(name)}
                                                        >Delete</button>
                                                    </ul>
                                                </div>
                                            </div>
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
                    <div className="col-md-4 align-middle">
                        <NavLink to="/CreateVolume" className="add-new-block content-block-content card-container hover-action ">
                            <div className="action action-vol"><i>+</i> Add a volume</div>
                        </NavLink>
                    </div>
                </div>

                <DeleteModal
                    type="Volume"
                    name={this.state.VolumeName}
                    isOpened={this.state.isOpened}
                    onHandleDelete={this.props.onDeleteVolume}
                />
            </div>
        );
    }
}

VolumesContainer.propTypes = {
    VolumesReducer: PropTypes.object,
    DeleteVolumeReducer: PropTypes.object,
    onDeleteVolume: PropTypes.func
};

function mapStateToProps(state) {
    return {
        DeleteVolumeReducer: state.DeleteVolumeReducer,
        VolumesReducer: state.VolumesReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteVolume: (idVolume) => {
            dispatch(deleteVolume(idVolume));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VolumesContainer);
