import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';
import { getVolumesTariffs } from '../../actions/VolumesActions/getVolumesTariffsAction';
import { createVolume } from '../../actions/VolumeActions/createVolumeAction';

class CreateVolume extends Component {
    constructor() {
        super();
        this.state = {
            VolumesTariffName: '',
            inputVolumesName: ''
        };
    }
    componentDidMount() {
        this.props.onGetVolumesTariffs();
    }
    handleChangeInput(e) {
        const regexp = /^[a-zA-Z0-9-]+$/;
        const inputValue = e.target.value.trim();
        if (inputValue.search(regexp) !== -1) {
            this.setState({
                ...this.state,
                inputVolumesName: inputValue
            });
        }
    }
    handleClickTriff(label) {
        this.setState({
            ...this.state,
            VolumesTariffName: label
        });
    }
    handleSubmitVolumesTariffs(e) {
        e.preventDefault();
        if (this.state.VolumesTariffName && this.state.inputVolumesName.length >= 2) {
            this.props.onCreateVolume(this.state.inputVolumesName, this.state.VolumesTariffName);
            // console.log(this.state.VolumesTariffName, this.state.inputVolumesName)
        }
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
                                <div className="namespace-plan-first-step">1 / 2</div>
                                <div className="namespace-plan-title">choose a persistent volume plan</div>
                            </div>

                            <div className="row">
                                {
                                    this.props.VolumesTariffsReducer.data.map((item, index) => {
                                        // console.log(item);
                                        // const cpu = item.cpu_limit / 1000;
                                        // const memory = item.memory_limit / 1000;
                                        // const traffic = item.traffic;
                                        // const price = item.price === 0 && item.label === "free" ? 'free' : `$${item.price}`;
                                        const label = item.label;
                                        return (
                                            <div className="col-md-3" key={index}>
                                                <div
                                                    id={label}
                                                    className={label === this.state.VolumesTariffName ?
                                                        "namespace-plan-block-container hover-action-new selected" :
                                                        "namespace-plan-block-container hover-action-new"}
                                                    onClick={labelName => this.handleClickTriff(label)}
                                                >
                                                    <div className="row">
                                                        <div className="col-md-6 namespace-plan-block-container-left">
                                                            <div className="namespace-plan-block-price">$15</div>
                                                            <div className="namespace-plan-block-month">per month</div>
                                                        </div>
                                                        <div className="col-md-6  volume-plan-container-right">
                                                            <div className="hard-drive-size">10 GB</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <form
                                className="col-md-6 namespace-plan"
                                onSubmit={this.handleSubmitVolumesTariffs.bind(this)}
                            >
                                <div className="namespace-plan-first-step">2 / 2</div>
                                <div className="namespace-plan-title">choose a Name</div>
                                <div className="namespace-plan-info">Assign this Namespace an identifying name.
                                    Namespace name can only contain alphanumeric characters and dashes.</div>
                                <input
                                    type="text"
                                    className="form-control namespace-plan-input"
                                    name="name"
                                    placeholder="Name"
                                    value={this.state.inputVolumesName}
                                    onChange={this.handleChangeInput.bind(this)}
                                />
                                <button
                                    className="btn namespace-plan-create-btn"
                                    type="submit"
                                >Create</button>
                            </form>
                        </div>
                    </div>
                </div>;
        } else {
            isFetchingVolumesTariffs = <Spinner />;
        }
        return (
            <div>
                { isFetchingVolumesTariffs }
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
