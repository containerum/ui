import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import ReactGA from 'react-ga';

// import Spinner from '../Spinner';
import Notification from '../Notification';
import ResizeModal from '../CustomerModal/ResizeModal';
import { getNSTariffs } from '../../actions/NamespacesActions/getNSTariffsAction';
import { updateNamespace } from '../../actions/NamespaceActions/updateNamespaceAction';
import { getNamespace } from '../../actions/NamespaceActions/getNamespaceAction';
import 'rc-tooltip/assets/bootstrap_white.css';

class UpdateNamespace extends Component {
    constructor() {
        super();
        this.state = {
            isOpened: false,
            NSTariffName: '',
            NSTariffCpu: '',
            NSTariffMemory: '',
            NSTariffVolume: '',
            NSTariffPrice: '',
            NSTariffPricePerDay: ''
        };
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.UpdateNamespaceReducer.isFetching !== this.props.UpdateNamespaceReducer.isFetching) {
            this.setState({
                ...this.state,
                isOpened: false
            });
        }
    }
    componentDidMount() {
        this.props.onGetNamespace(this.props.params.idName);
        if (!this.props.NSTariffsReducer.data.length) {
            this.props.onGetNSTariffs();
        }
        ReactGA.event({
            category: 'UI',
            action: 'UI_ns_resize'
        });
    }
    handleClickTriff(label, cpu, memory, volume, price, pricePerDay) {
        this.setState({
            ...this.state,
            isOpened: true,
            NSTariffName: label,
            NSTariffCpu: cpu,
            NSTariffMemory: memory,
            NSTariffVolume: volume,
            NSTariffPrice: price,
            NSTariffPricePerDay: pricePerDay
        });
    }
    render() {
        // console.log(this.props.UpdateNamespaceReducer);
        let isFetchingNSTariffs = '';
        if (this.props.NSTariffsReducer.isFetching === false) {
            const active = this.props.GetNamespaceReducer.data.tariff;
            const arrayTariff = this.props.NSTariffsReducer.data;
            isFetchingNSTariffs =
                <div className="content-block">
                    <div className="content-block-container container no-back mt-0 no-padding">
                        <div className="content-block-content mt-0">

                            <div className="namespace-plan mt-0">
                                <div className="namespace-plan-first-step">choose a namespace size for <span className="namespace-plan-first-step-blue">{this.props.params.idName}</span></div>
                            </div>

                            <div className="row">
                                {
                                    arrayTariff.map((item, index) => {
                                        const cpu = item.cpu_limit / 1000;
                                        const memory = item.memory_limit / 1024;
	                                    const volume = item.volume_size ? Math.ceil(item.volume_size) : item.volume_size;
                                        const price = `$${item.price}`;
                                        const label = item.label;
                                        const isActiveTariff = label === active;
                                        const pricePerDay = `$${(item.price / 30).toFixed(2)} daily`;
                                        return (
                                            <div className="col-md-3" key={index}>
                                                <Tooltip
                                                    placement="top"
                                                    trigger={['hover']}
                                                    overlay={<span>Current Namespace size</span>}
                                                    overlayClassName={isActiveTariff ? '' : 'display-none'}
                                                >
                                                <div
                                                    id={label}
                                                    className={
                                                        isActiveTariff ?
                                                            "namespace-plan-block-container hover-action-new disabled" :
                                                        label !== this.state.NSTariffName ?
                                                            "namespace-plan-block-container hover-action-new" :
                                                            "namespace-plan-block-container hover-action-new selected"
                                                    }
                                                    onClick={() => {
                                                        if (!isActiveTariff) {
                                                            this.handleClickTriff(label, cpu, memory, volume, price, pricePerDay)
                                                        }
                                                    }}
                                                >
                                                    <div className="row">
                                                        <div className={price === '$2' ?
		                                                    "col-md-6 namespace-plan-block-container-left namespace-plan-block2dollars" :
		                                                    "col-md-6 namespace-plan-block-container-left"}>
                                                            <div className="namespace-plan-block-price">{isActiveTariff ? 'Active' :
                                                                <div>{price}<span className="namespace-plan-span-price">/mo</span></div>}
                                                            </div>
                                                            {
                                                                isActiveTariff ? '' :
                                                                    <div className="namespace-plan-block-month">{pricePerDay}</div>
                                                            }
                                                        </div>
                                                        <div className="col-md-6 namespace-plan-block-container-right">
                                                            <div className={price === '$2' ?
                                                                "content-block-content card-block card-block2dollars" :
                                                                "content-block-content card-block"}>
                                                                <div className="content-block__info-item">
                                                                    <div className="content-block__info-name inline">RAM : </div>
                                                                    <div className="content-block__info-text inline">{memory} GB</div>
                                                                </div>
                                                                <div className="content-block__info-item">
                                                                    <div className="content-block__info-name inline">CPU : </div>
                                                                    <div className="content-block__info-text inline">{cpu}</div>
                                                                </div>
	                                                            {
		                                                            price !== '$2' ?
                                                                        <div className="content-block__info-item">
                                                                            <div className="content-block__info-name inline">Volume : </div>
                                                                            <div className="content-block__info-text inline">{volume} GB</div>
                                                                        </div> : ''
	                                                            }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </Tooltip>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>;
        } else {
            isFetchingNSTariffs =
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
        if (this.props.UpdateNamespaceReducer.isFetching) {
	        isFetchingNSTariffs =
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
                    status={this.props.UpdateNamespaceReducer.status}
                    method={this.props.UpdateNamespaceReducer.method}
                    name={this.props.UpdateNamespaceReducer.idName}
                    errorMessage={this.props.UpdateNamespaceReducer.errorMessage}
                />
                <ResizeModal
                    type="Namespace"
                    tariff={this.state.NSTariffName}
                    data={{
                        cpu: this.state.NSTariffCpu,
                        memory: this.state.NSTariffMemory,
                        volume: this.state.NSTariffVolume,
                        price: this.state.NSTariffPrice,
                        pricePerDay: this.state.NSTariffPricePerDay,
                        idName: this.props.params.idName,
                    }}
                    isOpened={this.state.isOpened}
                    onHandleCreate={this.props.onUpdateNamespace}
                />
                { isFetchingNSTariffs }
            </div>
        );
    }
}

UpdateNamespace.propTypes = {
    onGetNSTariffs: PropTypes.func.isRequired,
    NSTariffsReducer: PropTypes.object,
    UpdateNamespaceReducer: PropTypes.object,
    GetNamespaceReducer: PropTypes.object,
    params: PropTypes.object
};

function mapStateToProps(state) {
    return {
        NSTariffsReducer: state.NSTariffsReducer,
        UpdateNamespaceReducer: state.UpdateNamespaceReducer,
        GetNamespaceReducer: state.GetNamespaceReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetNSTariffs: () => {
            dispatch(getNSTariffs());
        },
        onUpdateNamespace: (inputNSName, NSTariffName) => {
            dispatch(updateNamespace(inputNSName, NSTariffName));
        },
        onGetNamespace: (NSTariffName) => {
            dispatch(getNamespace(NSTariffName));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNamespace);
