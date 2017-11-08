import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';
import Notification from '../Notification';
import CreateModal from '../CustomerModal/CreateModal';
import { getVolumesTariffs } from '../../actions/VolumesActions/getVolumesTariffsAction';
import { createVolume } from '../../actions/VolumeActions/createVolumeAction';

class CreateVolume extends Component {
    constructor() {
        super();
        this.state = {
            isOpened: false,
            VolumesTariffName: '',
            VolumesTariffPrice: '',
            VolumesTariffStorageLimit: ''
        };
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.CreateVolumeReducer.isFetching);
        if(nextProps.CreateVolumeReducer.isFetching !== this.props.CreateVolumeReducer.isFetching) {
            this.setState({
                ...this.state,
                isOpened: false
            });
        }
    }
    componentDidMount() {
        this.props.onGetVolumesTariffs();
    }
    handleClickTriff(label, price, storageLimit) {
        this.setState({
            ...this.state,
            isOpened: true,
            VolumesTariffName: label,
            VolumesTariffPrice: price,
            VolumesTariffStorageLimit: storageLimit
        });
    }
    render() {
        // console.log(this.props.VolumesTariffsReducer);
        // console.log(this.props.CreateVolumeReducer);
        let isFetchingVolumesTariffs = '';
        if (this.props.VolumesTariffsReducer.isFetching === false) {
            isFetchingVolumesTariffs =
                <div className="content-block">
                    <div className="content-block-container container no-back mt-0 no-padding">
                        <div className="content-block-content mt-0">

                            <div className="namespace-plan">
                                <div className="namespace-plan-title">choose a volume size</div>
                                <div className="namespace-plan-content">Assign this Volume an identifying name.
                                    Volume name can only contain alphanumeric characters and dashes.</div>
                            </div>

                            <div className="row">
                                {
                                    this.props.VolumesTariffsReducer.data.map((item, index) => {
                                        const storageLimit = item.storage_limit;
                                        const price = item.price === 0 && item.label === "free" ? 'free' : `$${item.price}`;
                                        const label = item.label;
                                        return (
                                            <div className="col-md-3" key={index}>
                                                <div
                                                    id={label}
                                                    className={label === this.state.VolumesTariffName ?
                                                        "namespace-plan-block-container hover-action-new selected" :
                                                        "namespace-plan-block-container hover-action-new"}
                                                    onClick={labelName => this.handleClickTriff(label, price, storageLimit)}
                                                >
                                                    <div className="row">
                                                        <div className="col-md-6 namespace-plan-block-container-left">
                                                            <div className="namespace-plan-block-price">{price}</div>
                                                            <div className="namespace-plan-block-month">per month</div>
                                                        </div>
                                                        <div className="col-md-6  volume-plan-container-right">
                                                            <div className="hard-drive-size">{storageLimit} GB</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>;
        } else {
            isFetchingVolumesTariffs = <Spinner />;
        }
        let isFetchingCreateVolumes = '';
        if (this.props.CreateVolumeReducer.isFetching) {
            isFetchingCreateVolumes = <Spinner />;
        }
        return (
            <div>
                <Notification
                    status={this.props.CreateVolumeReducer.status}
                    name={this.props.CreateVolumeReducer.idVolume}
                    errorMessage={this.props.CreateVolumeReducer.errorMessage}
                />
                <CreateModal
                    type="Volume"
                    tariff={this.state.VolumesTariffName}
                    data={{
                        storageLimit: this.state.VolumesTariffStorageLimit,
                        price: this.state.VolumesTariffPrice
                    }}
                    isOpened={this.state.isOpened}
                    onHandleCreate={this.props.onCreateVolume}
                />
                { isFetchingVolumesTariffs }
                { isFetchingCreateVolumes }
            </div>
        );
    }
}

CreateVolume.propTypes = {
    onGetVolumesTariffs: PropTypes.func.isRequired,
    VolumesTariffsReducer: PropTypes.object,
    CreateVolumeReducer: PropTypes.object
};

function mapStateToProps(state) {
    return {
        VolumesTariffsReducer: state.VolumesTariffsReducer,
        CreateVolumeReducer: state.CreateVolumeReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetVolumesTariffs: () => {
            dispatch(getVolumesTariffs());
        },
        onCreateVolume: (inputVolumesName, VolumesTariffName) => {
            dispatch(createVolume(inputVolumesName, VolumesTariffName));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateVolume);
