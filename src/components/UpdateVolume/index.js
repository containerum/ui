import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';

import Spinner from '../Spinner';
import Notification from '../Notification';
import { getVolumesTariffs } from '../../actions/VolumesActions/getVolumesTariffsAction';
import { updateVolume } from '../../actions/VolumeActions/updateVolumeAction';
import { getVolume } from '../../actions/VolumeActions/getVolumeAction';
import 'rc-tooltip/assets/bootstrap_white.css';

class UpdateVolume extends Component {
    constructor() {
        super();
        this.state = {
            VolumeTariffName: ''
        };
    }
    componentDidMount() {
        this.props.onGetVolume(this.props.params.idVolume);
        if (!this.props.VolumesTariffsReducer.data.length) {
            this.props.onGetVolumeTariffs();
        }
    }
    handleClickTriff(label) {
        this.setState({
            ...this.state,
            VolumeTariffName: label
        });
    }
    handleSubmitVolumeTariffs(e) {
        e.preventDefault();
        if (this.state.VolumeTariffName) {
            this.props.onUpdateVolume(this.props.params.idVolume, this.state.VolumeTariffName);
        }
    }
    render() {
        // console.log(this.props.UpdateVolumeReducer);
        let isFetchingVolumeTariffs = '';
        if (this.props.VolumesTariffsReducer.isFetching === false &&
            this.props.GetVolumeReducer.isFetching === false) {
            const active = this.props.GetVolumeReducer.data.tariff;
            const arrayTariff = this.props.VolumesTariffsReducer.data;
            const arrayWithInactiveTariff = [];

            arrayTariff.map((itemOut) => {
                if (itemOut.label === active) {
                    arrayTariff.map((itemIn) => {
                        if (itemOut.storage_limit >= itemIn.storage_limit) {
                            itemIn.isDisabled = true;
                            arrayWithInactiveTariff.push(itemIn)
                        } else {
                            itemIn.isDisabled = false;
                            arrayWithInactiveTariff.push(itemIn)
                        }
                    });
                } else {
                    arrayWithInactiveTariff.push(itemOut);
                }
            });

            isFetchingVolumeTariffs =
                <div className="content-block">
                    <div className="content-block-container container no-back mt-0 no-padding">
                        <div className="content-block-content mt-0">

                            <div className="namespace-plan mt-0">
                                <div className="namespace-plan-first-step">{this.props.params.idVolume}</div>
                                <div className="namespace-plan-title">choose a volume plan</div>
                            </div>
                            <div className="row">
                                {
                                    arrayWithInactiveTariff.map((item, index) => {
                                        const storageLimit = item.storage_limit;
                                        const price = `$${item.price}`;
                                        const label = item.label;
                                        const isActiveTariff = label === active;
                                        const isDisabled = item.isDisabled;
                                        return (
                                            <div className="col-md-3" key={index}>
                                                <Tooltip
                                                    placement="top"
                                                    trigger={['hover']}
                                                    overlay={<span>Current Volume size</span>}
                                                    overlayClassName={isActiveTariff ? '' : 'display-none'}
                                                >
                                                <div
                                                    id={label}
                                                    className={
                                                        isActiveTariff || isDisabled ?
                                                            "namespace-plan-block-container hover-action-new disabled" :
                                                        label !== this.state.VolumeTariffName ?
                                                            "namespace-plan-block-container hover-action-new" :
                                                            "namespace-plan-block-container hover-action-new selected"
                                                    }
                                                    onClick={() => {
                                                        if (!isActiveTariff && !isDisabled) {
                                                            this.handleClickTriff(label)
                                                        }
                                                    }}
                                                >
                                                    <div className="row">
                                                        <div className="col-md-6 namespace-plan-block-container-left">
                                                            <div className="namespace-plan-block-price">{isActiveTariff ? 'Active' : price}</div>
                                                            {
                                                                isActiveTariff ? '' :
                                                                    <div className="namespace-plan-block-month">per month</div>
                                                            }
                                                        </div>
                                                        <div className="col-md-6  volume-plan-container-right">
                                                            <div className="hard-drive-size">{storageLimit} GB</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </Tooltip>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <form
                                className="col-md-6 namespace-plan"
                                onSubmit={this.handleSubmitVolumeTariffs.bind(this)}
                            >
                                <button
                                    className="btn namespace-plan-create-btn"
                                    type="submit"
                                >Resize</button>
                            </form>
                        </div>
                    </div>
                </div>;
        } else {
            isFetchingVolumeTariffs = <Spinner />;
        }
        let isFetchingCreateVolume = '';
        if (this.props.UpdateVolumeReducer.isFetching) {
            isFetchingCreateVolume = <Spinner />;
        }
        return (
            <div>
                <Notification
                    status={this.props.UpdateVolumeReducer.status}
                    method={this.props.UpdateVolumeReducer.method}
                    name={this.props.UpdateVolumeReducer.idVolume}
                    errorMessage={this.props.UpdateVolumeReducer.errorMessage}
                />
                { isFetchingVolumeTariffs }
                { isFetchingCreateVolume }
            </div>
        );
    }
}

UpdateVolume.propTypes = {
    onGetVolumeTariffs: PropTypes.func.isRequired,
    VolumesTariffsReducer: PropTypes.object,
    UpdateVolumeReducer: PropTypes.object,
    GetVolumeReducer: PropTypes.object,
    params: PropTypes.object
};

function mapStateToProps(state) {
    return {
        VolumesTariffsReducer: state.VolumesTariffsReducer,
        UpdateVolumeReducer: state.UpdateVolumeReducer,
        GetVolumeReducer: state.GetVolumeReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetVolumeTariffs: () => {
            dispatch(getVolumesTariffs());
        },
        onUpdateVolume: (inputVolumeName, VolumeTariffName) => {
            dispatch(updateVolume(inputVolumeName, VolumeTariffName));
        },
        onGetVolume: (VolumeTariffName) => {
            dispatch(getVolume(VolumeTariffName));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateVolume);
