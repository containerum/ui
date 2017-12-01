import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

// import Spinner from '../Spinner';
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
            VolumesTariffStorageLimit: '',
            VolumesTariffPricePerDay: ''
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
        ReactGA.event({
            category: 'UI',
            action: 'UI_create_Vol'
        });
    }
    handleClickTriff(label, price, storageLimit, pricePerDay) {
        this.setState({
            ...this.state,
            isOpened: true,
            VolumesTariffName: label,
            VolumesTariffPrice: price,
            VolumesTariffStorageLimit: storageLimit,
            VolumesTariffPricePerDay: pricePerDay
        });
    }
    render() {
        // console.log(this.props.VolumesTariffsReducer);
        // console.log(this.props.CreateVolumeReducer);
        let isFetchingVolumesTariffs = '';
        if (!this.props.VolumesTariffsReducer.isFetching) {
            isFetchingVolumesTariffs =
                <div className="content-block">
                    <div className="content-block-container container no-back mt-0 no-padding">
                        <div className="content-block-content mt-0">
                            <div className="namespace-plan mt-0">
                                <div className="namespace-plan-title">choose a volume size</div>
                            </div>
                            <div className="row">
		                        {
			                        this.props.VolumesTariffsReducer.data.map((item, index) => {
				                        const storageLimit = item.storage_limit;
				                        const price = item.price === 0 && item.label === "free" ? 'free' : `$${item.price}`;
				                        const label = item.label;
				                        const pricePerDay = item.price === 0 ? '30 days left' :
					                        `$${(item.price / 30).toFixed(2)} daily`;
				                        return (
                                            <div className="col-md-3" key={index}>
                                                <div
                                                    id={label}
                                                    className={label === this.state.VolumesTariffName ?
								                        "namespace-plan-block-container hover-action-new selected" :
								                        "namespace-plan-block-container hover-action-new"}
                                                    onClick={labelName => this.handleClickTriff(label, price, storageLimit, pricePerDay)}
                                                >
                                                    <div className="row">
                                                        <div className="col-md-6 namespace-plan-block-container-left">
                                                            <div className="namespace-plan-block-price">{price}<span className="namespace-plan-span-price">/mo</span></div>
                                                            <div className="namespace-plan-block-month">{pricePerDay}</div>
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
            isFetchingVolumesTariffs =
                <div className="content-block">
                    <div className="content-block-container container no-back mt-0 no-padding">
                        <div className="content-block-content mt-0">
                            <div className="namespace-plan mt-0">
                                <div className="namespace-plan-title">choose a volume size</div>
                            </div>
                            <div className="row">
		                        {
			                        new Array(8).fill().map((item, index) => {
				                        return (
                                            <div key={index} className="col-md-3">
                                                <div className="namespace-plan-block-placeholder">
                                                    <img src={require('../../images/add-vol-block.svg')} style={{width: '104%'}}/>
                                                </div>
                                            </div>
				                        )
			                        })
		                        }
                            </div>
                        </div>
                    </div>
                </div>;
        }
	    if (this.props.CreateVolumeReducer.isFetching) {
		    isFetchingVolumesTariffs =
                <div className="content-block">
                    <div className="container no-back">
                        <div className="row double">
						    {
							    new Array(3).fill().map((item, index) => {
								    return (
                                        <div key={index} className="col-md-4 align-middle">
                                            <img
                                                className="content-block-container-img"
                                                src={require('../../images/ns-1.svg')}
                                                alt="ns"/>
                                        </div>
								    )
							    })
						    }
                        </div>
                    </div>
                </div>;
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
                        price: this.state.VolumesTariffPrice,
                        pricePerDay: this.state.VolumesTariffPricePerDay
                    }}
                    isOpened={this.state.isOpened}
                    onHandleCreate={this.props.onCreateVolume}
                />
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
        onCreateVolume: (inputVolumesName, VolumesTariffName, price) => {
            dispatch(createVolume(inputVolumesName, VolumesTariffName, price));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateVolume);
